const mongoose = require("mongoose")
// now we will connect to the monogdb using , connectFb is asnyc fn that return promise , and we are calling this coonectdb in app.js file 
const connectDB = async() =>{
    // moongose.connect() return a promise so it will be good to write this inside a async function
    await mongoose.connect(process.env.DB_CONNECTION_SECRET)
}

module.exports = connectDB;

