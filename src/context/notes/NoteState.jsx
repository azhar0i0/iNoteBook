import NoteContext from "./noteContext.jsx";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5001"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5OGIwZGFmOTQ5ZjdhYmEzMDljYjRmIn0sImlhdCI6MTczODA1OTk5NH0.Qj3LOBTnme6pFjTcu27NFB66T8M1i9Ubl9LWKFPAVdE"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5OGIwZGFmOTQ5ZjdhYmEzMDljYjRmIn0sImlhdCI6MTczODA1OTk5NH0.Qj3LOBTnme6pFjTcu27NFB66T8M1i9Ubl9LWKFPAVdE"
      },
      body: JSON.stringify({ title, description, tag })
    });


    console.log("Adding a new note")
    const note = {
      "_id": "61322f119553781a8ca8d0e08",
      "user": "6131dc5e3e4037cd4734a0664",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-03T14:20:09.668Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }


  
  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5OGIwZGFmOTQ5ZjdhYmEzMDljYjRmIn0sImlhdCI6MTczODA1OTk5NH0.Qj3LOBTnme6pFjTcu27NFB66T8M1i9Ubl9LWKFPAVdE"
      }
    });
    const json = response.json();
    console.log(json)
    
    // TODO: API Call
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5OGIwZGFmOTQ5ZjdhYmEzMDljYjRmIn0sImlhdCI6MTczODA1OTk5NH0.Qj3LOBTnme6pFjTcu27NFB66T8M1i9Ubl9LWKFPAVdE"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;