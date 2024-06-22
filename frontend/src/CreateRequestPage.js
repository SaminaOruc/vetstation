import React, {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CreateRequestPage(){
    const [values, setValues]=useState({
      content:'',
      station:'',
      user:'',
      record:''
  })
  const [stations, setStations] = useState(null);
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
  const [records, setRecords]=useState(null);

  useEffect(() => {
      setUserInfo(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(()=>{
    const fetchData = async () => {
        try{
            const stationsResponse=await axios.get("http://localhost:8081/get-all-stations");
            console.log("Stations: ",stationsResponse.data);
            setStations(stationsResponse.data);
            const usersRecordsResponse=await axios.get(`http://localhost:8081/get-medical-record/${userInfo.id}`);
            console.log("Medical records: ", usersRecordsResponse.data);
            setRecords(usersRecordsResponse.data);

        }catch(error){
            console.log("Error fetching data",error);

        }

    };
    if(userInfo && userInfo.id){
        fetchData();
    }
   
  }, [userInfo]);

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
      axios.post("http://localhost:8081/create-request", formattedValues)
      .then(res=>{
          console.log("Server response: ", res.data);
          navigate("/home");
      })
      .catch(err=>console.log(err));
  }

  if (!stations || !userInfo || !records){
      return <div>Loading...</div>
  }
  return(
    <div>
      <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
            <div className="bg-white p-3 rounded w-25">
                <Link to="/home" className="btn btn-success">Return to Home Page</Link>
                <h2>Create Request</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                      <label htmlFor="content">Content</label>
                      <textarea placeholder="Enter Request Content" name="content" onChange={handleInput} className="form-control rounded-0" rows="4"/>

                    </div>
                    <div className="mb-3">
                      <label htmlFor="record">Choose Medical Record </label>
                      <select name="record" onChange={handleInput} className="form-control rounded-0">
                        <option value="">Select a medical record</option>
                        {records.map(record=>(
                          <option key={record.id} value={record.id}>{record.animalName}</option>
                        ))}

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

      
    </div>
  )
}

export default CreateRequestPage;