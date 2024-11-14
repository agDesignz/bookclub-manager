import updateObjectDate from "../utils/formatDate";

const getLatestMeet = async () => {
  try {
    const query = await fetch("api/meeting/latest");
    if (query.ok) {
      const response = await query.json();
      const latestMeetData = updateObjectDate(response);
      return latestMeetData;
    }
  } catch (error) {
    return error;
  }
};

export default getLatestMeet;
