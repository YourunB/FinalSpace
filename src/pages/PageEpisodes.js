import React, { useState, useEffect } from 'react';
import "regenerator-runtime/runtime";
import { useDispatch, useSelector } from 'react-redux';
import { updateSaveEpisodes, updateDbFireBase } from "../redux/dataSlice.js";
import { NavLink } from 'react-router-dom';

import {appEvents} from '../components/events.js';
import './PageEpisodes.css';
import Footer from '../components/Footer.js';
import Episode from '../components/Episode.js';
import ModalEpisode from '../components/ModalEpisode';

import { getDatabase, child, ref, push, update, onValue  } from "firebase/database";
import { app } from '../components/firebaseModule';

export const PageEpisodes = () => {

  const [page, setPage] = useState(1);
  const [checkedEpisode, setCheckedEpisode] = useState(null);

  const dispatch = useDispatch();
  const dataRedux = useSelector( state => state.data ); 

  const db = getDatabase(app);

  if (dataRedux.db === null) {
    getDb();
  }

  function getDb() {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      dispatch(updateDbFireBase(data));
    });
  }

  useEffect( () => {
    appEvents.addListener('EventCheckEpisode', checkEpisode);
    appEvents.addListener('EventCloseModalEpisode', closeModalEpisode);
    appEvents.addListener('EventAddToFavorites', addToFavorites);

    return() => {
      appEvents.removeListener('EventCheckEpisode', checkEpisode);
      appEvents.removeListener('EventCloseModalEpisode', closeModalEpisode);
      appEvents.removeListener('EventAddToFavorites', addToFavorites);
    }
  }, [dataRedux] );

  function saveEpisodes(episodesArr) { dispatch(updateSaveEpisodes(episodesArr)); }
  function checkEpisode(episode) { setCheckedEpisode(episode); }
  function closeModalEpisode() { setCheckedEpisode(null); }

  function addToFavorites(episode) {
    if (dataRedux.db !== null && dataRedux.uid !== null) {
      update(ref(db, `/users/${dataRedux.uid}/favorites/`), {
        [episode.name]: episode,
      })
      .then(() => {
        getDb();
      })
      .catch((error) => {
        console.error("Error: ", error);
      })
    }
    else alert('Please login first');
  }

  function getData(link) {
    let url = link;
    const options = {
      method: 'GET',
    };
    fetchAsync();
    async function fetchAsync() { 
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        saveEpisodes(data);
      } catch (error) {
        if (error !== "") console.log("Error: " + error);
      }
    }
  }

  if (dataRedux.episodesArr === null) getData('https://finalspaceapi.com/api/v0/episode'); //get episodes

  function prevPage() { if (page > 1) setPage(page - 1); }
  function nextPage() { if (page < dataRedux.maxPage) setPage(page + 1);  }
  
  function locationNav() {
    if (window.location.search !== '' && window.location.search !== `?page=${page}`) {
      let searchText = window.location.search.slice(0, 6);
      let searchPage = window.location.search.slice(6);
      if (searchText === '?page=' && !isNaN(searchPage)) {
        if (Number(searchPage) !== page && Number(searchPage) > 0) setPage(searchPage);
      }
    }
  }

  useEffect(() => {
    locationNav();
  },[window.location.search])
  

  let episodeCode;
  if (dataRedux.episodesArr !== null) {
    episodeCode = dataRedux.episodesArr[page - 1].map( el => {
      let episode = el;
      return <Episode
        episode={episode}
        key={el.id}
        btnRemove={false}
        btnAdd={dataRedux.uid !== null ? true : false}
      />
    });
  }
          
  return (
    <div className='PageEpisodes'>
      {checkedEpisode !== null ? <ModalEpisode episode={checkedEpisode} /> : null}
      <div className='PageEpisodes__content'>
        <h1>Episodes</h1>
        <div className='PageEpisodes__content_episodes'>
          {episodeCode}
          <div className='PageEpisodes__content_episodes_controls'>
            <NavLink to={`/episodes?page=${page - 1}`}><button disabled={(page === 1) ? true : false} onClick={() => {prevPage()}}>&#8882;</button></NavLink>
            <NavLink to={`/episodes?page=${page + 1}`}><button disabled={(page === dataRedux.maxPage) ? true : false}  onClick={() => {nextPage()}}>&#8883;</button></NavLink>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
    
};
