import { useState } from "react";

function Input() {
  const [value, setValue] = useState("");

  return (
    <div>
      <textarea onChange={(e) => setValue(e.target.value)} />
      <button>Add</button>
    </div>
  );
}

export default Input;
