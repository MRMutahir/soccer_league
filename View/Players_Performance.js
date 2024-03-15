import express from "express";
import {
  createPlayerPerformance,
  deletePlayerPerformance,
  getAllPlayersPerformances,
  getSinglePlayerPerformance,
  updatePlayerPerformance,
} from "../Controller/Players_Performance.js";

const route_Players_Performance = express.Router();

// GET all
route_Players_Performance.get(
  "/Players_Performances",
  getAllPlayersPerformances
);

// GET single
route_Players_Performance.get(
  "/Players_Performance/:playersId",
  getSinglePlayerPerformance
);

// POST create
route_Players_Performance.post(
  "/Players_Performance/:playersId",
  createPlayerPerformance
);

// PUT update
route_Players_Performance.put(
  "/Players_Performance/:playersId",
  updatePlayerPerformance
);

// DELETE
route_Players_Performance.delete(
  "/Players_Performance/:playersId",
  deletePlayerPerformance
);

export default route_Players_Performance;
