import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  async function fetchSampleNote() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      const data = await response.json();

      setNotes((prev) => [...prev, { title: data.title, details: data.body }]);
    } catch (e) {
      console.log("Fetch Error:", e);
    }
  }

  async function axiosSampleNote() {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts/2");
      setNotes((prev) => [...prev, { title: res.data.title, details: res.data.body }]);
    } catch (e) {
      console.log("Axios Error:", e);
    }
  }

  function handleAdd() {
    if (title.trim() === "" || details.trim() === "") return;

    const newNotes = { title, details };

    if (editIndex !== null) {
      const updated = [...notes];
      updated[editIndex] = newNotes;
      setNotes(updated);
      setEditIndex(null);
    } else {
      setNotes([...notes, newNotes]);
    }

    setTitle("");
    setDetails("");
  }

  function handleEdit(index) {
    setTitle(notes[index].title);
    setDetails(notes[index].details);
    setEditIndex(index);
  }

  return (
    <div className="min-h-screen bg-black p-10">
      <h1 className="text-4xl font-bold text-center text-white mb-6">NOTIFY</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 rounded-md bg-white outline-none text-black text-center"
        placeholder="Note Title"
      />

      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="w-full h-40 p-3 rounded-md bg-white outline-none text-black text-center mt-3"
        placeholder="Note Details"
      ></textarea>

      <div className="flex justify-end mt-4 gap-2">
        <button
          onClick={handleAdd}
          className="bg-cyan-700 text-white font-bold w-14 h-14 rounded-2xl shadow-md text-3xl flex items-center justify-center active:scale-95"
        >
          +
        </button>

        <button
          onClick={fetchSampleNote}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Fetch
        </button>

        <button
          onClick={axiosSampleNote}
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Axios
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {notes.map((note, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-md flex justify-between items-start gap-2"
          >
            <div>
              <h2 className="font-bold text-lg">{note.title}</h2>
              <p>{note.details}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(index)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => setNotes(notes.filter((_, i) => i !== index))}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;