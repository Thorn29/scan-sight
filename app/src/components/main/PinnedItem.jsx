import React from 'react';
import './PinnedItem.css';

const PinnedItem = ({ id, content, deleteText }) => {

  const copyText = (data) => {
    navigator.clipboard.writeText(data);
  }

  return(
    <div className='pinned-item'>
    <p className='pinned-item__text'>{content}</p>
    <div className='pinned-item__buttons'>
    <button onClick={() => copyText(content)} className='pinned-item__button green'>Copy</button>
    <button onClick={() => deleteText(id)} className='pinned-item__button red'>Delete</button>
    </div>
    </div>
  );
}

export default PinnedItem;
