import { Team } from "../Modal/Team.js";


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
  try {
    const teamId = req.params.teamId;

    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { $set: { teamPerformance: [] } },
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json(updatedTeam);
  } catch (error) {
    console.error("Error deleting team performance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTeamPerformance = async (req, res, next) => {
  try {
    const teamId = req.params.teamId;

    // Find the team by ID
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.json({
      message: "Team performance data retrieved successfully",
      performanceData: team.teamPerformance,
    });
  } catch (error) {
    console.error("Error fetching team performance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  createTeamPerformance,
  updateTeamPerformance,
  deleteTeamPerformance,
  getTeamPerformance,
};
