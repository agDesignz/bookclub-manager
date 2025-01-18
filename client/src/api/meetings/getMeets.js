const getMeets = async () => {
  try {
    const query = await fetch("api/meeting");
    if (query.ok) {
      const meetData = await query.json();
      console.log("meetData:", meetData);
      return meetData;
    }
  } catch (error) {
    return error;
  }
};

export default getMeets;
