import updateObjectDate from "../../utils/formatDate";

const getMeets = async () => {
  try {
    const query = await fetch("api/meeting");
    if (query.ok) {
      const meetData = await query.json();
      meetData.map((meet) => {
        updateObjectDate(meet);
      });
      return meetData;
    }
  } catch (error) {
    return error;
  }
};

export default getMeets;
