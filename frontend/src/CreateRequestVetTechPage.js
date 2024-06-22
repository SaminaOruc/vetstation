import React, {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CreateRequestVetTechPage(){
    const [values, setValues]=useState({
      content:'',
      station:'',
      user:'',
      record:'',
      employee:'',
      arrivalDate:''

  })
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
  const [records, setRecords]=useState(null);
  const [employeeId, setEmployeeId]=useState(null);
  const [stationId, setStationId]=useState(null);

  useEffect(() => {
      setUserInfo(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(()=>{
    const fetchData = async () => {
        try{
            const employeeIdResponse=await axios.get(`http://localhost:8081/get-employee/${userInfo.id}`);
            console.log("Employee ID: ",employeeIdResponse.data[0].id);
            setEmployeeId(employeeIdResponse.data[0].id);
            const stationIdResponse=await axios.get(`http://localhost:8081/get-station/${userInfo.id}`);
            console.log("Station ID: ",stationIdResponse.data[0].stationId);
            setStationId(stationIdResponse.data[0].stationId);
            const recordsResponse=await axios.get(`http://localhost:8081/get-station-medical-record/${stationIdResponse.data[0].stationId}`);
            console.log("Medical records: ", recordsResponse.data);
            setRecords(recordsResponse.data);

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
          user: userInfo.id,
          employee: employeeId,
          station: stationId
      }
      axios.post("http://localhost:8081/create-request-vettech", formattedValues)
      .then(res=>{
          console.log("Server response: ", res.data);
          navigate("/vettech-page");
      })
      .catch(err=>console.log(err));
  }

  if (!userInfo || !records || !employeeId || !stationId){
      return <div>Loading...</div>
  }
  return(
    <div>
      <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
            <div className="bg-white p-3 rounded w-25">
                <Link to="/vettech-page" className="btn btn-success">Return to VetTech Page</Link>
                <h2>Create Request</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                      <label htmlFor="content">Content</label>
                      <textarea placeholder="Enter Request Content" name="content" onChange={handleInput} className="form-control rounded-0" rows="4"/>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="arrivalDate"> Arrival Date
                        </label>
                        <input type="datetime-local" name="arrivalDate" onChange={handleInput} className="form-control-rounded-0"></input>
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
                    
                    <button type="submit" className="btn btn-success w-100">Create</button>
                   
                </form>
            </div>
        </div>

      
    </div>
  )
}

export default CreateRequestVetTechPage;