const deleteBook = async (id) => {
  try {
    const query = await fetch(`/api/book/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (query.ok) {
      const payload = await query.json();
    }
  } catch (error) {
    console.log("error deleting:", error);
    throw error;
  }
};

export default deleteBook;
