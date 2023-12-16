import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDbFireBase } from "../redux/dataSlice.js";

import {appEvents} from '../components/events.js';
import { getDatabase, remove, child, ref, push, update, onValue  } from "firebase/database";
import { app } from '../components/firebaseModule';

import './PageFavorites.css';
import Footer from '../components/Footer.js';
import Episode from '../components/Episode.js';
import ModalEpisode from '../components/ModalEpisode';

export const PageFavorites = () => {

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
    appEvents.addListener('EventRemoveFromFavorites', removeEpisode);
    appEvents.addListener('EventCloseModalEpisode', closeModalEpisode);

    return() => {
      appEvents.removeListener('EventCheckEpisode', checkEpisode);
      appEvents.removeListener('EventRemoveFromFavorites', removeEpisode);
      appEvents.removeListener('EventCloseModalEpisode', closeModalEpisode);
    }
  }, [dataRedux] );

  function checkEpisode(episode) { setCheckedEpisode(episode); }
  function closeModalEpisode() { setCheckedEpisode(null); }

  function removeEpisode(episode) {
    remove(ref(db, `/users/${dataRedux.uid}/favorites/${episode.name}`), {
    })
    .then(() => {
      getDb();
    })
    .catch((error) => {
      console.error("Error: ", error);
    })
  }

  let episodeCode;
  if (dataRedux.db !== null && dataRedux.activeUser !== null && dataRedux.uid !== null && dataRedux.db.users[dataRedux.uid].favorites) {
    let favorites = [];
    Object.values(dataRedux.db.users[dataRedux.uid].favorites).forEach(function(element) { favorites.push(element) });
    episodeCode = favorites.map( el => {
      let episode = el;
      if (el !== undefined) {
        return <Episode
          episode={episode}
          key={el.id}
          btnRemove={true}
          btnAdd={false}
        />
      }
    });
  }
          
  return (
    <div className='PageFavorites'>
      {checkedEpisode !== null ? <ModalEpisode episode={checkedEpisode} /> : null}
      <div className='PageFavorites__wrapper'>
        <h1>Favorites Episodes</h1>
        {dataRedux.activeUser === null ? 'Please login first to see your favorites...' : null}
        {dataRedux.activeUser === null ? <img className='PageFavorites_lock-image' src='./images/svg/lock.svg' alt='Lock'></img> : null}
        <div className='PageFavorites__episodes'>
          {episodeCode}
        </div>
      </div>
      <Footer/>
    </div>
  );
    
};
