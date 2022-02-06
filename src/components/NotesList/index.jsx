import React from 'react';
import LilTrash from '../images/trash-red.svg';

const NotesList = (props) => {
  const { noteList, viewNote, trashOne } = props

  const savedNotes = noteList.map((note) => (
    <div key={note.id} className="note">
      <div className="preview" onClick={() => viewNote(note)}>
        <h1>{note.title}</h1>
        <p>
          {note.content.length > 140
            ? `${note.content.substring(0, 140)}...`
            : note.content}
        </p>
      </div>
      <img
        src={LilTrash}
        alt="delete the note"
        style={{ height: '1em', cursor: 'pointer' }}
        onClick={() => trashOne(note)}
      />
    </div>
  ));

  return <div>{savedNotes}</div>;
};

export default NotesList;
