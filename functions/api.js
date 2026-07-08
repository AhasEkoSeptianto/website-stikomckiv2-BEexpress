import express from "express";
import serverlessHttp from "serverless-http";
// import { app } from "./../server";

// app.get("/.netlify/functions/api", (req, res) => {
//   return res.json({
//     message: "hello world",
//   });
// });

// const fileUpload = require("express-fileupload");
import fileUpload from "express-fileupload";
import cors from "cors";
// const cors = require("cors");
import bodyParser from "body-parser";
// const bodyParser = require("body-parser");
import jwt from "jsonwebtoken";
// const jwt = require("jsonwebtoken");

import dotenv from "dotenv";
dotenv.config();

// require("dotenv").config();

import "./../models/connect_monggoatlas.js";
// require("./models/connect_monggoatlas");
import "./../config/myMediaGDrive.js";
// require("./config/myMediaGDrive");

// midleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

app.use("/.netlify/functions/api", require("./routers/api/route"));

// module.exports = { app };
// // app.listen(port, () => console.log("running at port 8080"));

const handler = serverlessHttp(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
