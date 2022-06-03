import React, { useRef } from 'react';
import './Output.css';

const Output = ({ text, pin }) => {

  const outputText = useRef(null);

  const copyfun = () => {
    navigator.clipboard.writeText(outputText.current.value);
  }

  return(
    <div className={ text ? 'output' : 'output empty'}>
      <textarea ref={outputText} className='output__text' defaultValue={text} />
      <div className='output__controls'>
        <button onClick={copyfun} className='output__button'>Copy</button>
        <button onClick={() => pin(outputText.current.value)} className='output__button'>Pin</button>
      </div>
      <p className='output__info'>Note: pinned texts will remain saved on your profile</p>
    </div>
  );
}

export default Output;
