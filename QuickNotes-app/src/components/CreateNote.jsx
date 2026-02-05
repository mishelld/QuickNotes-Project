import { useState } from "react";
import "./CreateNote.css";
import Notes from "./Notes";
function CreateNote() {
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState([]);
  const handleAdd = () => {
    setNotes([...notes, value]);
    setValue("");
  };

  return (
    <>
      <div className="create-note">
        <textarea
          placeholder="Your note..."
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <Notes notes={notes} />
    </>
  );
}

export default CreateNote;
