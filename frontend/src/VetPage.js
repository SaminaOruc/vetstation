import React, {useEffect, useState} from 'react';
import LogoutButton from './LogoutButton';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Background.css';

function VetPage(){
  const [requests,setRequests]=useState(null);
  const [stationId, setStationId]=useState(null);
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(()=>{
    const fetchData = async () => {
        try{
          const stationResponse=await axios.get(`http://localhost:8081/get-station/${userInfo.id}`);
          console.log("Station: "+stationResponse.data[0].stationId);
          setStationId(stationResponse.data[0].stationId);
          const requestResponse=await axios.get(`http://localhost:8081/get-all-pending-requests/${stationResponse.data[0].stationId}`);
          console.log("Requests: "+requestResponse.data);
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
        <h1>Vet Page</h1>
        <div className='buttons-container'>
            <Link to="/add-medical-record" className="btn btn-success">Create Medical Record</Link>
            <Link to="/add-receipt" className="btn btn-success">Create Receipt</Link>
        </div>
        <LogoutButton/>
      </div>
      <div className='title-container'>
        <h2>Ongoing Requests:</h2>
      </div>

      <div className='vet-requests-container'>

        {requests.map((request, index)=>(
          <div key={index} className='listing-container'> 
            <p>Content: {request.content}</p>
            <p>Status: {request.status}</p>
            <p>Creation date: {formatDate(request.creationDate)}</p>
            <p>Arrival date: {formatDate(request.arrivalDate)}</p>
            <Link to={`/finish-request/${request.id}`} className="btn btn-success">Finish</Link>

          </div>
        ))}
      </div>
    </div>
  )
}

export default VetPage;