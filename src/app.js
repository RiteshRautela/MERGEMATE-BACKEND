const express = require("express")
const app = express()
const connectDB = require("./config/database")
const User = require("./models/user")

// middleware that convert json into object and add into req , this middlewares is activated fot all the route 
app.use(express.json())
app.post("/signup" ,async (req , res)=>{
    // creating new instance of the User model
    const user = new User(req.body)  //  Creating a new instance (document) of the User model (constructor function) 
    //and passing dynamic data received from Postman
    try{
        await user.save() // data will be save onto the database and save() function return a promise , so we will use await 
        res.send("user Added successfully")
    } catch(err){
        res.status(400).send("Error Saving the user :" + err.message)
    }

} )
// connectDB() is a function call that returns a Promise.
// If the Promise resolves, it means the DB is successfully connected to the application.
// good practise -> make database coonection first then listen/connect onto the server
connectDB().then(()=>{
    console.log("database connection it is indeed sucessfull")
    app.listen(7777, ()=>{
        console.log("server is sucessfully listening at port 7777")
    })
    }).catch((err) => {
        console.log("Database connection failed:", err.message);
    });