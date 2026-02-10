import "./Modal.css";
import NoteForm from "./NoteForm";
import "./categories.css";

import { use, useState } from "react";

function Modal({ note, onClose, onUpdate }) {
  const [text, setText] = useState(note.text || "");
  const [title, setTitle] = useState(note.title || "");
  const [category, setCategory] = useState(note.category || "");

  return (
    <div className="modal-overlay">
      <div className={`modal-note ${category}`}>
        <header>
          <div className="date">{note.date}</div>
          <button className="dlt-btn" onClick={onClose}>
            X
          </button>
        </header>
        <div className="modal-front">
          <NoteForm
            title={title}
            setTitle={setTitle}
            text={text}
            setText={setText}
            category={category}
            handleCategory={(e) => setCategory(e.target.value)}
            handleSubmit={() => onUpdate(note, { title, text, category })}
            submitLabel="Update"
          />
        </div>
      </div>
    </div>
  );
}
export default Modal;
