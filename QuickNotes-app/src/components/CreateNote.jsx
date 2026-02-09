import { use, useEffect, useState } from "react";
import "./CreateNote.css";
import Notes from "./Notes";
import Modal from "./Modal";
function CreateNote() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const [filterednotes, setFilteredNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  {
    useEffect(() => {
      if (search === "") {
        setFilteredNotes(notes);
      } else {
        const new_notes = notes.filter(
          (n) =>
            n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.text.toLowerCase().includes(search.toLowerCase()),
        );
        setFilteredNotes(new_notes);
      }
    }, [search, notes]);
  }

  useEffect(() => {
    const localNotes = localStorage.getItem("notes");
    if (localNotes) {
      setNotes(JSON.parse(localNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

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
    setNotes([
      ...notes,
      { title: title, text: text, category: category, date: getDate() },
    ]);
    setText("");
    setTitle("");
  };
  const handleDelete = (index) => {
    if (confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter((note, i) => i !== index));
    }
  };
  const handleUpdate = (prevNote, CurrNote) => {
    setNotes(
      notes.map((n) =>
        n === prevNote
          ? {
              ...n,
              title: CurrNote.title,
              text: CurrNote.text,
              category: CurrNote.category,
              date: getDate(),
            }
          : n,
      ),
    );
    closeModal();
  };

  const openModal = (index) => {
    setIsOpen(true);
    setSelectedNote(notes.find((note, i) => i === index));
  };
  const closeModal = () => {
    setIsOpen(false);
    setSelectedNote({});
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <div className="notes-container">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="search notes..."
        ></input>
        <div className="create-note">
          <input
            className="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Your note..."
            onChange={(e) => setText(e.target.value)}
          />
          <select value={category} onChange={handleCategory}>
            <option value="">-- Select --</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
          </select>
          <button className="add-btn" onClick={handleAdd}>
            Add
          </button>
        </div>

        <Notes
          notes={filterednotes}
          onDelete={handleDelete}
          onNoteClick={openModal}
        />

        {isOpen ? (
          <Modal
            note={selectedNote}
            onClose={closeModal}
            onUpdate={handleUpdate}
          />
        ) : null}
      </div>
    </>
  );
}

export default CreateNote;
