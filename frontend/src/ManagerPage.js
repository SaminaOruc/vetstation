import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LogoutButton from './LogoutButton';
import styles from './Background.css';

function ManagerPage(){
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [stationId, setStationId]=useState(null);
    const [stationData,setStationData]=useState(null);
    const [medicineData,setMedicineData]=useState(null);
    const [equipmentData, setEquipmentData]=useState(null);
    const [reportData, setReportData]=useState(null);

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem("user")));
    }, []);

    useEffect(() => {
      const fetchStationData = async () => {
          try {
              console.log("Fetching station ID for user ID:", userInfo.id);
              const stationResponse = await axios.get(`http://localhost:8081/get-station/${userInfo.id}`);
              const stationId = stationResponse.data[0].stationId;
              console.log("Station ID response:", stationId);
              setStationId(stationId);
              const stationInfoResponse = await axios.get(`http://localhost:8081/get-station-information/${stationId}`);
              console.log("Station response:", stationInfoResponse.data);
              setStationData(stationInfoResponse.data[0]);
              const stationMedicineResponse=await axios.get(`http://localhost:8081/get-station-medicine/${stationId}`);
              console.log("Station medicine: ",stationMedicineResponse.data);
              setMedicineData(stationMedicineResponse.data);
              const stationEquipmentResponse=await axios.get(`http://localhost:8081/get-station-equipment/${stationId}`);
              console.log("Station equipment: ",stationEquipmentResponse.data);
              setEquipmentData(stationEquipmentResponse.data);
              const stationReportResponse=await axios.get(`http://localhost:8081/get-station-report/${stationId}`)
              console.log("Station report: ",stationReportResponse.data);
              setReportData(stationReportResponse.data);
          } catch (error) {
              console.error("Error fetching data", error);
          }
      };
  
      if (userInfo && userInfo.id) {
          fetchStationData();
      }
    }, [userInfo]);

    if(!userInfo || !stationId || !stationData || !medicineData || !equipmentData || !reportData){
      return <div>Loading...</div>
    }
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
    

    return(
      <div>
        <div className="header-container">
            <h1>Manager Page</h1>
            <div className="buttons-container">
                <Link to="/add-medicine-manager" className="btn btn-success">Add Medicine</Link>
                <Link to="/add-equipment-manager" className="btn btn-success">Add Equipment</Link>
            </div>
            <LogoutButton/>
        </div>

        <div className="title-container">
           <h2>Station Information</h2>
        </div>

        <div className="listing-container center-width-layout">
          <h2>Name: {stationData.name}</h2>
          <p>Address: {stationData.address}</p>
          <p>City: {stationData.city}</p>
          <p>Profit: {stationData.profit}</p>
          <p>Creation Date: {formatDate(stationData.creationDate)}</p>
        </div>

        <div className="title-container">
           <h2>Medicine List</h2>
        </div>
        <div className="manager-medicine-container">         
          {medicineData.map((medicine,index)=>(
            <div key={index} className="listing-container">
              <p>Name: {medicine.name}</p>
              <p>Quantity: {medicine.quantity}</p>
              <p>Price: {medicine.price}</p>
              <p>Category: {medicine.category}</p>
              <p>Producer: {medicine.producer}</p>

            </div>

          ))}

        </div>

        <div className="title-container">
          <h2>Equipment List</h2>
        </div>
        <div className="manager-equipment-container">
         
          {equipmentData.map((equipment,index)=>(
            <div key={index} className="listing-container">
              <p>Name: {equipment.name}</p>
              <p>Price: {equipment.price}</p>
              <p>Quantity: {equipment.quantity}</p>
              <p>Added Date: {formatDate(equipment.addedDate)}</p>

            </div>
          ))}
        </div>
        <div className="title-container">
           <h2>Report List</h2>
        </div>
        <div className="manager-report-container">
      
          {reportData.map((report,index)=>(
            <div key={index} className="listing-container">
              <p>Title: {report.title}</p>
              <p>Content: {report.content}</p>
              <p>Creation date: {formatDate(report.creationDate)}</p>
              <p>Priority: {report.priority}</p>
            </div>
          ))}
        </div>
      </div>
    )
}

export default ManagerPage;