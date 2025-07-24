const validator = require("validator");

const validateSignupInput = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not entered");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    }
};

const validaeEditProfileData = (req) =>{
 try {

    const allowedEditFieds = ["firstName", "lastName", "emailId","gender","age" , "about" ,"skills"];
    // loop thro req body and check if all things mathcing this criteria or not 
     const isEditAllowed = Object.keys(req.body).every(field => allowedEditFieds.includes(field)) // return a boolean 
     if(!isEditAllowed){
        throw new Error("invalid edit req")
     }
    
 } catch (err) {
    throw new Error(err.message)
 }

 
}
module.exports = {
    validateSignupInput,
    validaeEditProfileData
}

