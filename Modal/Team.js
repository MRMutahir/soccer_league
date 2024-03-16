import mongoose from "mongoose";

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

const teamPerformanceSchema = new mongoose.Schema({
  totalGoals: Number,
  shotsPG: Number,
  discipline: Number,
  possession: Number,
  pass: Number,
  aerialsWon: Number,
  rating: Number,
});

const detailedScorecardSchema = new mongoose.Schema({
  opponent: String,
  goalKeeperSave: Number,
  highestScorer: String,
  mostAssists: String,
  bestDefense: String,
});

const upcomingMatchSchema = new mongoose.Schema({
  opponent: String,
  date: {
    type: Date,
    unique: true,
  },
  time: {
    unique: true,
    type: String,
  },
  location: String,
});

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  playersInformation: [playerPerformanceSchema],
  teamPerformance: [teamPerformanceSchema],
  upcomingMatches: [upcomingMatchSchema],
  detailedScorecard: [detailedScorecardSchema],
});

const Team = mongoose.model("Team", teamSchema);
export { Team };
