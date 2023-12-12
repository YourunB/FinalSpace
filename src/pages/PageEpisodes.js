import React, { useState, useEffect, useRef} from 'react';
import "regenerator-runtime/runtime";
import { useDispatch, useSelector } from 'react-redux';
import { updateSaveEpisodes } from "../redux/dataSlice.js";

import {appEvents} from '../components/events.js';
import './PageEpisodes.css';
import Footer from '../components/Footer.js';
import Episode from '../components/Episode.js';

export const PageEpisodes = () => {

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const dataRedux = useSelector( state => state.data ); 

  useEffect( () => {
    appEvents.addListener('EventGetEpisodes', saveEpisodes);

    return() => {
      appEvents.removeListener('EventGetEpisodes', saveEpisodes);
    }
  }, [dataRedux] );

  function saveEpisodes(episodesArr) { dispatch(updateSaveEpisodes(episodesArr)); }

  function getData(link, what) {
    let url = link;
    const options = {
      method: 'GET',
    };
    fetchAsync();
    async function fetchAsync() { 
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (what === 'episodes') saveEpisodes(data);
      } catch (error) {
        if (error != "") console.log("Error: " + error);
      }
    }
  }

  if (dataRedux.episodesArr === null) getData('https://finalspaceapi.com/api/v0/episode', 'episodes'); //get episodes
  
  let episodesCode;
  if (dataRedux.episodesArr !== null) {
    episodesCode = dataRedux.episodesArr.map( el => {
      let episode = el;
      return <Episode
        episode={episode}
        key={el.id}
      />;
    });
  }
          
  return (
    <div className='PageEpisodes'>
      <div className='PageEpisodes__content'>
        <h1>Episodes</h1>
        <div className='PageEpisodes__content_episodes'>
          {episodesCode}
        </div>
      </div>
      <Footer/>
    </div>
  );
    
};
