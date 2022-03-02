import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import customerRoute from "./Routes/customer.js";
import riderRoute from "./Routes/riders.js";
import businessRoute from "./Routes/business.js";

import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

const CONNECTION_URL = "mongodb://127.0.0.1:27017/yoon";
const PORT = process.env.PORT || 5000;
app.use(cors());

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

app.use("/", customerRoute);
app.use("/", businessRoute);
app.use("/", riderRoute);
