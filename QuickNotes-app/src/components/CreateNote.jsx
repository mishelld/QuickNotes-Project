import { useState } from "react";
import "./CreateNote.css";
function CreateNote() {
  const [value, setValue] = useState("");

  return (
    <div className="create-note ">
      <textarea
        placeholder="Your note..."
        onChange={(e) => setValue(e.target.value)}
      />
      <button>Add</button>
    </div>
  );
}

export default CreateNote;
