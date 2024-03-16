import express from "express";
import {
  create_Upcoming_Matches,
  get_Upcoming_Matches,
  get_Single_Match,
  update_Single_Match,
  delete_Single_Match,
} from "../Controller/Upcoming_Matches.js";

const Upcoming_Matches = express.Router();

Upcoming_Matches.post("/UpcomingMatches/:teamId", create_Upcoming_Matches);
Upcoming_Matches.get("/UpcomingMatches/:teamId", get_Upcoming_Matches);
Upcoming_Matches.get(
  "/UpcomingMatches/:teamId/matches/:matchId",
  get_Single_Match
);

Upcoming_Matches.put(
  "/UpcomingMatches/:teamId/matches/:matchId",
  update_Single_Match
);

Upcoming_Matches.delete(
  "/UpcomingMatches/:teamId/matches/:matchId",
  delete_Single_Match
);

export default Upcoming_Matches;
