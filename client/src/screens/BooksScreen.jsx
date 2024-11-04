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
    <div className="mx-auto h-full container m-4">
      <div className="sm:columns-2 md:columns-3 xl:columns-4 gap-4 md:gap-8">
        {books.map((book, idx) => (
          <div className="card card-side bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                alt="Movie"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">New movie is released!</h2>
              <p>Click the button to watch on Jetflix app.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Watch</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BooksScreen;
