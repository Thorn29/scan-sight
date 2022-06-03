import React from 'react';
import './Loader.css';

const Loader = ({ big, children }) => {
  return(
    <div className={ big ? 'loader big' : 'loader'}>
      <div className='loader__main'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className='loader__text'>{children}</p>
    </div>
  );
}

export default Loader;
