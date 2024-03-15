// routes/teamRoutes.js

import express from "express";
import {
  createTeam,
  getAllTeams,
  getSingleTeam,
  updateTeam,
  deleteTeam,
} from "../Controller/Team.js";

const route = express.Router();

// GET all teams
route.get("/teams", getAllTeams);

// GET single team data
route.get("/team/:teamId", getSingleTeam);

// POST create a single team
route.post("/team", createTeam);

// PUT update a single team data
route.put("/team/:teamId", updateTeam);

// DELETE a single team data
route.delete("/team/:teamId", deleteTeam);

export default route;
