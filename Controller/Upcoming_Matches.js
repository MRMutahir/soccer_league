import { Team } from "../Modal/Team.js";

const checkMatchExistence = async (teamId, matchDate) => {
  const team = await Team.findById(teamId);
  const matches = team.upcomingMatches.filter(
    (match) => match.date.toDateString() === matchDate.toDateString()
  );
  return matches.length > 0;
};

const get_Upcoming_Matches = async (req, res, next) => {
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
      opponent: `${team.name} VS ${body.team}`,
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

export { get_Upcoming_Matches };
