import React, { useRef } from 'react';

import './Episode.css';

import {appEvents} from './events';

const Episode = props => {

  const episodeBlock = useRef(null);

  function checkEpisode() {
    appEvents.emit('EventCheckEpisode', props.episode);
  }

  function addToFavorites(e) {
    appEvents.emit('EventAddToFavorites', props.episode);
    e.stopPropagation();
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
      <button onClick={(e) => {addToFavorites(e);}}>Add to Favorites</button>
    </div>
  );
};

export default React.memo(Episode);