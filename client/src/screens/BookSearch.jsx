import { useState, useEffect } from "react";
import scrollToTop from "../utils/ScrollTop";
import fetchBookData from "../api/fetchBookData";

const BookSearch = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const searchData = await fetchBookData(title, author, 1);
    setSearchResults(searchData);
    setLoading(false);
  };

  const handlePageChange = async (newPage) => {
    setLoading(true);
    const searchData = await fetchBookData(title, author, newPage);
    setSearchResults(searchData);
    setPage(newPage);
    setLoading(false);
  };

  const clearInput = () => {
    setLoading(true);
    setTitle("");
    setAuthor("");
    setSearchResults([]);
    setPage(1);
    setLoading(false);
  };

  useEffect(() => {
    scrollToTop();
  }, [page]);

  return (
    <div className="flex py-12 justify-center grow h-full">
      <div className="container px-6 md:px-12 xl:px-40">
        <div className="flex gap-16">
          <div className="flex flex-col gap-8 basis-full">
            <form className="mb-10 flex flex-col gap-4 text-gray-800">
              <input
                type="text"
                placeholder="Search by Title"
                name="searchInput"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block text-xl px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-500 text-gray-700 focus:ring focus:outline-none w-full"
              />
              <input
                type="text"
                placeholder="Search by Author"
                name="searchInput"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="block text-xl px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-500 text-gray-700 focus:ring focus:outline-none w-full"
              />
              <div className="flex justify-between gap-4">
                <button className="btn btn-outline" onClick={handleSearch}>
                  Search
                </button>
                {(title || author) && (
                  <button
                    className="btn btn-outline btn-error"
                    onClick={clearInput}
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-8 basis-full">
            {loading ? (
              <span className="loading loading-bars loading-md m-auto"></span>
            ) : searchResults.length > 1 ? (
              <>
                {searchResults.map((book, idx) => (
                  <button
                    className="btn-outline px-5 py-2 border rounded-lg"
                    key={idx}
                    onClick={() => getBook(idx)}
                  >
                    <h2 className="text-xl">{book.title}</h2>
                    {book.author_name &&
                      book.author_name.map((auth, i) => (
                        <h3 className="text-l" key={i}>
                          {auth}
                        </h3>
                      ))}
                  </button>
                ))}
                <div className="flex justify-between mt-4">
                  <button
                    className="btn btn-outline"
                    disabled={page === 1} // Disable "Previous" button on the first page
                    onClick={() => handlePageChange(page - 1)}
                  >
                    Previous 10
                  </button>

                  <button
                    className="btn btn-outline"
                    onClick={() => handlePageChange(page + 1)}
                  >
                    Next 10
                  </button>
                </div>
              </>
            ) : (
              <h2 className="text-3xl">Find your next read...</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookSearch;
