const express = require("express");
require("dotenv").config();
const dbConnection = require("./src/config/db");

const app = express()
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.status(200).json({
        statusCode: 200,
        message: "School management server is running...",
    })
})

app.listen(PORT, async () => {
 try {
       await dbConnection();
    console.log(`Server is running at http://localhost:${PORT}`);
 } catch (error) {
    console.log("Failed to start the server due to a DB connection error", error);
    process.exist(1)
 }
});
