const DescriptionModal = ({ bookDescription, modalId }) => {
  return (
    <div className="grow py-2">
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-neutral font-bold text-lg"
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
    </div>
  );
};
export default DescriptionModal;
