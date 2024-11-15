import checkDate from "../utils/checkDate";
import updateObjectDate from "../utils/formatDate";

const getLatestMeet = async () => {
  try {
    const query = await fetch("api/meeting/latest");
    if (query.ok) {
      const response = await query.json();
      const dateCheck = checkDate(response.date);
      if (dateCheck != "valid") {
        return null;
      }
      const latestMeetData = updateObjectDate(response);
      return latestMeetData;
    }
  } catch (error) {
    return error;
  }
};

export default getLatestMeet;
