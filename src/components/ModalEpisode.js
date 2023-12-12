import React, {useState, useRef} from 'react';
import "regenerator-runtime/runtime";
import { useDispatch, useSelector } from 'react-redux';
import { updateSaveCharacters } from "../redux/dataSlice.js";

import './ModalEpisode.css';
import Character from '../components/Character.js';
import {appEvents} from './events';

const ModalEpisode = props => {

  const [showCharacters, setShowCharacters] = useState(false);

  const episodeModal = useRef(null);
  const episodeModalWindow = useRef(null);
  const episodeModalOverlay = useRef(null);

  const dispatch = useDispatch();
  const dataRedux = useSelector( state => state.data ); 

  function closeModal() {
    episodeModalWindow.current.className = 'ModalEpisode__window ModalEpisode-hide';
    episodeModalOverlay.current.className = 'ModalEpisode__overlay ModalEpisode-hide-overlay';
    setTimeout(() => {appEvents.emit('EventCloseModalEpisode', props.episode)}, 500);
  }

  function loadCharacters(e) {
    e.stopPropagation();

    if (dataRedux.charactersArr === null) {
      const p = new Promise((resolve, reject)=>{
        const data = getData('https://finalspaceapi.com/api/v0/character');
        resolve(data);
      })
      p.then((data)=>{
        setShowCharacters(true);
      })
    }

    if (dataRedux.charactersArr !== null) {
      console.log(dataRedux.charactersArr)
      setShowCharacters(true);
    }
  }

  function saveCharacters(charactersArr) { dispatch(updateSaveCharacters(charactersArr)); }

  function getData(link) {
    let url = link;
    const options = {
      method: 'GET',
    };
    const res = fetchAsync();
    async function fetchAsync() { 
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        saveCharacters(data);
        return data;
      } catch (error) {
        if (error != "") console.log("Error: " + error);
      }
    }
    return res;
  }

  let characterCode;
  if (showCharacters === true) {
    let characterArrId = [];
    props.episode.characters.forEach(el => { characterArrId.push(el.slice(43)); });

    characterCode = dataRedux.charactersArr.map( el => {
      for (let i = 0; i < characterArrId.length; i++) {
        if (characterArrId[i] == el.id) {
          return <Character
            character={el}
            key={el.id}
          />
        }
      }
    });
  }

  return (
    <div ref={episodeModal} className='ModalEpisode'>
      <div ref={episodeModalWindow} className='ModalEpisode__window'>
        <button className='ModalEpisode__window_btn-close' onClick={() => {closeModal()}}>&#10006;</button>
        <h3>{props.episode.name}</h3>
        <div className='ModalEpisode__window_image'>
          <img src={props.episode.img_url} alt='Final Space' />
        </div>
        <p><span>Director: </span>{props.episode.director}</p>
        <p><span>Writer: </span>{props.episode.writer}</p>
        <p><span>Date: </span>{props.episode.air_date}</p>
        <p>This episode featured <span>{props.episode.characters.length}</span> character(s)</p>
        {showCharacters === false ? <div className='ModalEpisode__window_controls'><button onClick={(e)=>{loadCharacters(e)}}>Show episode characters</button></div> : null}
        {showCharacters === true ? <div className='ModalEpisode__window_characters'>{characterCode}</div> : null}
      </div>
      <div onClick={() => {closeModal()}} ref={episodeModalOverlay} className='ModalEpisode__overlay'></div>
    </div>
  );
};

export default React.memo(ModalEpisode);