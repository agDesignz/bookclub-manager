const getUsers = async () => {
  try {
    const query = await fetch("/api/user", {
      method: "GET",
      credentials: "include",
    });
    if (query.ok) {
      const payload = await query.json();
      return payload;
    }
  } catch (error) {
    return error;
  }
};

export default getUsers;
