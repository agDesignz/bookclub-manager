const castVote = async (user, book) => {
  try {
    const query = await fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify({ user, book }),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    if (!query.ok) {
      const errorData = await query.json();
      throw new Error(errorData.error);
    }
    const result = await query.json();
    return result;
  } catch (error) {
    console.log("castVote error:", error);
    throw error;
  }
};

export default castVote;
