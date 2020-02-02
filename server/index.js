const express=require("express");
const bodyParser=require("body-parser");

const crypto=require("./md5");

const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("user.sqlite");

const port=process.env.PORT||3000;
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',(_,res)=>res.send('Hello world!!'));

app.post('/users',(req,res)=>{
    const body=req.body;
    const {name,password,email}=body;
    if(!(name&&password&&email)){
        res.status(400).json({ "message": "invalid body" });
        return;
    }
    const crypto_password=crypto.strtomd5(password);
    db.run(`insert into users(name,password,email) values('${name}','${crypto_password}','${email}')`,(err)=>{
        if(err){
            console.log(err);
            res.status(500).json({ "message": "sorry" });
        }
        else res.status(200).json({ crypto_password, name, email });
    });
});

function convertSQL(body){
    let tmp=[];
    Object.keys(body).forEach(function(key){
        tmp=[...tmp,` ${key} = '${body[key]}'`]
    });
    return tmp.join(',')
}

app.put('/users/:id(\\d+)',(req,res)=>{
    const id = Number(req.params.id);
    if (isNaN(id)){
        res.status(400).json({ "message": "invalid param" });
        return;
    }
    let body = req.body;
    if('password' in body) body.password = crypto.strtomd5(body.password);
    db.run(`update users set ${convertSQL(body)} where id=${id}`,(err)=>{
        if(err){
            res.status(400).json({err});
            console.log(err);
            return;
        }else{
            res.status(200).json({"message":"success"});
            return;
        }
    })
});

app.delete('/users/:id(\\d+)',(req,res)=>{
    const id=Number(req.params.id);
    if(isNaN(id)){
        res.status(400).json({"message":"invalid param"});
        return;
    }
    db.run(`delete from users where id = ${id}`,(err)=>{
        if(err){
            res.status(400).json({err});
            return;
        }else{
            res.status(200).json({"message":"success"});
            return;
        }
    });
})

app.get('/users',(_,res)=>{
    db.all("select * from users",function(err,rows){
        if(err){
            res.status(400).json({"message":"error"});
        }else{
            res.json(rows);
        }
    })
});

app.listen(port,()=>console.log(`Server started on port ${port}`));

process.on("exit",()=>{
    db.close();
});