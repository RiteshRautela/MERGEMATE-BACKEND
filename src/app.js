const express = require("express")
const app = express()
const connectDB = require("./config/database")
const cookieParser = require('cookie-parser');



// middleware that convert json into object and add into req , this middlewares is activated fot all the route 
app.use(express.json())
// cookie parser miidleware to read/write cookie made by expressjs
app.use(cookieParser());

// importing routes
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")

// how to use this routes ? suppose a api comes in eg==> /login ,  it will come over app.use("/" , authRouter) it check"/" and goes to authRouter then it will check for all the apis over authRouter like signup , login , it will match login and run login code and if the respons is sendfrom login then it will not go anyfurther pff
app.use("/" , authRouter)
app.use("/" , profileRouter)
app.use("/" , requestRouter)






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