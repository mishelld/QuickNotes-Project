import { use, useEffect, useState } from "react";
import "./CreateNote.css";
import Notes from "./Notes";
import Modal from "./Modal";
import CategoryButtons from "./CategoryButtons";
import NoteForm from "./NoteForm";
import SearchBar from "./SearchBar";
import { getDate } from "../utils/dateUtils";

function CreateNote() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState(() => {
    const localNotes = localStorage.getItem("notes");
    return localNotes ? JSON.parse(localNotes) : [];
  });
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
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAdd = () => {
    setNotes([
      ...notes,
      { title: title, text: text, category: category, date: getDate() },
    ]);
    setText("");
    setTitle("");
  };
  const handleDelete = (note) => {
    if (confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter((n) => n !== note));
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

  const openModal = (note) => {
    setIsOpen(true);
    setSelectedNote(notes.find((n) => n === note));
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
            <SearchBar search={search} setSearch={setSearch} />

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
