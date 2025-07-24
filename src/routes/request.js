const express = require("express")
const { userAuth } = require("../middlewares/auth")
const requestRouter = express.Router()

requestRouter.post("/sendConnectionRequests" , userAuth , (req,res)=>{
    const user = req.user // userAuth middlewarea added the user in the req object

    // sendind a connection request
    res.send(user.firstname + "send the connection request")
})


module.exports =  requestRouter

