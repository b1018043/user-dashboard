import React,{useEffect,useState} from "react";
import {Table,Spinner,Button} from "reactstrap";

const Dashboard=()=>{
    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(true);
    const deleteRequest=async (id)=>{
        fetch(`/users/${id}`,{
            method:"DELETE"
        }).catch(err=>console.log(err));
    };
    const deleteButtonHandler= async(id)=>{
        await deleteRequest(id);
        fetch("/users").then(res => res.json()).then(res => {
            setUsers(res);
            setLoading(false);
        }).catch(err => console.log(err));
    };
    useEffect(()=>{
        fetch("/users").then(res=>res.json()).then(res=>{
            setUsers(res);
            setLoading(false);
        }).catch(err=>console.log(err));
    },[]);
    function RenderTable(){
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.password}</td>
                                <td>{item.email}</td>
                                <td><Button color="info">Edit</Button></td>
                                <td><Button color="danger" onClick={()=>{
                                    deleteButtonHandler(item.id);
                                }}>Delete</Button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
    return (
        <div>
            {loading?<Spinner color="primary"/>:<RenderTable/>}
        </div>
    );
};

export default Dashboard;