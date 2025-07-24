const express = require("express")
const app = express()
const connectDB = require("./config/database")
const cookieParser = require('cookie-parser');



// middleware that convert json into object and add into req , this middlewares is activated fot all the route 
app.use(express.json())
// cookie parser miidleware to read/write cookie made by expressjs
app.use(cookieParser());


// 📦 Importing route files (each file contains related API routes)
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

// 🔗 Connecting the routers to the main app
// This tells Express: "Hey, check these route files when any request comes in"

// Example: A POST request comes to /login
// 👉 First, it checks authRouter (since "/" matches)
// 👉 Inside authRouter, it looks for a matching route like router.post("/login")
// 👉 If found, it runs that function and sends a response
// ❌ After a response is sent, Express does NOT check the next routers (like profileRouter or requestRouter)

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);






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