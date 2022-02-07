const express = require("express");
const app = express();
const server = require("http").Server(app);
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
require("dotenv").config({ path: "./config.env" });
const connectDb = require("./utilsServer/connectDb");
connectDb();
app.use(express.json());
const PORT = process.env.PORT || 3000;

nextApp.prepare()
.then(() => {
    app.use("/api/user", require("./api/user"));
    app.use("/api/housing", require("./api/housing"));
    app.use("/api/event", require("./api/event"));
    app.use("/api/restaurant", require("./api/restaurant"));
    app.use("/api/auth", require("./api/auth"));
    app.use("/api/signup", require("./api/signup"));
    app.use("/api/trip", require("./api/trip"));
    app.all("*", (req, res) => handle(req, res));

    server.listen(PORT, err => {
        if (err) throw err;
        console.log(`Express server running on PORT ${PORT}`);
    })
})