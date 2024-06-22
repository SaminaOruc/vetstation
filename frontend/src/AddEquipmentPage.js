import React, {useEffect ,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddEquipmentPage(){
    const [values, setValues]=useState({
      name:'',
      price:'',
      quantity:'',
      station:''
  })
  const [stations,setStations]=useState(null);

  const navigate=useNavigate();
  const handleInput=(event)=>{
    setValues((prev) =>({...prev, [event.target.name]: event.target.value}));
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    axios.post("http://localhost:8081/add-equipment", values)
    .then(res=>{
        console.log("Server response:", res.data);
        navigate("/owner-page");
    })
    .catch(err=>console.log(err));
  }
  useEffect(()=>{
      axios.get("http://localhost:8081/get-all-stations")
      .then(response=>setStations(response.data))
      .catch(error=>console.error("Error fetching station information", error));
  }, []);
  if(!stations){
      return <div>Loading...</div>
  }
  return(
    <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
            <div className="bg-white p-3 rounded w-25">
                <Link to="/owner-page" className="btn btn-success">Return to Owner Page</Link>
                <h2>Add Equipment</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Enter Name" name="name"
                        onChange={handleInput} className="form-control rounded-0"/>
            
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price">Price</label>
                        <input type="number" step="0.01" placeholder="Enter Price" name="price"
                        onChange={handleInput} className="form-control rounded-0"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" placeholder="Enter Quantity" name="quantity"
                        onChange={handleInput} className="form-control rounded-0"/>
                       
                    </div>
                    <div className="mb-3"> 
                        <label htmlFor="station">Station</label>
                        <select name="station" onChange={handleInput} className="form-control rounded-0">
                          <option value="">Select a station</option>
                          {stations.map(station=>(
                            <option key={station.id} value={station.id}>{station.name}</option>
                          ))}

                        </select>

                    </div>
                    <button type="submit" className="btn btn-success w-100">Submit</button>
                </form>
            </div>
        </div>
  )
}

export default AddEquipmentPage;