//Import dependancies
const { Router } = require("express");
const { addData, getAllData, getDataByUser } = require("./controllers");
const { checkToken } = require("../middleware")

//Create the userRouter variable
const dataRouter = Router();

// Define routes
dataRouter.post("/data/addData", checkToken, addData);
dataRouter.get("/data/getAllData", checkToken, getAllData);
dataRouter.get("/data/getDataByUser", checkToken, getDataByUser);

module.exports = dataRouter;

