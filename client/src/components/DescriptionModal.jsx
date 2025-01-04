const DescriptionModal = ({
  bookCover,
  bookTitle,
  bookDescription,
  modalId,
}) => {
  return (
    <div className="m-auto">
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="relative"
        onClick={() => document.getElementById(modalId).showModal()}
      >
        <img
          className="shadow-lg m-auto rounded-lg"
          src={`https://covers.openlibrary.org/b/id/${bookCover}-M.jpg`}
          alt={`Cover image of ${bookTitle}`}
        />
        <div className="absolute flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-blue-950 transition-opacity duration-200 opacity-0 hover:opacity-95">
          <p className="text-white">Read Description</p>
        </div>
        <p className="pt-2 italic sm:hidden text-slate-100">
          Click title for description
        </p>
      </button>
      <dialog id={modalId} className="modal">
        <div className="modal-box bg-indigo-100 text-blue-950">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <p className="py-4 text-lg">{bookDescription}</p>
        </div>
      </dialog>
    </div>
  );
};
export default DescriptionModal;
