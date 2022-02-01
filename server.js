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
    app.all("*", (req, res) => handle(req, res));

    server.listen(PORT, err => {
        if (err) throw err;
        console.log(`Express server running on PORT ${PORT}`);
    })
})