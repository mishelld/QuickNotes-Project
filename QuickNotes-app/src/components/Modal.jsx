import "./Modal.css";
import { use, useState } from "react";

function Modal({ note, onClose, onUpdate }) {
  const [text, setText] = useState(note.text || "");
  const [title, setTitle] = useState(note.title || "");

  return (
    <div className="modal-overlay">
      <div className="modal-note">
        <header>
          <div className="date">{note.date}</div>
          <button className="dlt-btn" onClick={onClose}>
            X
          </button>
        </header>
        <input
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={text}
          placeholder="Your note..."
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          onClick={() =>
            onUpdate(note, {
              title: title,
              text: text,
            })
          }
        >
          Update
        </button>
      </div>
    </div>
  );
}
export default Modal;
