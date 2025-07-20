const express = require("express")
const app = express()
const connectDB = require("./config/database")
const User = require("./models/user")
const { userAuth } = require("./util/validation")
const bcrypt = require("bcryptjs")

// middleware that convert json into object and add into req , this middlewares is activated fot all the route 
app.use(express.json())
app.post("/signup", async (req, res) => {
    // validate the data sended by client
    try {
        userAuth(req)
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
        await user.save() // data will be save onto the database and save() function return a promise , so we will use await 
        res.send("user Added successfully")
    } catch (err) {
        res.status(400).send("Error Saving the user :" + err.message)
    }

})


app.post("/login", async (req, res) => {
    try {
        // Extracting emailId and password from the client's request body
        const { emailId, password } = req.body;

        // Searching the database for a user with the provided emailId
        // findOne() returns the first matching document or null if not found
        const user = await User.findOne({ emailId });

        // If user is not found, throw an error indicating invalid credentials
        if (!user) {
            throw new Error("Invalid user");
        }

        // Comparing the plain password (from client) with the hashed password stored in the database (user.password)
        // bcrypt.compare() returns true if passwords match, otherwise false
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If password doesn't match, throw an error
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        // If both email and password are valid, send the user data as response
        res.send(user);

    } catch (err) {
        // Catch any error during the process and send a 400 Bad Request response with the error message
        res.status(400).send("Error logging in the user: " + err.message);
    }
});

// connectDB() is a function call that returns a Promise.
// If the Promise resolves, it means the DB is successfully connected to the application.
// good practise -> make database coonection first then listen/connect onto the server
connectDB().then(() => {
    console.log("database connection it is indeed sucessfull")
    app.listen(7777, () => {
        console.log("server is sucessfully listening at port 7777")
    })
}).catch((err) => {
    console.log("Database connection failed:", err.message);
});