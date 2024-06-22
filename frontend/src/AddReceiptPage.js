import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';

function ReceiptPage(){
  const [values, setValues]=useState({
    usage:'',
    issueDate:'',
    medicine:'',
    record:''
   
  })
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
  const [medicines, setMedicines]=useState(null);
  const [records, setRecords]=useState(null);
  const [stationId, setStationId]=useState(null);

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("user")));
  }, []);

  const navigate=useNavigate();
  const handleInput=(event)=>{
      setValues((prev) =>({...prev, [event.target.name]: event.target.value}));
  }
  useEffect(()=>{
    const fetchData = async () => {
        try{
          const stationResponse=await axios.get(`http://localhost:8081/get-station/${userInfo.id}`);
          console.log("Station: "+stationResponse.data[0].stationId);
          setStationId(stationResponse.data[0].stationId);
          const medicineResponse=await axios.get(`http://localhost:8081/get-station-medicine/${stationResponse.data[0].stationId}`);
          console.log("Medicines: "+medicineResponse.data);
          setMedicines(medicineResponse.data);
          const recordResponse=await axios.get(`http://localhost:8081/get-station-medical-record/${stationResponse.data[0].stationId}`);
          console.log("Records:: "+recordResponse.data);
          setRecords(recordResponse.data);

        }catch(error){
            console.log("Error fetching data",error);

        }

    };
    if(userInfo && userInfo.id){
        fetchData();
    }
   
  }, [userInfo]);

  const handleSubmit=(event)=>{
      event.preventDefault();
      
      axios.post("http://localhost:8081/add-receipt", values)
      .then(res=>{
          console.log("Server response:", res.data);
          navigate("/vet-page");
      })
      .catch(err=>console.log(err));
      
    }

    if(!userInfo || !medicines || !records || !stationId){
      return <div>Loading...</div>
    }
    return(
      <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
      <div className="bg-white p-3 rounded w-25">
          <Link to={'/vet-page'} className="btn btn-success">Return to Vet Page</Link>
          <h2>Add Receipt</h2>
          <form action="" onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="usage">Usage</label>
                  <input type="text" placeholder="Enter Usage" name="usage"
                  onChange={handleInput} className="form-control rounded-0"/>
              </div>
              <div className="mb-3">
                  <label htmlFor="issueDate"> Issue Date
                  </label>
                  <input type="date" name="issueDate" onChange={handleInput} className="form-control-rounded-0"></input>
              </div>
              <div className="mb-3"> 
                  <label htmlFor="medicine">Medicine</label>
                  <select name="medicine" onChange={handleInput} className="form-control rounded-0">
                    <option value="">Select a medicine</option>
                    {medicines.map(medicine=>(
                      <option key={medicine.id} value={medicine.id}>{medicine.name}</option>
                    ))}

                  </select>

               </div>
                <div className="mb-3"> 
                    <label htmlFor="record">Record</label>
                    <select name="record" onChange={handleInput} className="form-control rounded-0">
                      <option value="">Select a record</option>
                      {records.map(record=>(
                        <option key={record.id} value={record.id}>{record.animalName}</option>
                      ))}

                    </select>

               </div>
              <button type="submit" className="btn btn-success w-100">Submit</button>
          </form>
      </div>
    </div>

  )
}

export default ReceiptPage;