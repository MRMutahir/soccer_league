import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import route from "./View/Team.js";
import route_Players_Performance from "./View/Players_Performance.js";
import Teams_Performance from "./View/Teams_Performance.js";
import Upcoming_Matches from "./View/Upcoming_Matches.js";

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
app.use("/api", route_Players_Performance);
app.use("/api", Teams_Performance);
app.use("/api", Upcoming_Matches);

app.listen(port, () => {
  connect();
  console.log(" Server  Start", port);
});
