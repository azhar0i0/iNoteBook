import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"

const Noteitem = ({note}) => {
  
  const context = useContext(noteContext);
  const { deleteNote } = context;
console.log(note._id)
  
  return (
    <div className='col-md-4 row-sm-1'>
      <div className="card mx-3 my-3">
        <div className="card-body">
          <h5 className="card-title">{ note.title }</h5>
          <p className="card-text">{ note.description }</p>
          <i className="fa-solid fa-trash align-items-center mx-2" onClick={()=>{deleteNote(note._id)}}></i>
          <i className="fa-regular fa-pen-to-square align-items-center mx-2"></i>
        </div>
      </div>
    </div>
  )
}

export default Noteitem
