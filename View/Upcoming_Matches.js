import express from "express";
import { get_Upcoming_Matches } from "../Controller/Upcoming_Matches.js";

const Upcoming_Matches = express.Router();

Upcoming_Matches.get("/UpcomingMatches/:teamId", get_Upcoming_Matches);

export default Upcoming_Matches;
