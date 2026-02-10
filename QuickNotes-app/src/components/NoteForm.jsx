import "./NoteForm.css";
import TextareaAutosize from "react-textarea-autosize";

function NoteForm({
  title,
  setTitle,
  text,
  setText,
  category,
  handleCategory,
  handleSubmit,
  submitLabel,
}) {
  return (
    <>
      <div className="create-note">
        <input
          value={title}
          className="title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextareaAutosize
          value={text}
          placeholder="Your note..."
          onChange={(e) => setText(e.target.value)}
          minRows={10}
        />
        <select value={category} onChange={handleCategory}>
          <option value="">Select Category</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
        </select>
        <button className="submit-btn" onClick={handleSubmit}>
          {submitLabel}
        </button>
      </div>
    </>
  );
}
export default NoteForm;
