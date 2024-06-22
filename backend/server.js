const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const session=require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const moment=require("moment");

const app=express();

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: "123456789",
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 1000*60*60*24
    },
}))

const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "vetstation"
})

db.connect((err) => {
    if (err) {
        console.error("Database connection error:", err);
    } else {
        console.log("Database connected successfully");
    }
});

app.listen(8081, ()=>{
    console.log("listening");
})

app.post("/signup", (req, res)=>{
    try{
        const role="USER";
        const sql="INSERT INTO users(email,nickname,firstName,lastName,password,role,birthDate) VALUES(?, ?, ?, ?, ?, ?, ?)";
        const values=[req.body.email, req.body.nickname, req.body.firstName, req.body.lastName, req.body.password, role, req.body.birthDate]
        db.query(sql, values, (err, data)=>{
            if(err){
                console.error("SQL Insert Error:",err);
                return res.json("Error");
            }
            return res.json(data);
        });
    }catch(error){
        console.error(error);
        return res.json("Error");
    }
})

app.post("/login", (req, res) => {
    try {
        const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
        const email = req.body.email;
        const password = req.body.password;

        console.log(`Attempting to login with email: ${email}`);
        console.log(`Attempting to login with password: ${password}`);

        db.query(sql, [email, password], (err, data) => {
            if (err) {
                console.error("Database error:", err);
                return res.json("Error");
            }

            console.log("Query result:", data);

            if (data.length > 0) {
                const user = data[0];
                console.log("User found:", user);

                switch (user.role) {
                    case "USER":
                        return res.json({ roleName: "USER", user: user });
                    case "OWNER":
                        return res.json({ roleName: "OWNER", user: user });
                    case "MANAGER":
                        return res.json({ roleName: "MANAGER", user: user });
                    case "FINANCE":
                        return res.json({ roleName: "FINANCE", user: user });
                    case "HR":
                        return res.json({ roleName: "HR", user: user });
                    case "VET":
                        return res.json({ roleName: "VET", user: user });
                    case "VETTECH":
                        return res.json({ roleName: "VETTECH", user: user });
                    default:
                        return res.json("Unknown role");
                }
            } else {
                console.log("No user found with the provided email and password.");
                return res.json("Failed");
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.json("Error");
    }
});

app.post("/create-station", (req, res)=>{
    try{
        const profit=0;
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const creationDate = `${year}-${month}-${day}`;
        const sql="INSERT INTO stations(address,city,name,profit,creationDate) VALUES(?, ?, ?, ?, ?)";
        const values=[req.body.address, req.body.city, req.body.name, profit, creationDate];
        db.query(sql, values, (err, data)=>{
            if(err){
                console.error("SQL Insert Error:",err);
                return res.json("Error");
            }
            return res.json(data);
        });
    }catch(error){
        console.error(error);
        return res.json("Error");
    }
})

app.get("/get-all-stations", (req, res)=>{
    const sql="SELECT * FROM stations";
    db.query(sql, (err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })
})

app.post("/add-equipment", (req, res)=>{
    try{
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const addedDate = `${year}-${month}-${day}`;
        const sql ="INSERT INTO equipments(name,price,quantity,addedDate,stationId) VALUES(?, ?, ?, ?, ?)";
        const values =[req.body.name, req.body.price, req.body.quantity, addedDate, req.body.station];
        db.query(sql, values, (err, data)=>{
            if(err){
                console.error("SQL Insert Error:",err);
                return res.json("Error");
            }
            return res.json(data);
        }); 
    }catch(error){
        console.error(error);
        return res.json("Error");
    }
})

app.post("/add-medicine", (req, res)=>{
    try{
        const sql ="INSERT INTO medicines(name,quantity,price,category,producer,stationId) VALUES(?, ?, ?, ?, ?, ?)";
        const values =[req.body.name, req.body.quantity, req.body.price, req.body.category, req.body.producer, req.body.station];
        db.query(sql, values, (err, data)=>{
            if(err){
                console.error("SQL Insert Error:",err);
                return res.json("Error");
            }
            return res.json(data);
        }); 
    }catch(error){
        console.error(error);
        return res.json("Error");
    }
})

app.post("/add-employee", async (req, res) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hireDate = `${year}-${month}-${day}`;
    const userSql = "INSERT INTO users(email, nickname, firstName, lastName, password, role, birthDate) VALUES(?, ?, ?, ?, ?, ?, ?)";
    const userValues = [req.body.email, req.body.nickname, req.body.firstName, req.body.lastName, req.body.password, req.body.role, req.body.birthDate];
    const findUserSql = "SELECT * FROM users WHERE email = ?";
    const email = req.body.email;
    const employeeSql = "INSERT INTO employees(address, city, hireDate, pay, userId, stationId) VALUES(?, ?, ?, ?, ?, ?)";
    const employeeValues = [req.body.address, req.body.city, hireDate, req.body.pay, null, req.body.station];
    try {
        await new Promise((resolve, reject) => {
            db.query(userSql, userValues, (err, result) => {
                if (err) {
                    console.error("SQL Insert Error:", err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        const user = await new Promise((resolve, reject) => {
            db.query(findUserSql, email, (err, result) => {
                if (err) {
                    console.error("SQL Find Error:", err);
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            });
        });
        employeeValues[4] = user.id;
        await new Promise((resolve, reject) => {
            db.query(employeeSql, employeeValues, (err, result) => {
                if (err) {
                    console.error("SQL Insert Error:", err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        return res.json({ message: "Employee added successfully" });
    } catch (error) {
        console.error(error);
        return res.json("Error");
    }
});

app.get("/get-station/:userId",(req,res)=>{
    const userId=req.params.userId;
    const sql="SELECT stationId FROM employees WHERE userId=?";
    db.query(sql, [userId],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })
}

)

app.get("/get-employee/:userId",(req,res)=>{
    const userId=req.params.userId;
    const sql="SELECT id FROM employees WHERE userId=?";
    db.query(sql, [userId],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })
}
)

app.post("/add-report",(req,res)=>{
    try{
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const creationDate = `${year}-${month}-${day}`;
        const sql ="INSERT INTO reports(title,content,creationDate,priority,employeeId,stationId) VALUES(?, ?, ?, ?, ?, ?)";
        const values =[req.body.title, req.body.content, creationDate, req.body.priority, req.body.employee, req.body.station];
        db.query(sql, values, (err, data)=>{
            if(err){
                console.error("SQL Insert Error:",err);
                return res.json("Error");
            }
            return res.json(data);
        }); 
    }catch(error){
        console.error(error);
        return res.json("Error");
    }
}
)

app.get("/get-station-information/:stationId",(req,res)=>{
    const stationId=req.params.stationId;
    const sql="SELECT * FROM stations WHERE id=?";
    db.query(sql, [stationId],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })



})

app.get("/get-station-medicine/:stationId",(req,res)=>{
    const stationId=req.params.stationId;
    const sql="SELECT * FROM medicines WHERE stationId=?";
    db.query(sql, [stationId],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })

})

app.get("/get-station-equipment/:stationId",(req,res)=>{
    const stationId=req.params.stationId;
    const sql="SELECT * FROM equipments WHERE stationId=?";
    db.query(sql, [stationId],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })

})

app.get("/get-station-report/:stationId",(req,res)=>{
    const stationId=req.params.stationId;
    const sql="SELECT * FROM reports WHERE stationId=?";
    db.query(sql, [stationId],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })
})

app.post("/create-medical-record", (req, res) => {
    try {
        const { animalName, species, domestic, age, month, alergies, vaccination, user, userEmail, station } = req.body;
        if (userEmail) {
            const findEmployeeIdSql = "SELECT id FROM employees WHERE userId = ?";
            const findUserIdSql = "SELECT id FROM users WHERE email = ?";
            db.query(findEmployeeIdSql, [user], (err, userIdResult) => {
                if (err) {
                    console.error("SQL Select Error:", err);
                    return res.json("Error");
                }
                if (userIdResult.length === 0) {
                    return res.json("No user found with provided userId");
                }
                const employeeId = userIdResult[0].id;
                db.query(findUserIdSql, [userEmail], (err, stationIdResult) => {
                    if (err) {
                        console.error("SQL Select Error:", err);
                        return res.json("Error");
                    }

                    if (stationIdResult.length === 0) {
                        return res.json("No user found with provided email");
                    }
                    const userId = stationIdResult[0].id;
                    const sql = "INSERT INTO medical_records(animalName, species, domestic, age, month, alergies, vaccination, userId, employeeId, stationId) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    const values = [animalName, species, domestic, age, month, alergies, vaccination, userId, employeeId, station];
                    db.query(sql, values, (err, data) => {
                        if (err) {
                            console.error("SQL Insert Error:", err);
                            return res.json("Error");
                        }
                        return res.json(data);
                    });
                });
            });
        } else {
            const sql = "INSERT INTO medical_records(animalName, species, domestic, age, month, alergies, vaccination, userId, stationId) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const values = [animalName, species, domestic, age, month, alergies, vaccination, user, station];
            db.query(sql, values, (err, data) => {
                if (err) {
                    console.error("SQL Insert Error:", err);
                    return res.json("Error");
                }
                return res.json(data);
            });
        }
    } catch (error) {
        console.error(error);
        return res.json("Error");
    }
});

app.get("/get-medical-record/:userId", (req,res)=>{
    const userId=req.params.userId;
    const sql="SELECT * FROM medical_records WHERE userId=?";
    db.query(sql, [userId],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })

})

app.put("/update-medical-record/:recordId",(req,res)=>{
    try{
        const recordId=req.params.recordId;
        const sql ="UPDATE medical_records SET animalName =?, species=?,domestic = ?, age=?,month=?,alergies=?,vaccination=?,stationId=? WHERE id=?";
        const values =[req.body.animalName, req.body.species, req.body.domestic, req.body.age, req.body.month, req.body.alergies, req.body.vaccination, req.body.station];
        db.query(sql, [...values,recordId], (err, data)=>{
            if(err){
                console.error("SQL Insert Error:",err);
                return res.json("Error");
            }
            return res.json(data);
        }); 
    }catch(error){
        console.error(error);
        return res.json("Error");
    }



})

app.delete("/delete-medical-record/:recordId", (req,res)=>{
    const recordId=req.params.recordId;
    const sql="DELETE FROM medical_records WHERE id=?";
    db.query(sql, [recordId],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })

})

app.get("/get-selected-medical-record/:recordId",(req,res)=>{
    const recordId=req.params.recordId;
    const sql="SELECT * FROM medical_records WHERE id=?";
    db.query(sql, [recordId],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })
})

app.post("/create-request", (req,res)=>{
    try{
        const status="CREATED";
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const creationDate = `${year}-${month}-${day}`;
        const sql ="INSERT INTO requests(content,status,creationDate,userId,recordId,stationId) VALUES(?, ?, ?, ?, ?, ?)";
        const values =[req.body.content, status, creationDate, req.body.user, req.body.record, req.body.station];
        db.query(sql, values, (err, data)=>{
            if(err){
                console.error("SQL Insert Error:",err);
                return res.json("Error");
            }
            return res.json(data);
        }); 
    }catch(error){
        console.error(error);
        return res.json("Error");
    }

})

app.get("/get-station-medical-record/:stationId", (req,res)=>{
    const stationId=req.params.stationId;
    const sql="SELECT * FROM medical_records WHERE stationId=?";
    db.query(sql, [stationId],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })

})

app.post("/create-request-vettech", async (req,res)=>{
    try{
        const findUserSql ="SELECT userId FROM medical_records WHERE id=?"
        const user = await new Promise((resolve, reject) => {
            db.query(findUserSql, req.body.record, (err, result) => {
                if (err) {
                    console.error("SQL Find Error:", err);
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            });
        });
        const status="PENDING";
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const creationDate = `${year}-${month}-${day}`;
        const sql ="INSERT INTO requests(content,status,creationDate,arrivalDate,userId,recordId,employeeId,stationId) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
        const values =[req.body.content, status, creationDate,req.body.arrivalDate, user.userId, req.body.record,req.body.employee, req.body.station];
        db.query(sql, values, (err, data)=>{
            if(err){
                console.error("SQL Insert Error:",err);
                return res.json("Error");
            }
            return res.json(data);
        }); 
    }catch(error){
        console.error(error);
        return res.json("Error");
    }

})

app.get("/get-all-created-requests/:stationId",(req,res)=>{
    const stationId=req.params.stationId;
    const sql="SELECT * FROM requests WHERE status='CREATED' AND stationId=?";
    db.query(sql,[stationId],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })

})

app.post("/set-arrival-date/:requestId",(req,res)=>{
    const requestId=req.params.requestId;
    const sql="UPDATE requests SET status='PENDING', arrivalDate=?, employeeId=? WHERE id=?";
    db.query(sql,[req.body.arrivalDate,req.body.employee, requestId],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })
})
app.get("/get-all-pending-requests/:stationId",(req,res)=>{
    const stationId=req.params.stationId;
    const sql="SELECT * FROM requests WHERE status='PENDING' AND stationId=?";
    db.query(sql,[stationId],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })

})
app.post("/finish-request/:requestId",(req,res)=>{
    const requestId=req.params.requestId;
    const sql="UPDATE requests SET status='FINISHED', diagnosis=?, price=? WHERE id=?";
    db.query(sql,[req.body.diagnosis,req.body.price, requestId],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })
})
app.get("/get-all-finished-requests/:stationId",(req,res)=>{
    const stationId=req.params.stationId;
    const sql="SELECT * FROM requests as r INNER JOIN  medical_records as mr ON r.recordId=mr.id WHERE status='FINISHED' AND r.stationId=?";
    db.query(sql,[stationId],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })

})

app.post("/add-receipt", (req, res)=>{
    try{
        const sql ="INSERT INTO receipts(`usage`,issueDate,medicineId,recordId) VALUES(?, ?, ?, ?)";
        const values =[req.body.usage, req.body.issueDate, req.body.medicine, req.body.record];
        db.query(sql, values, (err, data)=>{
            if(err){
                console.error("SQL Insert Error:",err);
                return res.json("Error");
            }
            return res.json(data);
        }); 
    }catch(error){
        console.error(error);
        return res.json("Error");
    }
})

app.get("/get-user-receipts/:userId", (req,res)=>{
    const userId=req.params.userId;
    const sql="SELECT * FROM receipts AS r INNER JOIN medical_records AS mr ON r.recordId=mr.id INNER JOIN medicines as m ON r.medicineId=m.id WHERE mr.userId=?";
    db.query(sql,[userId],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })

})
app.get("/get-all-reports", (req, res)=>{
    const sql="SELECT * FROM reports";
    db.query(sql, (err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })
})

app.get("/get-station-employees/:stationId", (req, res)=>{
    const stationId=req.params.stationId;
    const sql="SELECT * FROM employees AS e INNER JOIN users AS u ON e.userId=u.id WHERE e.stationId = ?";
    db.query(sql, [stationId], (err, data)=>{
        if(err) return res.json("Error");
        return res.json(data); 
    })
})


