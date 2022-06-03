import React from 'react';
import './MainInput.css';

const MainInput = ({ change, val, submit }) => {
  return(
    <div className='main-input'>
      <input className='main-input__input' onChange={change} type='text' placeholder='Paste your link here' value={val} autoComplete='off' />
      <button className='main-input__button' onClick={submit}>Scan</button>
    </div>
  );
}

export default MainInput;
