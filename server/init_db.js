const sqlite=require("sqlite3").verbose();
const db=new sqlite.Database("user.sqlite");

db.serialize(function(){
    db.run("create table if not exists users(id integer primary key,name TEXT,password TEXT,email TEXT)");
    let stmt=db.prepare("insert into users(name,password,email) VALUES(?,?,?)");
    stmt.run(["test","test","test"]);
    stmt.finalize();
})

db.close();