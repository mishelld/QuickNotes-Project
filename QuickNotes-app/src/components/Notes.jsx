import "./Notes.css";
import "./categories.css";

function Notes({ notes, onDelete, onNoteClick }) {
  return (
    <div className="notes">
      {notes.map((note, index) => (
        <div
          key={index}
          className={`note ${note.category}`}
          onClick={() => onNoteClick(note)}
        >
          <header>
            <div className="date">
              <p>Created: {note.createdDate}</p>
              {note.updatedDate && <p>Updated: {note.updatedDate}</p>}
            </div>
            <button
              className="dlt-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note);
              }}
            >
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
