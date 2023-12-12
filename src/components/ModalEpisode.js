import React, {} from 'react';

import './ModalEpisode.css';

import {appEvents} from './events';

const ModalEpisode = props => {

  console.log(props.episode)

  function closeModal() {
    appEvents.emit('EventCloseModalEpisode', props.episode);
  }

  return (
    <div className='ModalEpisode' onClick={() => {closeModal()}}>
      <div className='ModalEpisode__window'>
        <h3>{props.episode.name}</h3>
        <div className='ModalEpisode__window_image'>
          <img src={props.episode.img_url} alt='Final Space' />
        </div>
        <p><span>Director: </span>{props.episode.director}</p>
        <p><span>Writer: </span>{props.episode.writer}</p>
        <p><span>Date: </span>{props.episode.air_date}</p>
        <p>This episode featured <span>{props.episode.characters.length}</span> character(s)</p>
      </div>
      <div className='ModalEpisode__overlay'></div>
    </div>
  );
};

export default React.memo(ModalEpisode);