const mongoose = require("mongoose")
// we create schema using the mongoose.Schea() function which aceept object amd here we define fields and datatype of the Document, here we are creating userSchema 
// in schema we follow camel case naming ... 
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type : String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
    type:String ,
    validate(value) {
        if (!["male", "female", "others"].includes(value.toLowerCase())) {
          throw new Error("Gender data is not valid");
        }
      }
        
    },

    about:{
        type:String,
        default:"This is a defualt about of the user "
    },

})

// once we created a schema now we create a model 
// we do mogoose.model(name of the model , schema )
// In Mongoose, a Model is a JavaScript class (constructor function) that is built from a Schema, and lets you create and manage documents in a specific MongoDB collection.

// const User = mongoose.model("User" , userSchema)
// module.exports = User 
// or
module.exports = mongoose.model("User" , userSchema)