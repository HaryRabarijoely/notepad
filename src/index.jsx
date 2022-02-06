import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import NoteDisplay from './components/NoteDisplay';
import MarkdownInput from './components/MarkdownInput';
import shortid from 'shortid';
import NotesList from './components/NotesList';
import Trash from '../src/images/trash-red.svg';


const App = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [noteList, setNoteList] = useState([]);
  const [error, setError] = useState('');
  const [seeView, setSeeView] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [seeAdd, setSeeAdd] = useState(false);

  const newNote = () => {
    setId(shortid.generate());
    setTitle('');
    setContent('');
    setSeeView(true);
    setSeeAdd(true);
  };

/*  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };
*/
  
  const handleChange = (input) => {
    if (input.title !== undefined) setTitle(input.title);
    if (input.content !== undefined) setContent(input.content);
  }

  const addError = (text) => {
    setError(text);
    setTimeout(() => {
      setError('');
    }, 2000);
  };

  const editNote = (index, editedNote) => {
    setNoteList(
      noteList.map((note) => (note.id === editedNote.id ? editedNote : note))
    );
    setSeeView(false);
    setSeeAdd(false);
  };

  const saveNote = (note) => {
    const noteIndex = noteList.findIndex((save) => save.id === id);
    if (noteIndex !== -1) {
      editNote(noteIndex, note);
      return;
    }

    if (!note.title && !note.content) {
      addError('Merci de mettre un titre et un contenu');
      return;
    }
    if (!note.title) {
      addError('Merci de mettre un titre');
      return;
    }
    if (!note.content) {
      addError('Merci de mettre un contenu');
      return;
    }

    note.id = shortid.generate();
    setTitle(note.title);
    setContent(note.content);
    setNoteList([...noteList, note]);
    setSeeView(false);
    setSeeAdd(false);
  };

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes'));
    setNoteList(notes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(noteList));
  }, [noteList]);

  const viewNote = (note) => {
    setId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setSeeView(true);
    setSeeAdd(false);
  };

  const trashAll = () => {
    localStorage.clear();
    setNoteList([]);
    newNote();
  };

  const trashOne = (note) => {
    const name = note.title;
    if (note.id === id) {
      newNote();
    }
    setNoteList(noteList.filter((item) => item.title !== name));
  };

  return (
    <>
      <aside>
        <div className="center">
          <button onClick={newNote}>Créer une note</button>
          <img
            src={Trash}
            alt="destroy all notes"
            className="trashall"
            onClick={trashAll}
          />
        </div>
        <NotesList noteList={noteList} viewNote={viewNote} trashOne={trashOne} />
      </aside>
      <section>
        {error && (
          <>
            <div className="alert">              
              <p>{error}</p>
            </div>
          </>
        )}
        {seeView && (
          <>
            <div id="display">
              <NoteDisplay title={title} content={content} />
            </div>
            <MarkdownInput handleChange={handleChange} saveNote={saveNote} id={id} title={title} content={content}/>
          </>
        )}        
      </section>
    </>
  );  

};


ReactDOM.render(<App />, document.getElementById('root'));