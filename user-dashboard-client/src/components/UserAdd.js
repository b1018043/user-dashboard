import React,{useState} from "react";
import {Form,FormGroup,Breadcrumb,BreadcrumbItem,Button,Label,Input} from "reactstrap";
import {useHistory,Link} from "react-router-dom";

const UserAdd=()=>{
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const history = useHistory();

    const stateHandler = (handler) => (e) => {
        handler(e.target.value);
    };

    const submit=(e)=>{
        e.preventDefault();
        if (!(name && password && email)){
            console.log("debug");
            return;
        }
        fetch("/users",{
            method:"POST",
            headers:{
            "Content-Type": "application/json; charset=utf-8",
            },
            body:JSON.stringify({name,password,email}),
        }).then(()=>{
            history.push("/");
        }).catch(err=>console.log(err));
    };

    return (
        <>
            <div>
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Create User</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <Form onSubmit={submit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" id="name" name="name" placeholder="input your name" value={name}
                        onChange={stateHandler(setName)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" id="password" name="password" placeholder="input your password" value={password}
                        onChange={stateHandler(setPassword)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" id="email" name="email" placeholder="input your email" value={email}
                        onChange={stateHandler(setEmail)}
                    />
                </FormGroup>
                <hr/>
                <Button color="primary" disabled={!(name&&password&&email)}>Create User</Button>
            </Form>
        </>
    );
};

export default UserAdd;