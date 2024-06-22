import React, {useEffect ,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddMedicineManagerPage(){
      const [values, setValues]=useState({
        name:'',
        quantity:'',
        price:'',
        category:'Antibiotics',
        producer:'',
        station:''
    })
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [stationId, setStationId]=useState(null);

    useEffect(() => {
      setUserInfo(JSON.parse(localStorage.getItem("user")));
    }, []);

    useEffect(() => {
        if (userInfo && userInfo.id) {
            axios.get(`http://localhost:8081/get-station/${userInfo.id}`)
                .then(response => setStationId(response.data[0].stationId))
                .catch(error => console.error("Error finding station", error));
        }
    }, [userInfo]);

    const navigate=useNavigate();
    const handleInput=(event)=>{
      setValues((prev) =>({...prev, [event.target.name]: event.target.value}));
    }

    const handleSubmit=(event)=>{
      event.preventDefault();
      const formattedValues={
        ...values,
        station: stationId
      }
      axios.post("http://localhost:8081/add-medicine", formattedValues)
      .then(res=>{
          console.log("Server response:", res.data);
          navigate("/manager-page");
      })
      .catch(err=>console.log(err));
    }
    if(!userInfo){
      return <div>Loading...</div>
    }
    if(!stationId){
        return <div>Loading...</div>
    }
    
    return(
      <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
              <div className="bg-white p-3 rounded w-25">
                  <Link to="/manager-page" className="btn btn-success">Return to Manager Page</Link>
                  <h2>Add Medicine</h2>
                  <form action="" onSubmit={handleSubmit}>
                      <div className="mb-3">
                          <label htmlFor="name">Name</label>
                          <input type="text" placeholder="Enter Name" name="name"
                          onChange={handleInput} className="form-control rounded-0"/>
              
                      </div>
                      <div className="mb-3">
                          <label htmlFor="quantity">Quantity</label>
                          <input type="number" placeholder="Enter Quantity" name="quantity"
                          onChange={handleInput} className="form-control rounded-0"/>
                        
                      </div>
                      <div className="mb-3">
                          <label htmlFor="price">Price</label>
                          <input type="number" step="0.01" placeholder="Enter Price" name="price"
                          onChange={handleInput} className="form-control rounded-0"/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="category">Choose Medicine Category</label>
                        <select name="category" onChange={handleInput} className="form-control rounded-0">
                          <option value="Antibiotics">Antibiotics</option>
                          <option value="Antiparasitic">Antiparasitic</option>
                          <option value="Dermatology">Dermatology</option>
                          <option value="Nutrition">Nutrition</option>

                        </select>

                      </div>
                      <div className="mb-3">
                          <label htmlFor="producer">Producer</label>
                          <input type="text" placeholder="Enter Producer" name="producer"
                          onChange={handleInput} className="form-control rounded-0"/>
              
                      </div>
                      <button type="submit" className="btn btn-success w-100">Submit</button>
                  </form>
              </div>
          </div>
    )
}

export default AddMedicineManagerPage;