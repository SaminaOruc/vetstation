import React, {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from "axios";


function AddEmployeePage(){
    const [values, setValues]=useState({
      email:'',
      nickname:'',
      firstName:'',
      lastName:'',
      password: '',
      role:'MANAGER',
      birthDate:'',
      address:'',
      city:'',
      pay:'',
      station:''
  })
  const [stations,setStations]=useState(null);

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
          axios.post("http://localhost:8081/add-employee", formattedValues)
          .then(res=>{
              console.log("Server response:", res.data);
              navigate("/owner-page");
          })
          .catch(err=>console.log(err));
      }
  }
  useEffect(()=>{
    axios.get("http://localhost:8081/get-all-stations")
    .then(response=>setStations(response.data))
    .catch(error=>console.error("Error fetching users information", error));
  }, []);
  
  if(!stations){
    return <div>Loading...</div>
  }
  return( 
        <div className="d-flex justify-content-center align-items-center bg-warning">
            <div className="bg-white p-3 rounded w-25 mt-3 mb-3">
                <Link to="/owner-page" className="btn btn-success">Return to Owner Page</Link>
                <h2>Add Employee</h2>
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
                        <label htmlFor="pay">Pay</label>
                        <input type="number" step="0.01" placeholder="Enter Pay" name="pay"
                        onChange={handleInput} className="form-control rounded-0"/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="role">Choose Employee Role</label>
                      <select name="role" onChange={handleInput} className="form-control rounded-0">
                        <option value="MANAGER">Manager</option>
                        <option value="FINANCE">Finance</option>
                        <option value="HR">HR</option>
                        <option value="VET">Veterinarian</option>
                        <option value="VETTECH">Vet Technician</option>

                      </select>

                    </div>
                    <div className="mb-3"> 
                        <label htmlFor="station">Station</label>
                        <select name="station" onChange={handleInput} className="form-control rounded-0">
                          <option value="">Select a station</option>
                          {stations.map(station=>(
                            <option key={station.id} value={station.id}>{station.name}</option>
                          ))}

                        </select>

                    </div>
                    <button type="submit" className="btn btn-success w-100">Create</button>
                   
                </form>
            </div>
        </div>

    
    
  )
}

export default AddEmployeePage;