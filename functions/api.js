import express from "express";
import serverlessHttp from "serverless-http";
import { app } from "./../server";

app.get("/.netlify/functions/api", (req, res) => {
  return res.json({
    message: "hello world",
  });
});

const handler = serverlessHttp(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
