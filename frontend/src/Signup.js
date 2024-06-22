import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from "axios";


function Signup(){
    const [values, setValues]=useState({
      email:'',
      nickname:'',
      firstName:'',
      lastName:'',
      password: '',
      birthDate:''
  })

  const navigate=useNavigate();

  const [errors, setErrors] = useState({})

  const handleInput=(event)=>{
      setValues((prev) =>({...prev, [event.target.name]: event.target.value}));
  }

  const handleSubmit=(event)=>{
      event.preventDefault();
      const formattedValues = {
        ...values,
        birthDate: values.birthDate ? new Date(values.birthDate).toISOString().split('T')[0] : ''
    };
      setErrors(Validation(values));
      if(errors.firstName==="" && errors.lastName==="" && errors.nickname==="" && errors.email==="" && errors.password===""){
          axios.post("http://localhost:8081/signup", formattedValues)
          .then(res=>{
              console.log("Server response:", res.data);
              navigate("/login");
          })
          .catch(err=>console.log(err));
      }
  }
  return( 
        <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Sign-Up</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" placeholder="Enter First Name" name="firstName"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.firstName && <span className="text-danger">{errors.firstName}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" placeholder="Enter Last Name" name="lastName"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.lastName && <span className="text-danger">{errors.lastName}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nickname">Nickname</label>
                        <input type="text" placeholder="Enter Nickname" name="nickname"
                        onChange={handleInput} className="form-control rounded-0"/>
                        {errors.nickname && <span className="text-danger">{errors.nickname}</span>}
                    </div>
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
                    <div className="mb-3">
                        <label htmlFor="birthDate"> Birth Date
                        </label>
                        <input type="date" name="birthDate" onChange={handleInput} className="form-control-rounded-0"></input>
                    </div>
                    <button type="submit" className="btn btn-success w-100">Sign up</button>
                    <Link to="/login" className="btn btn-default border w-100 bg-light text-decoration-none">Login</Link>
                </form>
            </div>
        </div>

    
    
  )
}

export default Signup;