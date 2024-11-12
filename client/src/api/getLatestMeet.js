const getLatestMeet = async () => {
  try {
    const query = await fetch("api/meeting/latest");
    if (query.ok) {
      const latestMeetData = await query.json();
      return latestMeetData;
    }
  } catch (error) {
    return error;
  }
};

export default getLatestMeet;
