const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

require("dotenv").config();
require("../models/connect_monggoatlas");
require("../config/myMediaGDrive");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

app.use("/.netlify/functions/api", require("../routers/api/route"));

exports.handler = serverless(app);
