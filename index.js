import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import route from "./View/Team.js";

let app = express();
let port = 3000;

dotenv.config();
const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connect to DB");
    })
    .catch((error) => {
      throw error;
    });
};

app.use(express.json());
app.use("/api", route);

app.listen(port, () => {
  connect();
  console.log(" Server  Start", port);
});
