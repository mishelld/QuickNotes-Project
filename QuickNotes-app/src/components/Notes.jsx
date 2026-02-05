import "./Notes.css";
function Notes({ notes, onDelete }) {
  return (
    <div className="notes">
      {notes.map((note, index) => (
        <div key={index} className="note">
          <header>
            <div className="date">{note.date}</div>
            <button className="dlt-btn" onClick={() => onDelete(index)}>
              X
            </button>
          </header>
          <div className="title">{note.title}</div>
          <div className="text">{note.text}</div>
        </div>
      ))}
    </div>
  );
}

export default Notes;
