const validator = require("validator");

const userAuth = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName.length || !lastName) {
        throw new Error("Name is not valid");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    }
};

module.exports = {
    userAuth
};
