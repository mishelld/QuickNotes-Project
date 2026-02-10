import { use, useEffect, useState } from "react";
import "./CreateNote.css";
import Notes from "./Notes";
import Modal from "./Modal";
import CategoryButtons from "./CategoryButtons";
import NoteForm from "./NoteForm";

function CreateNote() {
  const localNotes = localStorage.getItem("notes");

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState(localNotes ? JSON.parse(localNotes) : []);
  const [filterednotes, setFilteredNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const new_notes = notes.filter(
      (n) =>
        (!selectedCategory || n.category === selectedCategory) &&
        (n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.text.toLowerCase().includes(search.toLowerCase())),
    );
    setFilteredNotes(new_notes);
  }, [search, notes, selectedCategory]);

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
        <div className="note-wrapper">
          <header>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="search notes..."
            ></input>
            <CategoryButtons
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </header>

          <NoteForm
            title={title}
            setTitle={setTitle}
            text={text}
            setText={setText}
            category={category}
            handleCategory={handleCategory}
            handleSubmit={handleAdd}
            submitLabel="Add"
          />
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
