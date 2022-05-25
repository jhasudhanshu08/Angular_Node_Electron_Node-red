const express = require("express");
const res = require("express/lib/response");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ limit: "16mb", extended: true, parameterLimit: 50000 }));

app.get("/", (req, res) => {
    console.log("Home page")
    res.status(200).json({
        message: "Home Page API"
    })
})

app.get("/testing", (req, res) => {
    console.log("Testing")
    res.status(200).json({
        message: "Testing Page API"
    })
})

app.listen(3000, () => {
    console.log("Listening on port 3000 !!")
})