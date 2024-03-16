import express from "express";
const Teams_Performance = express.Router();

// Import your controller functions for handling team performance CRUD operations
import {
  createTeamPerformance,
  updateTeamPerformance,
  deleteTeamPerformance,
  getTeamPerformance,
} from "../Controller/Teams_Performance.js";

Teams_Performance.get("/TeamPerformance/:teamId", getTeamPerformance);

Teams_Performance.post("/TeamPerformance/:teamId", createTeamPerformance);

Teams_Performance.put("/TeamPerformance/:teamId", updateTeamPerformance);

Teams_Performance.delete("/TeamPerformance/:teamId", deleteTeamPerformance);

export default Teams_Performance;
