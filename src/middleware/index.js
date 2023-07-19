const User = require("../users/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();

// Get saltRounds from .env for security
const saltRounds = process.env.SALT_ROUNDS;

//Function to hash the password
const hashPass = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds))
        next()
    } catch (error) {
        res.status(501).json({errorMessage: "Error during password hashing.", error:error})
    }
}

//function to check against the hashed passwords
const checkPass = async (req, res, next) => {
    try {
        req.user = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        console.log("Found user: ", req.user)
        const comparePassword = await bcrypt.compare(req.body.password, req.user.password).then(console.log(res));
        console.log("Compare password - ", comparePassword)
        if(!comparePassword){
            throw new Error("Password or username does not match!")
        }
        next();
    } catch (error) {
        res.status(501).json({errorMessage: "Error whilst checking password in system.", error: error});
        console.log(error);
    }
}

//function to check the token
const checkToken = async (req, res, next) => {
    try {
        if (!req.header("Authorization")) {
            throw new Error("No header or token passed in the request")
        }
        const token = req.header("Authorization").replace("Bearer ", "")
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({where: {id: decodedToken.id}})
        if(!user){
            throw new Error("User is not authorised")
        }
        req.authUser = user
        next()
        } catch (error) {
            res.status(501).json({errorMessage: "Error whilst checking token.", error: error});
    }
};

//export all functions
module.exports = {
    hashPass,
    checkPass,
    checkToken
}