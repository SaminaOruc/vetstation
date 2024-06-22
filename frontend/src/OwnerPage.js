import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import LogoutButton from './LogoutButton';
import styles from './Background.css';
import axios from "axios";

function OwnerPage(){
  const [stations, setStations]=useState(null);
  const [reports, setReports]=useState(null);

  useEffect(()=>{
    axios.get("http://localhost:8081/get-all-stations")
    .then(response=>setStations(response.data))
    .catch(error=>console.error("Error fetching users information", error));
  }, []);

  useEffect(()=>{
    axios.get("http://localhost:8081/get-all-reports")
    .then(response=>setReports(response.data))
    .catch(error=>console.error("Error fetching users information", error));
  }, []);

  if(!reports || !stations){
    return <div>Loading...</div>
  }
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return(
    <div>
      <div className='header-container'> 
          <h1>Owner Page</h1>
          <div className='buttons-container'>
            <Link to="/create-station" class="btn btn-success">Create Station</Link>
            <Link to="/add-equipment" className="btn btn-success">Add Equipment</Link>
            <Link to="/add-medicine" className="btn btn-success">Add Medicine</Link>
            <Link to="/add-employee" className="btn btn-success">Add Employee</Link>
          </div>
          <LogoutButton/>
      </div>

      <div className='title-container'>
        <h2>Stations List</h2>
      </div>
      <div className='owner-station-container'>
        {stations.map((station, index)=>(
          <div key={index} className='listing-container'>
            <p>Name: {station.name}</p>
            <p>Address: {station.address}</p>
            <p>City: {station.profit}</p>
            <p>Creation Date: {formatDate(station.creationDate)}</p>
          </div>
        ))}
      </div>


      <div className='title-container'>
        <h2>Reports List</h2>
      </div>

      <div className='owner-report-container'>
        {reports.map((report,index)=>(
          <div key={index} className='listing-container'>
            <p>Title: {report.title}</p>
            <p>Content: {report.content}</p>
            <p>Creation Date: {formatDate(report.creationDate)}</p>
            <p>Priorty: {report.priority}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OwnerPage;