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

module.exports = {
    validateSignupInput
};
