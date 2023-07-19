//Import dependancies
const { Router } = require("express");
const { registerUser, login, getUsers, updateUser, deleteUser } = require("./controllers");
const { hashPass, checkPass, checkToken } = require("../middleware")

//Create the userRouter variable
const userRouter = Router();

// Define routes for CRUD
userRouter.post("/users/register", hashPass, registerUser);
userRouter.post("/users/login", checkPass, login);
userRouter.get("/users/getAllUsers", checkToken, getUsers);
userRouter.put("/users/updateUser", checkToken, updateUser);
userRouter.delete("/users/deleteUser", checkToken, deleteUser)

module.exports = userRouter;

