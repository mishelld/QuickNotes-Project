import "./Modal.css";
function Modal({ note, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-note">
        <header>
          <div className="date">{note.date}</div>
          <button className="dlt-btn" onClick={onClose}>
            X
          </button>
        </header>
        <div className="title">{note.title}</div>
        <div className="text">{note.text}</div>
      </div>
    </div>
  );
}
export default Modal;
