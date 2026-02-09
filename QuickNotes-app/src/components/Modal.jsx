import "./Modal.css";
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
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
        </select>
        <button
          onClick={() =>
            onUpdate(note, {
              title: title,
              text: text,
              category: category,
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
