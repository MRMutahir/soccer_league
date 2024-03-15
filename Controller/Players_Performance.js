import { Team } from "../Modal/Team.js";

const getAllPlayersPerformances = async (req, res, next) => {
  try {
    const teams = await Team.find();
    res.status(200).json({ teams: teams });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSinglePlayerPerformance = async (req, res, next) => {
  const playerId = req.params.playersId;
  try {
    const team = await Team.findOne({ "playersInformation._id": playerId });
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const player = team.playersInformation.find(
      (player) => player._id.toString() === playerId
    );

    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.json(player);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get player performance" });
  }
};

const createPlayerPerformance = async (req, res, next) => {
  const teamId = req.params.playersId;
  const playerInfo = req.body;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { $addToSet: { playersInformation: playerInfo } },
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

const updatePlayerPerformance = async (req, res, next) => {
  const playerId = req.params.playersId;
  const body = req.body;

  try {
    const team = await Team.findOne({ "playersInformation._id": playerId });

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const player = team.playersInformation.find((ele) => ele._id == playerId);

    Object.assign(player, body);

    await team.save();

    res.json(player);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update player performance" });
  }
};

const deletePlayerPerformance = async (req, res, next) => {
  const playerId = req.params.playersId;
  try {
    const team = await Team.findOne({ "playersInformation._id": playerId });

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const playerIndex = team.playersInformation.findIndex(
      (ele) => ele._id == playerId
    );

    if (playerIndex === -1) {
      return res.status(404).json({ error: "Player not found" });
    }

    team.playersInformation.splice(playerIndex, 1);

    await team.save();

    res.json({ message: "Player performance deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete player performance" });
  }
};

export {
  createPlayerPerformance,
  deletePlayerPerformance,
  getAllPlayersPerformances,
  getSinglePlayerPerformance,
  updatePlayerPerformance,
};
