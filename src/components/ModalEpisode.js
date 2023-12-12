import React, {useRef} from 'react';

import './ModalEpisode.css';

import {appEvents} from './events';

const ModalEpisode = props => {

  const episodeModal = useRef(null);
  const episodeModalWindow = useRef(null);
  const episodeModalOverlay = useRef(null);

  function closeModal() {
    episodeModalWindow.current.className = 'ModalEpisode__window ModalEpisode-hide';
    episodeModalOverlay.current.className = 'ModalEpisode__overlay ModalEpisode-hide-overlay';
    setTimeout(() => {appEvents.emit('EventCloseModalEpisode', props.episode)}, 500);
  }

  return (
    <div ref={episodeModal} className='ModalEpisode' onClick={() => {closeModal()}}>
      <div ref={episodeModalWindow} className='ModalEpisode__window'>
        <h3>{props.episode.name}</h3>
        <div className='ModalEpisode__window_image'>
          <img src={props.episode.img_url} alt='Final Space' />
        </div>
        <p><span>Director: </span>{props.episode.director}</p>
        <p><span>Writer: </span>{props.episode.writer}</p>
        <p><span>Date: </span>{props.episode.air_date}</p>
        <p>This episode featured <span>{props.episode.characters.length}</span> character(s)</p>
      </div>
      <div ref={episodeModalOverlay} className='ModalEpisode__overlay'></div>
    </div>
  );
};

export default React.memo(ModalEpisode);