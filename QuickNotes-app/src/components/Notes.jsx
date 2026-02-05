import "./Notes.css";
function Notes({ notes }) {
  return (
    <div className="notes">
      {notes.map((note) => (
        <div className="note">{note}</div>
      ))}
    </div>
  );
}

export default Notes;
