const express = require("express")
const profileRouter = express.Router()
const {userAuth} = require('../middlewares/auth')
const { validaeEditProfileData } = require("../util/validation")




profileRouter.get("/profile/view" , userAuth ,(req,res)=>{
    try {
        const user = req.user
        res.send(user)
        
    } catch (err) {
        res.status(400).send("cannot access profile: " + err.message);
    }
})

profileRouter.patch("/profile/edit" , userAuth , async (req,res)=>{
    try {
        // validate data
        validaeEditProfileData(req)  // yes you can edit profile
        const user = req.user
        // before updating
        console.log(user)
        // editing the profile
        Object.keys(req.body).forEach((key) => user[key] = req.body[key])
        // after editing 
        console.log(user)
        await user.save()
        // res.send( user.firstName +" your Profile Edited Successfully " )  orr

       // ✅ Modern & structured response format (Recommended)
        res.json({
            message: `${user.firstName}, your Profile Edited Successfully`,
            data: user
          });
          

        
    } catch (err) {
        res.status(400).send("cannot edit profile: " + err.message);
    }
})





module.exports = profileRouter