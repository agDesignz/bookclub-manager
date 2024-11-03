import { useEffect, useState } from "react";
import getBooks from "../api/getBooks";

const BooksScreen = () => {
  const [books, setBooks] = useState([]);

  const fetchSavedBooks = async () => {
    const bookData = await getBooks();
    console.log("fetchSavedBooks:", bookData);
  };
  useEffect(() => {
    fetchSavedBooks();
  }, []);
  return (
    <div className="mx-auto h-full container">
      <div className="sm:columns-2 md:columns-3 xl:columns-4 gap-4 md:gap-8">
        <div className="bg-red-500">I'm a column</div>
        <div className="bg-red-500">I'm a column</div>
        <div className="bg-red-500">I'm a column</div>
      </div>
    </div>
  );
};
export default BooksScreen;
