//Import dependancies
const User = require("./model");
const jwt = require("jsonwebtoken");

//Controller for register user
const registerUser = async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        res.status(201).json({
            message: `${req.body.username} succesfully added.`,
            user:{username:newUser.username, email:newUser.email}
        })
    } catch (error) {
        res.status(501).json({errorMessage: "Error whilst registering user.", error: error});
    }
};

//controller for logging in
const login = async (req, res) => {
    try {
        const loggedInUser =  await User.findOne({
            where: {
                username: req.body.username
            }
        })
        const token = await jwt.sign({id: loggedInUser.id}, process.env.SECRET);
        console.log ("********* token = ", token)
            res.status(200).json({
                message: "Logged in successfully.",
                user: {
                    username: loggedInUser.username,
                    email: loggedInUser.email,
                    token: token
                }
            })
    } catch (error) {
        res.status(501).json({errorMessage: "Error whilst logging in.", error: error});
    }
}

//controller for get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({})
        res.status(201).json({
            message: "Found all users.",
            users:users
        })
    } catch (error) {
        res.status(501).json({errorMessage: "Error whilst getting all users.", error: error});
    }
};

//controller for updating a user
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.update(
            { 
                email: req.body.newEmail
            }, {
                where: {
                    username: req.body.username
                }
            }
        )
        res.status(201).json({message: `${req.body.username}'s email successfully updated to ${req.body.newEmail}.`, user: updatedUser});
    } catch (error) {
        res.status(501).json({errorMessage: "Error whilst updating user.", error: error});
        console.log(error); 
    }
}

//controller for deleting a user
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await Book.deleteOne({
            username: req.body.username
        });
        res.status(201).json({message: `${req.body.username} successfully deleted.`, user: deletedUser});
    } catch (error) {
        res.status(501).json({errorMessage: "Error whilse deleting user.", error: error});
        console.log(error); 
    }
};



module.exports = {
    registerUser,
    getUsers,
    login,
    updateUser,
    deleteUser,
}