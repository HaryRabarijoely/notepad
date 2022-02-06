  import React from 'react';
  import Showdown from 'showdown';


 /* const NoteDisplay = (props) => {

    const converter = new Showdown.Converter(props);
    const midConversion = converter.makeHtml(props.markdownInput);
    const markdownConversion = {__html: midConversion};


    return (
      <div dangerouslySetInnerHTML={markdownConversion} />
      );

  }
*/

const NoteDisplay = (props) => {
  const { title, content } = props;

  const converter = new Showdown.Converter();
  const noteContent = converter.makeHtml(content);

  function createMarkup(text) {
    return { __html: text };
  }

  return (
    <>
      <h1 >{title}</h1>
      <div
        
        dangerouslySetInnerHTML={createMarkup(noteContent)}
      />
    </>
  );
};

  export default NoteDisplay;