const DescriptionModal = ({ bookDescription, modalId }) => {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="text-left font-bold text-lg link link-hover self-start"
        onClick={() => document.getElementById(modalId).showModal()}
      >
        Read Description
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
    </>
  );
};
export default DescriptionModal;
