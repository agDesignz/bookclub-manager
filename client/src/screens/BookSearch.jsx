import { useState } from "react";

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const titleApi = "https://openlibrary.org/search.json?title=";
  const authorApi = "https://openlibrary.org/search.json?author=";

  const fetchData = async (api) => {
    try {
      const query = await fetch(`${api}${searchTerm}`, {
        method: "GET",
      });
      if (query.ok) {
        const payload = await query.json();
        setSearchResults(payload.docs);
        console.log(payload.docs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBook = async (id) => console.log(`Fetch data for book ${id}`);

  const titleSearch = async (e) => {
    e.preventDefault();
    fetchData(titleApi);
  };

  const authorSearch = async (e) => {
    e.preventDefault();
    fetchData(authorApi);
  };

  return (
    <div className="flex py-12 justify-center grow h-full">
      <div className="container px-6 md:px-12 xl:px-40">
        <div className="flex gap-16">
          <div className="flex flex-col gap-8 basis-full">
            <form className="mb-10 flex flex-col gap-4 text-gray-800">
              <input
                type="text"
                placeholder="Search for Title or Author"
                name="searchInput"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block text-xl px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-500 text-gray-700 focus:ring focus:outline-none w-full"
              />
              <div className="flex gap-4">
                <button className="btn btn-outline grow" onClick={titleSearch}>
                  Search by Title
                </button>
                <button className="btn btn-outline grow" onClick={authorSearch}>
                  Search by Author
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-8 basis-full">
            {searchResults.length > 1 ? (
              searchResults.map((book, idx) => (
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

                  <h3>{idx}</h3>
                </button>
              ))
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
