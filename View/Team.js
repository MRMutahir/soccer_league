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

// GET single
route.get("/team/:teamId", getSingleTeam);

// POST create
route.post("/team", createTeam);

// PUT update
route.put("/team/:teamId", updateTeam);

// DELETE
route.delete("/team/:teamId", deleteTeam);

export default route;
