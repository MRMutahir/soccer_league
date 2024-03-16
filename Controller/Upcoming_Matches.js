import { Team } from "../Modal/Team.js";

const checkMatchExistence = async (teamId, matchDate) => {
  const team = await Team.findById(teamId);
  const matches = team.upcomingMatches.filter(
    (match) => match.date.toDateString() === matchDate.toDateString()
  );
  return matches.length > 0;
};

const create_Upcoming_Matches = async (req, res, next) => {
  try {
    const teamId = req.params.teamId;
    const team = await Team.findById(teamId);
    const body = req.body;
    const matchDate = new Date(body.date);

    const matchExists = await checkMatchExistence(teamId, matchDate);

    if (matchExists) {
      return res.status(400).json({
        error:
          "A match for this date already exists. Please select another date.",
      });
    }

    const MatcheFix = {
      opponent: `${team.name} VS ${body.opponent}`,
      date: matchDate,
      time: body.time,
      location: body.location,
    };
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { $push: { upcomingMatches: MatcheFix } },
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json({
      message: "Upcoming match added successfully",
      team: updatedTeam,
    });
  } catch (error) {
    console.error("Error updating upcoming match:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const get_Upcoming_Matches = async (req, res, next) => {
  try {
    const teamId = req.params.teamId;
    const Upcoming_Matches_data = await Team.findById(teamId);

    if (!Upcoming_Matches_data) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.status(200).json({
      message: "Upcoming matches data retrieved successfully",
      upcomingMatches: Upcoming_Matches_data.upcomingMatches,
    });
  } catch (error) {
    console.error("Error fetching upcoming matches:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const get_Single_Match = async (req, res, next) => {
  try {
    const teamId = req.params.teamId;
    const matchId = req.params.matchId;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    const match = team.upcomingMatches.find(
      (match) => match._id.toString() === matchId
    );

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    res.status(200).json({
      message: "Match data retrieved successfully",
      match: match,
    });
  } catch (error) {
    console.error("Error fetching match:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const update_Single_Match = async (req, res, next) => {
  try {
    const teamId = req.params.teamId;
    const matchId = req.params.matchId;
    const { opponent, date, time, location } = req.body;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    const matchIndex = team.upcomingMatches.findIndex(
      (match) => match._id.toString() === matchId
    );

    if (matchIndex === -1) {
      return res.status(404).json({ error: "Match not found" });
    }

    team.upcomingMatches[matchIndex].opponent = opponent;
    team.upcomingMatches[matchIndex].date = new Date(date);
    team.upcomingMatches[matchIndex].time = time;
    team.upcomingMatches[matchIndex].location = location;

    await team.save();

    res.status(200).json({
      message: "Match data updated successfully",
      match: team.upcomingMatches[matchIndex],
    });
  } catch (error) {
    console.error("Error updating match:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const delete_Single_Match = async (req, res, next) => {
  try {
    const teamId = req.params.teamId;
    const matchId = req.params.matchId;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    const matchIndex = team.upcomingMatches.findIndex(
      (match) => match._id.toString() === matchId
    );

    if (matchIndex === -1) {
      return res.status(404).json({ error: "Match not found" });
    }

    team.upcomingMatches.splice(matchIndex, 1);

    await team.save();

    res.status(200).json({
      message: "Match deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting match:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  create_Upcoming_Matches,
  get_Upcoming_Matches,
  get_Single_Match,
  update_Single_Match,
  delete_Single_Match,
};
