import React, {useEffect, useState} from 'react';
import LogoutButton from './LogoutButton';
import axios from 'axios';
import styles from './Background.css';
import { Link } from 'react-router-dom';

function FinancePage(){
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
  const [stationId, setStationId]=useState(null);
  const [requests, setRequests]=useState(null);

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(()=>{
    const fetchData = async () => {
        try{
          const stationResponse=await axios.get(`http://localhost:8081/get-station/${userInfo.id}`);
          console.log("Station: "+stationResponse.data[0].stationId);
          setStationId(stationResponse.data[0].stationId);
          const requestResponse=await axios.get(`http://localhost:8081/get-all-finished-requests/${stationResponse.data[0].stationId}`);
          console.log("Request: "+requestResponse.data);
          setRequests(requestResponse.data);
         

        }catch(error){
            console.log("Error fetching data",error);

        }

    };
    if(userInfo && userInfo.id){
        fetchData();
    }
   
  }, [userInfo]);
  if(!userInfo || !requests || !stationId){
    return <div>Loading...</div>
  }
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return(
    <div>
      <div className='header-container'>
          <h1>Finance Page</h1>
          <Link to={'/add-report'} className='btn btn-success'>Create Report</Link>
          <LogoutButton/>
      </div>

      <div className='title-container'>
        <h2>Finished Requests</h2>
      </div>

      <div className='finance-request-container'>
        {requests.map((request, index)=>(
          <div key={index} className='listing-container'>
            <p>Animal Name: {request.animalName}</p>
            <p>Creation Date: {formatDate(request.creationDate)}</p>
            <p>Arrival Date: {formatDate(request.arrivalDate)}</p>
            <p>Price: {request.price}$</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default FinancePage;