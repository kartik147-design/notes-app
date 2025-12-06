import React, { useState } from 'react'

const App = () => {

  const [title,setTitle] = useState("")
  const [details,setDetails] = useState("") 
  const [notes,setNotes] = useState([])
  const [editIndex,setEditIndex] = useState(null)

  function handleAdd(){
    if(title.trim() !== "" && details.trim() !== ""){
    const newNotes = {title , details}
    
    if(editIndex !== null){
    const updatedNotes = [...notes]
    updatedNotes[editIndex] = newNotes
    setNotes(updatedNotes)
    setEditIndex(null)
    }else{
    setNotes([...notes,newNotes])
    console.log("Title:",title)
    console.log("Details:",details)
    }
    setDetails("")
    setTitle("")
  }
}

function handleEdit(index){
    setTitle(notes[index].title)
    setDetails(notes[index].details)
    setEditIndex(index)
}

  return (
    <div className="min-h-screen bg-black p-10">
      <h1 className="text-4xl font-bold text-center text-white mb-6">NOTIFY</h1>
      <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} className="w-full p-3 rounded-md bg-white outline-none text-black text-center" placeholder="Note Title"/>
      <textarea type="text" value={details} onChange={(e)=>setDetails(e.target.value)} className="w-full h-40 p-3 rounded-md bg-white outline-none text-black text-center mt-3" placeholder="Note Details"></textarea>
      <div className="flex justify-end mt-4">
      <button onClick={handleAdd} className="bg-cyan-700 text-neutral-50 font-bold w-14 h-14 rounded-2xl shadow-md text-3xl flex items-center justify-center active:scale-95 active:bg-cyan-800 transition-all">+</button>
      </div>

<div className="mt-6 space-y-4">
  {notes.map((note, index) => (
    <div key={index} className="bg-white p-4 rounded-md flex justify-between items-start">
      <div>
        <h2 className="font-bold text-lg">{note.title}</h2>
        <p>{note.details}</p>
      </div>
      <button onClick={() => setNotes(notes.filter((_, i) => i !== index))} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Delete</button>
      <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">Edit</button>
    </div>
  ))}
</div>

    </div>
  )
}

export default App