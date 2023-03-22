require("dotenv/config");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// CORS
app.use(cors());

// routes
const v1Routes = require("./routes/v1");
app.use("/api/v1", v1Routes);

// error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

const MONGODB_URL = process.env.MONGODB_URL;
const port = process.env.PORT || 5000;

mongoose
  .connect(MONGODB_URL)
  .then((res) => {
    console.log("Listen on port ", port);
    app.listen(port);
  })
  .catch((err) => console.log(err));
