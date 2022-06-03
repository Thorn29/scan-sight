import React from 'react';
import PinnedItem from './PinnedItem';
import './PinnedList.css';

const PinnedList = ({ posts, deleteText }) => {
  return(
    <div className='pinned-list'>
      <h4 className='pinned-list__title'>Pinned</h4>
      <div className='pinned-list__list'>
          {posts.map(post => <PinnedItem key={post.id} {...post} deleteText={deleteText} />)}
      </div>
    </div>
  );
}

export default PinnedList;
