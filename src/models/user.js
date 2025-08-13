const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
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
    gender: {
        type: String,
        enum: {
          values: ["male", "female", "others"],
          message: '{VALUE} is not a valid gender', // ✅ use single/double quotes
        },
      },

    about:{
        type:String,
        default:"This is a defualt about of the user "
    },
    skills:{
        type:[String]
    },
    photoUrl: {
        type: String,
        default: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp", // can be set to a placeholder image URL
        trim: true
    }

}, {timestamps:true}
)

// schema methods 
userSchema.methods.getJWT = function() {
    // 'this' here points to the specific user document
    const user = this;
    
    // Create the JWT using the user's ID
    const token = jwt.sign({ _id: user._id }, "secretmasala@123_321", { expiresIn: "7d" });
    
    return token;
}

userSchema.methods.validatePassword = async function(password){
    // this here points to the specific user doucment 
    const user= this
     const isPasswordValid = await bcrypt.compare(password, user.password)
     return isPasswordValid;
}


// once we created a schema now we create a model 
// we do mogoose.model(name of the model , schema )
// In Mongoose, a Model is a JavaScript class (constructor function) that is built from a Schema, and lets you create and manage documents in a specific MongoDB collection.

// const User = mongoose.model("User" , userSchema)
// module.exports = User 
// or
module.exports = mongoose.model("User" , userSchema)