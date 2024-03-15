import { Team } from "../Modal/Team.js";
// import { updateTeam } from "./Team.js";

const createTeamPerformance = async (req, res, next) => {
  const teamId = req.params.teamId;
  const body = req.body;
  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { $addToSet: { teamPerformance: body } },
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.status(200).json({ message: "Player information added" });
  } catch (error) {
    console.error("Error creating player performance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTeamPerformance = async (req, res, next) => {
  const teamId = req.params.teamId;
  const body = req.body;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { $set: { teamPerformance: body } },
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.json(updatedTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update team performance" });
  }
};
const deleteTeamPerformance = async (req, res, next) => {
  const teamId = req.params.teamId;
  const performanceId = req.params.performanceId;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { $pull: { teamPerformance: { _id: performanceId } } },
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }

    res
      .status(200)
      .json({ message: "Team performance deleted", team: updatedTeam });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getTeamPerformance = async (req, res, next) => {
  const teamPerformance = await Team.findOne();
  res.send(teamPerformance)
};

export {
  createTeamPerformance,
  updateTeamPerformance,
  deleteTeamPerformance,
  getTeamPerformance,
};
