import express from "express";
import {
  create_Detailed_Scorecard,
  get_Detailed_Scorecards,
  get_Single,
  update_Single,
  delete_Single,
} from "../Controller/Detailed_Scorecard.js";

const Detailed_Scorecard = express.Router();

Detailed_Scorecard.post(
  "/DetailedScorecard/:teamId",
  create_Detailed_Scorecard
);
Detailed_Scorecard.get("/DetailedScorecard/:teamId", get_Detailed_Scorecards);
Detailed_Scorecard.get("/DetailedScorecard/:teamId/score/:scoreId", get_Single);

Detailed_Scorecard.put(
  "/DetailedScorecard/:teamId/score/:scoreId",
  update_Single
);

Detailed_Scorecard.delete(
  "/DetailedScorecard/:teamId/score/:scoreId",
  delete_Single
);

export default Detailed_Scorecard;
