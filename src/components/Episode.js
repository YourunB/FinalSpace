import React, { useState, useRef } from 'react';

import './Episode.css';

import {appEvents} from './events';

const Episode = props => {

  console.log(props.episode);

  return (
    <div className='Edisode'>
      <div className='Edisode__image'>
        <img src={props.episode.img_url}/>
      </div>
      <div className='className__content'>
        <p><span>Episode: </span>{props.episode.name}</p>
        <p><span>Date: </span>{props.episode.air_date}</p>
        <p><span>Director: </span>{props.episode.director}</p>
        <p><span>Writer: </span>{props.episode.writer}</p>
      </div>
      <button>Add to Favorites</button>
    </div>
  );
};

export default React.memo(Episode);