import React,{useState,useEffect} from "react";
import {Form,FormGroup,Input,Label,Button,Breadcrumb,BreadcrumbItem} from "reactstrap";
import {useParams,useHistory,Link} from "react-router-dom";

const UserEdit=()=>{
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const {id}=useParams();
    const history=useHistory();
    useEffect(()=>{
        if(!id){
            alert("idが存在していません");
            history.push("/");
        }
    },[])
    const stateHandler = (handler)=>(e)=>{
        handler(e.target.value);
    }
    const submit=(e)=>{
        e.preventDefault();
        if (!(name || password || email)) return;
        console.log("called!!")
        let data={};
        if(name.trim()) data["name"]=name;
        if(password.trim()) data["password"]=password;
        if(email.trim()) data["email"]=email;
        fetch(`/users/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data),
        }).then(res=>{
            console.log(res);
            history.push("/");
        }).catch(err=>console.error(err));
    }
    return (
        <>
            <div>
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Edit:{id}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <Form onSubmit={submit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" placeholder="input your name" value={name}
                        onChange={stateHandler(setName)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="input your password" value={password}
                        onChange={stateHandler(setPassword)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="input your email" value={email}
                        onChange={stateHandler(setEmail)}
                    />
                </FormGroup>
                <hr />
                <Button color="primary" disabled={!(name || password || email)}>Submit</Button>
            </Form>
        </>
    );
};

export default UserEdit;