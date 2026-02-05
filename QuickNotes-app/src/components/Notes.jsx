import "./Notes.css";
function Notes({ notes }) {
  console.log(notes);

  return (
    <div className="notes">
      {notes.map((note, index) => (
        <div key={index} className="note">
          <div className="date">{note.date}</div>
          <div className="text">{note.text}</div>
        </div>
      ))}
    </div>
  );
}

export default Notes;
