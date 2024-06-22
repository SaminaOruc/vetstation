import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import LogoutButton from './LogoutButton';
import styles from './Background.css';
import axios from 'axios';

function HrPage(){
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [stationId, setStationId] = useState(null);
    const [employees, setEmployees] = useState(null);

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem("user")));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const stationResponse = await axios.get(`http://localhost:8081/get-station/${userInfo.id}`);
                console.log("Station: "+stationResponse.data[0].stationId);
                setStationId(stationResponse.data[0].stationId);
                const employeeResponse = await axios.get(`http://localhost:8081/get-station-employees/${stationResponse.data[0].stationId}`);
                console.log("Employee: "+employeeResponse.data);
                setEmployees(employeeResponse.data);
                console.log(employees);
            } catch(error){
                console.error("Error fetching data", error);
            }  
        };
        if(userInfo && userInfo.id){
            fetchData();
        }
    }, [userInfo]);

    if (!userInfo || !stationId || !employees){
        return <div>Loading...</div>
    }
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return(
        <div>
            <div className='header-container'>
                <h1>HR Page</h1>
                <div className='buttons-container'>
                    <Link to="/add-employee-hr" className="btn btn-success">Hire Employee</Link>
                    <Link to="/add-report" className="btn btn-success">Create Report</Link>
                </div>
                <LogoutButton />
            </div>
            
            <div className='title-container'>
                <h2>Station Employees</h2>
            </div>

            <div className="hr-employee-container">
                {employees.map((employee, index)=>(
                    <div key={index} className='listing-container'>
                        <p>First Name: {employee.firstname}</p>
                        <p>Last Name: {employee.lastname}</p>
                        <p>Email: {employee.email}</p>
                        <p>Address: {employee.address}</p>
                        <p>City: {employee.city}</p>
                        <p>Birth Date: {(formatDate(employee.birthDate))}</p>
                        <p>Hire Date: {(formatDate(employee.hireDate))}</p>
                        <p>Role: {employee.role}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HrPage;