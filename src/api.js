const express = require("express");
const fileUpload = require("express-fileupload");
const port = 8080;
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const serverless = require("serverless-http");

require("dotenv").config();
require("./../models/connect_monggoatlas");

// midleware
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(fileUpload());

app.use("/api", require("./../routers/api/route"));



module.exports = app;
module.exports.handler = serverless(app);