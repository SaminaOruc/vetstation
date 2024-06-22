import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";

function Login(){
  const [values, setValues]=useState({
    email:'',
    password: ''
})

axios.defaults.withCredentials=true;
const navigate=useNavigate();

const [errors, setErrors] = useState({})

const handleInput=(event)=>{
    setValues(prev =>({...prev, [event.target.name]:[event.target.value]}))
}

const handleSubmit=(event)=>{
    event.preventDefault();
    setErrors(Validation(values));
    if(errors.email==="" && errors.password===""){
        axios.post("http://localhost:8081/login", values)
        .then(res=>{
          localStorage.setItem("user",JSON.stringify(res.data.user));
            if(res.data.roleName==="USER"){
               
                navigate("/home");
            }
            else if(res.data.roleName==="OWNER"){
                navigate("/owner-page");
            }
            else if(res.data.roleName==="MANAGER"){
                navigate("/manager-page");
            }else if(res.data.roleName==="FINANCE"){
              navigate("/finance-page");
            }else if(res.data.roleName==="HR"){
              navigate("/hr-page");
            }else if(res.data.roleName==="VET"){
              navigate("/vet-page");
            }else if(res.data.roleName==="VETTECH"){
              navigate("/vettech-page")
            }
            else{
                alert("No record existed");
            }
        })
        .catch(err=>console.log(err));
    }
}
  return(
    <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter Email" name="email"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter Password" name="password"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-success w-100 mb-2">Login</button>
                    <Link to="/signup" className="btn btn-default border w-100 bg-light text-decoration-none mb-2">Create Account</Link>
                    <Link to="/" className="btn btn-default border w-100 bg-light text-decoration-none">Go to Main Page</Link>
                </form>
            </div>
        </div>
  )
}

export default Login;