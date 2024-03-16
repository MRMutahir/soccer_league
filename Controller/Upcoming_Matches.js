import { Team } from "../Modal/Team.js";

const get_Upcoming_Matches = async (req, res, next) => {
  try {
    const teamId = req.params.teamId;
    const team = await Team.findById(teamId);
    const upComingMatchesPreData = team.upcomingMatches;
    const { date, time } = upComingMatchesPreData;
    // console.log(
    //   upComingMatchesPreData,
    //   ">>>>>>>>>>>>>>>>>upComingMatchesPreData"
    // );
    const body = req.body;
    const MatcheFix = {
      opponent: `${team.name} VS ${body.team}`,
      date: new Date(body.date),
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
