import React, {useEffect, useState} from 'react';
import LogoutButton from './LogoutButton';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Background.css';

function Home(){
    const [stations, setStations]=useState(null);
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
   
    const [usersRecords, setUsersRecords]=useState(null);
    const [receipts, setReceipts]=useState(null);

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
                console.log("Medical records", usersRecordsResponse.data);
                setUsersRecords(usersRecordsResponse.data);
                const receiptsResponse=await axios.get(`http://localhost:8081/get-user-receipts/${userInfo.id}`);
                console.log("Receipts: ",receiptsResponse.data);
                setReceipts(receiptsResponse.data);

            }catch(error){
                console.log("Error fetching data",error);

            }

        };
        if(userInfo && userInfo.id){
            fetchData();
        }
       
    }, [userInfo]);

    const handleRecordDelete=async(id)=>{
        axios.delete(`http://localhost:8081/delete-medical-record/${id}`)
        .then(response=>{
            console.log("Server response:",response.data);
            window.location.reload();
        })
        .catch(error =>{
            console.log(error);
            alert(error.response.data.message);
        });
    }

    if(!stations || !userInfo || !usersRecords || !receipts){
        return <div>Loading...</div>
    }
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return(
      <div>
        <div className='header-container'>
            <h1>Home Page</h1>
            <div className='buttons-container'>
                <Link to="/add-medical-record" className="btn btn-success">Create  Medical Record</Link>
                <Link to="/create-request" className="btn btn-success"> Create Request</Link>

            </div>

            <LogoutButton/>
        </div>

        <div className='title-container'>
           <h2>Stations List:</h2>
        </div>
      
        <div className='user-station-container'>
            {stations.map((station,index)=>(
            <div key={index} className='listing-container'>
               <p>Name: {station.name}</p>
               <p>Address: {station.address}</p>
               <p>City: {station.city}</p>

            </div>
          ))}
        </div>

        <div className='title-container'>
          <h2>Users Medical Records</h2>
        </div>
        <div className='user-record-container'>
           
            {usersRecords.map((record, index)=>(
                <div key={index} className='listing-container'>
                    <p>Animal Name: {record.animalName}</p>
                    <p>Species: {record.species}</p>
                    <p>Domestic: {record.domestic}</p>
                    <p>Age: {record.age}</p>
                    <p>Month: {record.month}</p>
                    <p>Alergies: {record.alergies}</p>
                    <p>Vaccination: {record.vaccination}</p>
                    <Link to={`/update-medical-record/${record.id}`} className="btn btn-success">EDIT</Link>
                    <button className="btn btn-danger" onClick={e=>handleRecordDelete(record.id)}>DELETE</button>
                </div>

            ))}
        </div>

        <div className='title-container'>
           <h2>User Receipts</h2>
        </div>
        <div className='user-receipt-container'>
            {receipts.map((receipt, index)=>(
                <div key={index} className='listing-container'>
                    <p>Name: {receipt.name}</p>
                    <p>Usage: {receipt.usage}</p>
                    <p>Issue Date: {formatDate(receipt.issueDate)}</p>
                    <p>Animal Name: {receipt.animalName}</p>

                </div>
            ))}
        </div>
      </div>
  )
}

export default Home;