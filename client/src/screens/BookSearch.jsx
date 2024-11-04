import { useState, useEffect } from "react";
import scrollToTop from "../utils/ScrollTop";
import fetchBookData from "../api/fetchBookData";
import SearchResults from "../components/SearchResults";

const BookSearch = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const searchData = await fetchBookData(title, author, 1);
    console.log("searchData:", searchData);
    setSearchResults(searchData);
    setLoading(false);
  };

  const handlePageChange = async (newPage) => {
    setLoading(true);
    const searchData = await fetchBookData(title, author, newPage);
    setSearchResults(searchData);
    setPage(newPage);
    console.log("newPage:", newPage);
    setLoading(false);
  };

  const clearInput = () => {
    setLoading(true);
    setTitle("");
    setAuthor("");
    setSearchResults({});
    setPage(1);
    setLoading(false);
  };

  // const getBook = (idx, bookTitle, bookAuthor, bookCover) =>
  //   console.log(`Got book ${idx}, ${bookTitle}, by ${bookAuthor}`);

  useEffect(() => {
    scrollToTop();
  }, [page]);

  return (
    <div className="flex py-12 justify-center grow h-full">
      <div className="container px-6 md:px-12 xl:px-40">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="flex flex-col gap-8 basis-full">
            <form className="flex flex-col gap-4 text-gray-800">
              <input
                type="text"
                placeholder="Search by Title"
                name="titleInput"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block text-xl px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-500 text-gray-700 focus:ring focus:outline-none w-full"
              />
              <input
                type="text"
                placeholder="Search by Author"
                name="authorInput"
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
          <div className="flex flex-col gap-8 basis-full pb-16">
            {loading ? (
              <span className="loading loading-bars loading-md m-auto"></span>
            ) : searchResults.books ? (
              <SearchResults
                searchResults={searchResults}
                // getBook={getBook}
                handlePageChange={handlePageChange}
                page={page}
              />
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
