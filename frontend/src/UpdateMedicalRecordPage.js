import React, {useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateMedicalRecordPage(){
  const {recordId}=useParams();
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
      employee:''
  })
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
  const [stations,setStations]=useState(null);
  const [selectedRecord, setSelectedRecord]=useState(null);


  useEffect(() => {
      setUserInfo(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(()=>{
      axios.get(`http://localhost:8081/get-selected-medical-record/${recordId}`)
      .then(response=>{
        setSelectedRecord(response.data[0]);
        setValues({
          ...selectedRecord,
          animalName: response.data[0].animalName,
          species: response.data[0].species,
          domestic: 'NO',
          age: response.data[0].age,
          month: response.data[0].month,
          alergies: response.data[0].alergies,
          vaccination: response.data[0].vaccination
        })
      })
      .catch(error=>{
        console.log(error);
        alert(error.response.data.message);
      })

  },[recordId]);

  const navigate=useNavigate();
  const handleChange=(e)=>{
    setValues({...values, [e.target.name]:e.target.value});
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
   
    axios.put(`http://localhost:8081/update-medical-record/${recordId}`, values)
    .then(res=>{
        console.log("Server response:", res.data);
        if (userInfo.role==="USER"){
          navigate("/home");
        }else if(userInfo.role==="VET"){
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
  if(!stations || !userInfo || !selectedRecord){
      return <div>Loading...</div>
  }
  return(
        <div className="d-flex justify-content-center align-items-center bg-warning">
        <div className="bg-white p-3 rounded w-25 mt-3 mb-3">
        {userInfo && userInfo.role === "USER" ? (
                      <Link to={'/home'} className="btn btn-success w-10">Return to Home Page</Link>
                  ) : userInfo && userInfo.role === "VET" ? (
                      <Link to={'/vet-page'} className="btn btn-success w-10">Return to Vet Page</Link>
                  ) : (
                    <Link to={'/login'} className="btn btn-success w-10">Return to Login Page</Link>
                  )
            }
            <h2>Update Medical Record</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Animal Name">Animal Name</label>
                    <input type="text" placeholder="Enter Animal Name" name="animalName"
                    onChange={handleChange} className="form-control rounded-0" value={values.animalName}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="species">Species</label>
                    <input type="text" placeholder="Enter Species" name="species"
                    onChange={handleChange} className="form-control rounded-0" value={values.species}/>
                
                </div>
                <div className="mb-3">
                <label htmlFor="domestic">Is Animal Domestic?</label>
                <select name="domestic" onChange={handleChange} className="form-control rounded-0">
                    <option value="NO">No</option>
                    <option value="YES">Yes</option>
                </select>

                </div>
                <div className="mb-3">
                    <label htmlFor="age">Age</label>
                    <input type="number" placeholder="Enter Age" name="age"
                    onChange={handleChange} className="form-control rounded-0" min="0" value={values.age}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="month">Month</label>
                    <input type="number" placeholder="Enter Month" name="month"
                    onChange={handleChange} className="form-control rounded-0" min="0" max="11" value={values.month}/>

                </div>
                <div className="mb-3">
                        <label htmlFor="alergies">Alergies</label>
                        <textarea placeholder="Enter Alergies" name="alergies"
                        onChange={handleChange} className="form-control rounded-0" rows="4" value={values.alergies}/>
                    
                </div>
                <div className="mb-3">
                        <label htmlFor="vaccination">Vaccination</label>
                        <textarea placeholder="Enter Vaccination" name="vaccination"
                        onChange={handleChange} className="form-control rounded-0" rows="4" value={values.vaccination}/>
                    
                </div>
            
                <div className="mb-3"> 
                    <label htmlFor="station">Station</label>
                    <select name="station" onChange={handleChange} className="form-control rounded-0">
                    <option value="">Select a station</option>
                    {stations.map(station=>(
                        <option key={station.id} value={station.id}>{station.name}</option>
                    ))}

                    </select>

                </div>
                <button type="submit" className="btn btn-success w-100">Update</button>
            
            </form>
        </div>
    </div>
  )
}

export default UpdateMedicalRecordPage;