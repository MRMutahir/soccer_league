import { Team } from "../Modal/Team.js";

const create_Detailed_Scorecard = async (req, res, next) => {
  try {
    const teamId = req.params.teamId;
    const team = await Team.findById(teamId);
    const body = req.body;

    const scoreCard = {
      opponent: `${team.name} VS ${body.opponent}`,
      goalKeeperSave: body.goalKeeperSave,
      highestScorer: body.highestScorer,
      mostAssists: body.mostAssists,
      bestDefense: body.mostAssists,
    };
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { $push: { detailedScorecard: scoreCard } },
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json({
      message: "Scorecard create successfully",
      team: updatedTeam,
    });
  } catch (error) {
    console.error("Error updating scorecard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const get_Detailed_Scorecards = async (req, res, next) => {
  try {
    const teamId = req.params.teamId;
    const DetailedScorecard_data = await Team.findById(teamId);
    if (!DetailedScorecard_data) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.status(200).json({
      message: "detailedScorecardSchema  data retrieved successfully",
      DetailedScorecard_data: DetailedScorecard_data.detailedScorecard,
    });
  } catch (error) {
    console.error("Error fetching upcoming matches:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const get_Single = async (req, res, next) => {
  try {
    const teamId = req.params.teamId;
    const scoreId = req.params.scoreId;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    const detailedScore = team.detailedScorecard.find(
      (score) => score._id.toString() === scoreId
    );

    if (!detailedScore) {
      return res.status(404).json({ error: "detailedScore not found" });
    }

    res.status(200).json({
      message: "detailedScore data retrieved successfully",
      detailedScore: detailedScore,
    });
  } catch (error) {
    console.error("Error fetching detailedScore:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const update_Single = async (req, res, next) => {
  try {
    const teamId = req.params.teamId;
    const scoreId = req.params.scoreId;
    const {
      opponent,
      goalKeeperSave,
      highestScorer,
      mostAssists,
      bestDefense,
    } = req.body;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    const scoreIndex = team.detailedScorecard.findIndex(
      (score) => score._id.toString() === scoreId
    );

    if (scoreIndex === -1) {
      return res.status(404).json({ error: "score  not found" });
    }

    team.detailedScorecard[scoreIndex].opponent = `${team.name} VS ${opponent}`;
    team.detailedScorecard[scoreIndex].goalKeeperSave = goalKeeperSave;
    team.detailedScorecard[scoreIndex].highestScorer = highestScorer;
    team.detailedScorecard[scoreIndex].mostAssists = mostAssists;
    team.detailedScorecard[scoreIndex].bestDefense = bestDefense;

    await team.save();

    res.status(200).json({
      message: "score data updated successfully",
      match: team.detailedScorecard[scoreIndex],
    });
  } catch (error) {
    console.error("Error updating match:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const delete_Single = async (req, res, next) => {
  try {
    const teamId = req.params.teamId;
    const scoreId = req.params.scoreId;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    const scoreIndex = team.detailedScorecard.findIndex(
      (score) => score._id.toString() === scoreId
    );

    if (scoreIndex === -1) {
      return res.status(404).json({ error: "Score not found" });
    }

    team.detailedScorecard.splice(scoreIndex, 1);

    await team.save();

    res.status(200).json({
      message: "Score card deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting score card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  create_Detailed_Scorecard,
  delete_Single,
  get_Detailed_Scorecards,
  get_Single,
  update_Single,
};
