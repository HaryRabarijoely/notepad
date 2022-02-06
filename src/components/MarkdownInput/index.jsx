import React from 'react';

const MarkdownInput = (props) => {
  const { handleChange,id , title, content, saveNote} = props;
  const handleChangeTitle = (e) => handleChange({ title: e.currentTarget.value });
  const handleChangeContent = (e) => handleChange({ content: e.currentTarget.value });
  const handleSave = () => saveNote({ id, title, content });

/*  return (
    <div>
          <input value={title} onChange={handleChangeTitle} /> 
          <textarea value={content} onChange={handleChangeContent} />
    </div>
  );*/

  return(
  <>
  <div id="notetitle">
    <input type="text" name="title" value={title || ''} placeholder="Titre de votre note" onChange={handleChangeTitle} />
  </div>
  <div>
    <textarea type="text" name="content" value={content || ''} placeholder="Contenu de votre note ici..." onChange={handleChangeContent} />
  </div>
  <div>
    <button
      onClick={handleSave}
    >
      {' '}
      Sauvegarder{' '}
    </button>
  </div>
</>
  );

  

};

export default MarkdownInput;