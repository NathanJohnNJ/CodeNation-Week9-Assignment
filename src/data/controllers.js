//Import dependancies
const Data = require("./model")
const User = require("../users/model")

//Controller for register user
const addData = async (req, res) => {
    try {
        const newData = await Data.create({
            username: req.body.username,
            data: req.body.data,
            supportingImages: req.body.supportingImages
        })
        res.status(201).json({
            message: `Data succesfully added.`,
            data: newData
        })
    } catch (error) {
        res.status(501).json({errorMessage: "Error whilst adding data.", error: error});
    }
};

//controller for get all data
const getAllData = async (req, res) => {
    try {
        const data = await Data.findAll({})
        res.status(201).json({
            message: "Found all data.",
            data: data
        })
    } catch (error) {
        res.status(501).json({errorMessage: "Error whilst getting all data.", error: error});
    }
};

//controller for getting all data owned by a chosen user
const getDataByUser = async (req, res) => {
    try {
        const data = await Data.findAll({
            where: {username: req.body.username},
            include: User
        })
        res.status(201).json({
            message: `Found all data by ${req.body.username}.`,
            data: data
        })
    } catch (error) {
        res.status(501).json({errorMessage: `Error whilst getting all data by ${req.body.username}.`, error: error});
    }
};

module.exports = {
    addData,
    getAllData,
    getDataByUser
}