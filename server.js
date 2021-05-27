const express = require("express");
const fileUpload = require("express-fileupload");
const port = process.env.PORT || 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
require("./models/connect_monggoatlas");

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

app.use("/api", require("./routers/api/route"));

app.listen(port, () => console.log("running at port 3001"));
