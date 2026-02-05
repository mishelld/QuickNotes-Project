import { useState } from "react";
import "./CreateNote.css";
import Notes from "./Notes";
function CreateNote() {
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState([]);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const getDate = () => {
    const month = monthNames[new Date().getMonth()];
    const day = new Date().getDate().toLocaleString();
    const hour = new Date().getHours().toLocaleString().padStart(2, "0");
    const minutes = new Date().getMinutes().toLocaleString().padStart(2, "0");
    return `${month} ${day}st ${hour}:${minutes}`;
  };
  const handleAdd = () => {
    setNotes([...notes, { text: value, date: getDate() }]);
    setValue("");
  };
  const handleDelete = (index) => {
    setNotes(notes.filter((note, i) => i != index));
  };

  return (
    <>
      <div className="notes-container">
        <div className="create-note">
          <textarea
            placeholder="Your note..."
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="add-btn" onClick={handleAdd}>
            Add
          </button>
        </div>

        <Notes notes={notes} onDelete={handleDelete} />
      </div>
    </>
  );
}

export default CreateNote;
