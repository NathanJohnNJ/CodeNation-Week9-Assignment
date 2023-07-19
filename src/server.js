require("dotenv").config();

const express = require("express");

const port = process.env.PORT ||  5002;

const app = express();

const userRouter = require("./users/routes");
const User = require("./users/model");

const syncTables = () => {
    User.sync()
}

app.use(express.json());
app.use(userRouter);
app.get("/health", (req, res) => {
    res.status(200).json({message:"API is working"})
})

app.listen(port, () => {
    syncTables();
    console.log(`Server is listening on port ${port}`);
})