const updateUser = async (data) => {
  try {
    const query = await fetch(`/api/user/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    console.log(query);
    if (!query.ok) {
      const errorData = await query.json();
      throw new Error(errorData.error);
    }
    const response = await query.json();
    const result = { success: true, ...response };
    return result;
  } catch (error) {
    const errorData = await query.json();
    console.log("error during fetch:", errorData);
    throw error;
  }
};

export default updateUser;
