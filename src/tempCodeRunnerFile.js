const express = require("express")
const app = express
const connectDB = require("./config/database")
const User = require("./models/user")


app.post("/signup" ,async (req , res)=>{
    const userObj = {
        firstNamr : "Ritesh",
        lastName : "Rautela",
        emialId : "iDominc@gmail.com",
        password : "xyChromosome",
        gender: "Male"
    }
    // creating a new user with userObj data  , in technically term im creating a new instance of a User Model
    const user = new User(userObj)
    await user.save() // data will be save onto the database and save() function return a promise , so we will use await 
    res.send("user Added successfully")
} )

connectDB().then(()=>{
    console.log("database connection it is indeed sucessfull")
    app.listen( ()=>{
        console.log("server is sucessfully listening at port 7777")
    })
    }).catch((err)=>{
        console.log("database cannot be connected")
    })