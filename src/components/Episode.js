import React, { useRef } from 'react';

import './Episode.css';

import {appEvents} from './events';

const Episode = props => {

  const episodeBlock = useRef(null);

  function checkEpisode() {
    appEvents.emit('EventCheckEpisode', props.episode);
  }

  function addToFavorites(e) {
    e.stopPropagation();
    episodeBlock.current.className = 'Episode Episode-add';
    appEvents.emit('EventAddToFavorites', props.episode);
    setTimeout(()=>{episodeBlock.current.className = 'Episode';}, 1000)
  }

  function removeFromFavorites(e) {
    e.stopPropagation();
    episodeBlock.current.className = 'Episode Episode-remove';
    setTimeout(() => {
      appEvents.emit('EventRemoveFromFavorites', props.episode);
    }, 500)
  }

  return (
    <div className='Episode' ref={episodeBlock} onClick={()=>{checkEpisode()}}>
      <div className='Episode__image'>
        <img src={props.episode.img_url}/>
      </div>
      <div className='Episode__content'>
        <p><span>Episode: </span>{props.episode.name}</p>
        <p><span>Date: </span>{props.episode.air_date}</p>
        <p><span>Director: </span>{props.episode.director}</p>
        <p><span>Writer: </span>{props.episode.writer}</p>
      </div>
      {props.btnAdd === true ? <button onClick={(e) => {addToFavorites(e);}}>Add to Favorites</button> : null}
      {props.btnRemove === true ? <button onClick={(e) => {removeFromFavorites(e);}}>Remove</button> : null}
    </div>
  );
};

export default React.memo(Episode);