import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddEmployeeHRPage(){
    const [values, setValues]=useState({
      email:'',
      nickname:'',
      firstName:'',
      lastName:'',
      password: '',
      role:'VET',
      birthDate:'',
      address:'',
      city:'',
      pay:'',
      station:''
    })
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [stationId, setStationId]=useState(null);

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem("user")));
    }, []);

    useEffect(() => {
        if (userInfo && userInfo.id) {
            axios.get(`http://localhost:8081/get-station/${userInfo.id}`)
                .then(response => setStationId(response.data[0].stationId))
                .catch(error => console.error("Error finding station", error));
        }
    }, [userInfo]);

    const navigate=useNavigate();
    const handleInput=(event)=>{
        setValues((prev) =>({...prev, [event.target.name]: event.target.value}));
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        const formattedValues = {
        ...values,
        birthDate: values.birthDate ? new Date(values.birthDate).toISOString().split('T')[0] : '',
        station: stationId
        };
        axios.post("http://localhost:8081/add-employee", formattedValues)
        .then(res=>{
            console.log("Server response:", res.data);
            navigate("/hr-page");
        })
        .catch(err=>console.log(err));
    }
    if(!userInfo){
        return <div>Loading...</div>
    }
    if(!stationId){
        return <div>Loading...</div>
    }
    return(
        <div className="d-flex justify-content-center align-items-center bg-warning">
                <div className="bg-white p-3 rounded w-25 mt-3 mb-3">
                    <Link to="/hr-page" className="btn btn-success">Return to HR Page</Link>
                    <h2>Hire Employee</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" placeholder="Enter First Name" name="firstName"
                            onChange={handleInput} className="form-control rounded-0"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" placeholder="Enter Last Name" name="lastName"
                            onChange={handleInput} className="form-control rounded-0"/>
                        
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nickname">Nickname</label>
                            <input type="text" placeholder="Enter Nickname" name="nickname"
                            onChange={handleInput} className="form-control rounded-0"/>
                            
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Enter Email" name="email"
                            onChange={handleInput} className="form-control rounded-0"/>
                            
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Enter Password" name="password"
                            onChange={handleInput} className="form-control rounded-0"/>
                            
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
                            <option value="VET">Veterinarian</option>
                            <option value="VETTECH">Vet Technician</option>

                        </select>

                        </div>
                        <button type="submit" className="btn btn-success w-100">Create</button>
                    
                    </form>
                </div>
            </div>

    )
}

export default AddEmployeeHRPage;