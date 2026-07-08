import express from "express";
import serverlessHttp from "serverless-http";

import { createRequire } from "module";

import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import "./../models/connect_monggoatlas.js";
import "./../config/myMediaGDrive.js";

dotenv.config();
const require = createRequire(import.meta.url);

const router = require("../routers/api/route");

const app = express();

app.get("/.netlify/functions/api", (req, res) => {
  return res.json({
    message: "hello world",
  });
});

// Middleware
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.static("public"));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

// Mount router
app.use("/.netlify/functions/api", router);

const handler = serverlessHttp(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
