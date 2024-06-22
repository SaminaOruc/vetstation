import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link,useNavigate,useParams } from 'react-router-dom';

function FinishRequestPage(){
    const [values, setValues]=useState({
        diagnosis:'',
        price:''
        
    })
    const {requestId}=useParams();
  
    const navigate=useNavigate();
  
    const handleInput=(event)=>{
        setValues((prev) =>({...prev, [event.target.name]: event.target.value}));
    }
  
    const handleSubmit=(event)=>{
        event.preventDefault();
       
        axios.post(`http://localhost:8081/finish-request/${requestId}`, values)
        .then(res=>{
            console.log("Server response:", res.data);
            navigate("/vet-page");
        })
        .catch(err=>console.log(err));
        
    }
    return(
        <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
        <div className="bg-white p-3 rounded w-25">
            <Link to={'/vet-page'} className='btn btn-success'>Return to Vet page</Link>
            <h2>Finish Request</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="diagnosis">Diagnosis</label>
                    <input type="text" placeholder="Enter Diagnosis" name="diagnosis"
                    onChange={handleInput} className="form-control rounded-0"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="price">Price</label>
                    <input type="number" placeholder="Enter Price" name="price"
                    onChange={handleInput} className="form-control rounded-0"/>
                </div>
                <button type="submit" className="btn btn-success w-100">Submit</button>

            </form>
        </div>
    </div>

  )
}

export default FinishRequestPage;