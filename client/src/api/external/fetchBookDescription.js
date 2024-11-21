const fetchBookDescription = async (bookKey) => {
  try {
    const response = await fetch(`https://openlibrary.org${bookKey}.json`);

    if (!response.ok) {
      throw new Error("Failed to fetch book details");
    }

    const bookDetails = await response.json();
    if (!bookDetails.description) return "No description available";
    const rawDescription = typeof bookDetails.description === 'string'
      ? bookDetails.description
      : bookDetails.description?.value || 'No description available';
    let bookDescription = rawDescription.replace(/\r\n/g, "\n");
    bookDescription = bookDescription.replace(/\[.*?\]\(.*?\)/g, '') // Remove links
      .replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold
    return bookDescription
  } catch (error) {
    console.error("Error fetching book details:", error);
    return "Error retrieving description.";
  }
}

export default fetchBookDescription;