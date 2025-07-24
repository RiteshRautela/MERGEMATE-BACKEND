const express = require("express")
const profileRouter = express.Router()
const {userAuth} = require('../middlewares/auth')



profileRouter.get("/profile" , userAuth ,(req,res)=>{
    try {
        const user = req.user
        res.send(user)
        
    } catch (err) {
        res.status(400).send("cannot access profile: " + err.message);
    }
})

module.exports = profileRouter