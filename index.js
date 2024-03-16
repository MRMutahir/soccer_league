import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import route from "./View/Team.js";
import route_Players_Performance from "./View/Players_Performance.js";
import Teams_Performance from "./View/Teams_Performance.js";
import Upcoming_Matches from "./View/Upcoming_Matches.js";
import cors from "cors";
import Detailed_Scorecard from "./View/Detailed_Scorecard.js";

let app = express();
let PORT = process.env.PORT || 3000;
app.use(cors());

dotenv.config();
const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
    });
};

app.use(express.json());
app.use("/api", route);
app.use("/api", route_Players_Performance);
app.use("/api", Teams_Performance);
app.use("/api", Upcoming_Matches);
app.use("/api", Detailed_Scorecard);

app.listen(PORT, () => {
  connect();
  console.log(" Server  Start", PORT);
});
