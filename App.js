import React, { useState, useEffect } from "react";
import "./App.css"; // ✅ Ensure this is imported

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const API_URL = "https://8sj2t7.csb.app/api/notes"; // Update with your backend URL

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setNotes(data);
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!title || !body) {
      alert("Please enter both title and body!");
      return;
    }
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });
    setTitle("");
    setBody("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  return (
    <div className="container">
      <h1>Notes App</h1>
      <form onSubmit={addNote}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Add Note</button>
      </form>

      <h2>All Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <strong>{note.title}</strong>: {note.body}
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
