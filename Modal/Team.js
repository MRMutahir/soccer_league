import mongoose from "mongoose";
// Define the Player's Performance schema
const playerPerformanceSchema = new mongoose.Schema({
  name: String,
  appearances: Number,
  goals: Number,
  assists: Number,
  crossAccuracy: Number,
  keyPasses: Number,
  tackles: Number,
  image: String,
});

// Define the Team's Performance schema
const teamPerformanceSchema = new mongoose.Schema({
  totalGoals: Number,
  shotsPG: Number,
  discipline: Number,
  possession: Number,
  pass: Number,
  aerialsWon: Number,
  rating: Number,
});

// Define the Detailed Scorecard schema
const detailedScorecardSchema = new mongoose.Schema({
  goalKeeperSave: Number,
  highestScorer: String,
  mostAssists: String,
  bestDefense: String,
});

// Define the Upcoming Match schema
const upcomingMatchSchema = new mongoose.Schema({
  opponent: String,
  date: Date,
  time: String,
  location: String,
});

// Define the Team schema
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  playersInformation: [playerPerformanceSchema],
  teamPerformance: [teamPerformanceSchema],
  upcomingMatches: [upcomingMatchSchema],
});

// Create the Team model
const Team = mongoose.model("Team", teamSchema);
export { Team };
