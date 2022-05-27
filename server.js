const http = require('http');
const express = require("express");
const RED = require("node-red");
// const res = require("express/lib/response");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ limit: "16mb", extended: true, parameterLimit: 50000 }));

// app.use("/", (req, res) => {
//     console.log("Home page")
//     res.status(200).json({
//         message: "Home Page API"
//     })
// })

app.use("/testing", (req, res) => {
    console.log("Testing")
    res.status(200).json({
        message: "Testing Page API"
    })
})

const server = http.createServer(app);

const settings = {
    httpAdminRoot:"/red",
    httpNodeRoot: "/api",
    userDir:"/home/nol/.nodered/",
    functionGlobalContext: { }    // enables global context
};

RED.init(server,settings);

app.use(settings.httpAdminRoot,RED.httpAdmin);

app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(3000, () => {
    console.log("Listening on port 3000 !!")
})

RED.start();