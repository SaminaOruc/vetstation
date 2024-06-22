import React, {useEffect ,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddReportPage(){
    const [values, setValues]=useState({
        title:'',
        content:'',
        priority:'HIGH'
    })
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
    
    const [employeeId,setEmployeeId]=useState(null);
    const [stationId, setStationId]=useState(null);

    useEffect(() => {
      setUserInfo(JSON.parse(localStorage.getItem("user")));
    }, []);

    const navigate=useNavigate();

    const handleInput=(event)=>{
      setValues((prev) =>({...prev, [event.target.name]: event.target.value}));
    }

    const handleSubmit=(event)=>{
      event.preventDefault();
      const formattedValues={
        ...values,
        employee: employeeId,
        station: stationId

      }
      axios.post("http://localhost:8081/add-report", formattedValues)
      .then(res=>{
          console.log("Server response:", res.data);
          if(userInfo.role==="HR"){
            navigate("/hr-page");
          }else if(userInfo.role==="FINANCE"){
            navigate("/finance-page");
          }else if(userInfo.role==="VETTECH"){
            navigate("/vettech-page");
          }else{
            navigate("/login");
          }

      })
      .catch(err=>console.log(err));
    }
    useEffect(() => {
        const fetchData=async()=>{
          try{
            const employeeResponse=await axios.get(`http://localhost:8081/get-employee/${userInfo.id}`);
            console.log("Employee: "+employeeResponse.data[0].id);
            setEmployeeId(employeeResponse.data[0].id);
            const stationResponse=await axios.get(`http://localhost:8081/get-station/${userInfo.id}`);
            console.log("Station: "+stationResponse.data[0].stationId);
            setStationId(stationResponse.data[0].stationId);
          }catch(error){
            console.error("Error fetching data", error);

          }
        };
        if (userInfo && userInfo.id){
           fetchData();
        }
       
          
    }, [userInfo]);
    if(!userInfo || !employeeId || !stationId){
      return <div>Loading...</div>
    }
  
    return(
        <div className="d-flex justify-content-center align-items-center bg-warning vh-100">
        <div className="bg-white p-3 rounded w-25">
            {userInfo && userInfo.role === "HR" ? (
                      <Link to={'/hr-page'} className="btn btn-success w-10">Return to HR Page</Link>
                  ) : userInfo && userInfo.role === "FINANCE" ? (
                      <Link to={'/finance-page'} className="btn btn-success w-10">Return to Finance Page</Link>
                  ) :userInfo && userInfo.role === "VETTECH" ?  (
                      <Link to={'/vettech-pag'} className="btn btn-success w-10">Return to Vet Technician Page</Link>
                  ) : (
                     <Link to={'/login'} className="btn btn-success w-10">Return to Login Page</Link>
                  )
            }
            <h2>Create Report</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder="Enter Title" name="title"
                    onChange={handleInput} className="form-control rounded-0"/>
                   
                </div>
                <div className="mb-3">
                    <label htmlFor="content">Content</label>
                    <textarea placeholder="Enter Content" name="content"
                    onChange={handleInput} className="form-control rounded-0" rows="4"/>
                   
                </div>
                <div className="mb-3">
                      <label htmlFor="priority">Choose Priority</label>
                      <select name="priority" onChange={handleInput} className="form-control rounded-0">
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>

                      </select>

                    </div>

                <button type="submit" className="btn btn-success w-100">Create</button>
                
            </form>
        </div>
    </div>
  )
}

export default AddReportPage;