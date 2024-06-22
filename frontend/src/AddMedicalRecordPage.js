import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddMedicalRecordPage(){
    const [values, setValues]=useState({
        animalName:'',
        species:'',
        domestic:'NO',
        age:'',
        month:'',
        alergies:'',
        vaccination:'',
        station:'',
        user:'',
        employee:'',
        userEmail:''
    })
    const [stations, setStations] = useState(null);
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem("user")));
    }, []);

    const navigate=useNavigate();

    const handleInput=(event)=>{
        setValues((prev) =>({...prev, [event.target.name]: event.target.value}));
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        const formattedValues={
            ...values,
            user: userInfo.id
        }
        axios.post("http://localhost:8081/create-medical-record", formattedValues)
        .then(res=>{
            console.log("Server response:", res.data);
            if (userInfo.role==="USER"){
                navigate("/home");
            }else if (userInfo.role==="VET"){
                navigate("/vet-page");
            }else{
                navigate("/login");
            }
        })
        .catch(err=>console.log(err));
    }

    useEffect(()=>{
        axios.get("http://localhost:8081/get-all-stations")
        .then(response=>setStations(response.data))
        .catch(error=>console.error("Error fetching station information", error));
    }, []);

    if (!stations || !userInfo){
        return <div>Loading...</div>
    }
    return(
        <div className="d-flex justify-content-center align-items-center bg-warning ">
            <div className="bg-white p-3 rounded w-25 mb-3 mt-3">
                {userInfo && userInfo.role === "USER" ? (
                    <Link to={'/home'} className="btn btn-success w-100">Return to Home Page</Link>
                ) : userInfo && userInfo.role === "VET" ? (
                    <Link to={'/vet-page'} className="btn btn-success w-100">Return to Vet Page</Link>
                ) : (
                    <Link to={'/login'} className="btn btn-success w-100">Return to Login Page</Link>
                )}
                <h2>Add Medical Record</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="animalName">Animal Name</label>
                        <input type="text" placeholder="Enter Animal Name" name="animalName"
                        onChange={handleInput} className="form-control rounded-0"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="species">Species</label>
                        <input type="text" placeholder="Enter Species" name="species"
                        onChange={handleInput} className="form-control rounded-0"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="domestic">Is Animal Domestic?</label>
                        <select name="domestic" onChange={handleInput} className="form-control rounded-0">
                            <option value="NO">No</option>
                            <option value="YES">Yes</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age">Age</label>
                        <input type="number" placeholder="Enter Age" name="age"
                        onChange={handleInput} className="form-control rounded-0" min="0"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="month">Month</label>
                        <input type="number" placeholder="Enter Month" name="month"
                        onChange={handleInput} className="form-control rounded-0" min="0" max="11"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="alergies">Alergies</label>
                        <textarea placeholder="Enter Alergies" name="alergies"
                        onChange={handleInput} className="form-control rounded-0" rows="4"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="vaccination">Vaccination</label>
                        <textarea placeholder="Enter Vaccination" name="vaccination"
                        onChange={handleInput} className="form-control rounded-0" rows="4"/>
                    </div>
                    {userInfo && userInfo.role==="VET" ? (
                        <div className="mb-3">
                            <label htmlFor="userEmail">User Email:</label>
                            <input type="text" placeholder="Enter User Email" name="userEmail" 
                            onChange={handleInput} className="form-control rounded-0" />
                        </div>
                    ) : (
                        <span></span>
                    )}
                    <div className="mb-3">
                        <label htmlFor="station">Station</label>
                        <select name="station" onChange={handleInput} className="form-control rounded-0">
                            <option value="">Select a station</option>
                            {stations.map(station => (
                                <option key={station.id} value={station.id}>
                                    {station.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success w-100">Create</button>
                </form>
            </div>
        </div>
    )
}

export default AddMedicalRecordPage;