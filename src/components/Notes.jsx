import React, { useContext, useEffect } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;
    useEffect(() => {
        getNotes()
    }, [])

    //---------------------------------
    // const ref = useRef(null)
    // const [note, setNote] = useState({etitle: "", edescription: "", etag: ""})
    // const updateNote = (currentNote) => {
    //     ref.current.click();
    //     setNote({etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    // }
    // const handleClick = (e)=>{
    //     console.log("Updating the note...", note)
    //     e.preventDefault(); 
    // }
    // const onChange = (e)=>{
    //     setNote({...note, [e.target.name]: e.target.value})
    // }
    //---------------------------------------------
    return (
        <>
            <AddNote />
            <div>
                <h2>You Notes</h2>
                <div className="row my-3 sm-1">
                    {notes.map((note) => {
                        return <Noteitem key={note._id} note={note} />
                    })}
                    
                </div>
            </div>
        </>
    )
}

export default Notes