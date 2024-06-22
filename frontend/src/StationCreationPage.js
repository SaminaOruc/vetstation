import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function StationCreationPage(){
    const [values, setValues]=useState({
      address:'',
      city:'',
      name:''
  })

  const navigate=useNavigate();
  const handleInput=(event)=>{
    setValues((prev) =>({...prev, [event.target.name]: event.target.value}));
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    axios.post("http://localhost:8081/create-station", values)
    .then(res=>{
        console.log("Server response:", res.data);
        navigate("/owner-page");
    })
    .catch(err=>console.log(err));
  }
  return(
    <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
            <div className="bg-white p-3 rounded w-25">
                <Link to="/owner-page" className="btn btn-success">Return to Owner Page</Link>
                <h2>Station Creation</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="address">Address</label>
                        <input type="text" placeholder="Enter Address" name="address"
                        onChange={handleInput} className="form-control rounded-0"/>
            
                    </div>
                    <div className="mb-3">
                        <label htmlFor="city">City</label>
                        <input type="text" placeholder="Enter City" name="city"
                        onChange={handleInput} className="form-control rounded-0"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Enter Name" name="name"
                        onChange={handleInput} className="form-control rounded-0"/>
                       
                    </div>
                    <button type="submit" className="btn btn-success w-100">Create</button>
                </form>
            </div>
        </div>
  )
}

export default StationCreationPage;