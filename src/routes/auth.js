const express = require("express")
const authRouter = express.Router()
const { validateSignupInput } = require("../util/validation")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

authRouter.post("/signup", async (req, res) => {
    // validate the data sended by client
    try {
        validateSignupInput(req)
        // now extract the validated data from req,body
        const { firstName, lastName, emailId, password } = req.body;
        // encrypt the password using bycrypt libraryh (npm install bcryptjs)
        const passwordHash = await bcrypt.hash(password, 10)
        const user = new User({
            firstName,
            lastName,
            emailId,     // ✅ correct spelling
            password: passwordHash
        });
        const savedUser =  await user.save() // data will be save onto the database and save() function return a promise , so we will use await 
        
        // create a jwt token using jwt.sign()
        // const token =   jwt.sign({_id:user._id} , "secretmasala@123_321" , {expiresIn:"7d"})
        const token =   savedUser.getJWT()

        // add the token to cookie and send back to user
        //Assuming 'token' variable holds your generated JWT string
        res.cookie("token" , token , {expires: new Date (Date.now()+8*3600000)}) // this cookies expires in 8hr pff
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(400).send("Error Saving the user :" + err.message)
    }

})

authRouter.post("/login", async (req, res) => {
    try {
        // Extracting emailId and password from the client's request body
        const { emailId, password } = req.body;

        // Searching the database for a user with the provided emailId
        // findOne() returns the first matching document or null if not found
        const user = await User.findOne({ emailId: emailId });


        // If user is not found, throw an error indicating invalid credentials
        if (!user) {
            throw new Error("Invalid user");
        }

        // Comparing the plain password (from client) with the hashed password stored in the database (user.password)
        // bcrypt.compare() returns true if passwords match, otherwise false
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        // dont forget to use await , face problem to show error in frontend bc error are not showing up  
        const isPasswordValid = await user.validatePassword(password)

        // If password doesn't match, throw an error in json 
        if (!isPasswordValid) {
        //    return res.status(401).json({ error: "Invalid password" });
        throw new Error("Invalid password");
          }
          

        // create a jwt token using jwt.sign()
        // const token =   jwt.sign({_id:user._id} , "secretmasala@123_321" , {expiresIn:"7d"})
        const token =   user.getJWT()

        // add the token to cookie and send back to user
        //Assuming 'token' variable holds your generated JWT string
        res.cookie("token" , token , {expires: new Date (Date.now()+8*3600000)}) // this cookies expires in 8hr pff
       

        // If both email and password are valid, send the user data as response
        res.send(user);

    } catch (err) {
        // Catch any error during the process and send a 400 Bad Request response with the error message
        res.status(400).send( err.message);
    }
});

authRouter.post("/logout" , async (req , res) => {
    try {
      //**Clear the cookie named "token" from the browser
      //**This effectively logs the user out on the client side
          //** It removes the token from cookies by setting it to expire immediately. This expired cookie is sent back to the browser, and the browser automatically deletes it, so it no longer stores the cookie. 
      res.clearCookie("token")
      res.send("logged out successfully")  
    } catch (error) {
        res.status(400).send("Logout failed: " + err.message);
    }

})

module.exports = authRouter;

