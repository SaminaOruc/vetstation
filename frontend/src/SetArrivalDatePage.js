import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function SetArrivalDatePage(){
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
  const [employeeId, setEmployeeId]=useState(null);

  const {requestId}=useParams();
  const [values,setValues]=useState({
    arrivalDate:''

  })
  
  const navigate=useNavigate();

  const handleInput=(event)=>{
      setValues((prev) =>({...prev, [event.target.name]: event.target.value}));
  }

  const handleSubmit=(event)=>{
      event.preventDefault();
      const formattedValues = {
        ...values,
        employee: employeeId
    };
    
    axios.post(`http://localhost:8081/set-arrival-date/${requestId}`, formattedValues)
    .then(res=>{
        console.log("Server response:", res.data);
        navigate("/vettech-page");
    })
    .catch(err=>console.log(err));
    }
    
    useEffect(() => {
      setUserInfo(JSON.parse(localStorage.getItem("user")));
    }, []);

    useEffect(()=>{
      const fetchData = async () => {
          try{
            const employeeResponse=await axios.get(`http://localhost:8081/get-employee/${userInfo.id}`);
            console.log("Employee: "+employeeResponse.data[0].id);
            setEmployeeId(employeeResponse.data[0].id);
            

          }catch(error){
              console.log("Error fetching data",error);

          }

      };
      if(userInfo && userInfo.id){
          fetchData();
      }
    
    }, [userInfo]);
    if(!userInfo || !employeeId){
      return <div>Loading...</div>
    }

  
    return(
        <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
        <div className="bg-white p-3 rounded w-25">
          <Link to={'/vettech-page'} className="btn btn-success">Return to Vet Technician Page</Link>
            <h2>Handle Request</h2>
            <form action="" onSubmit={handleSubmit}> 
                <div className="mb-3">
                    <label htmlFor="arrivalDate">Arrival Date
                    </label>
                    <input type="datetime-local" name="arrivalDate" onChange={handleInput} className="form-control-rounded-0"></input>
                </div>
                <button type="submit" className="btn btn-success w-100">Sign up</button>
          
            </form>
        </div>
    </div>

    )
  }

  export default SetArrivalDatePage;