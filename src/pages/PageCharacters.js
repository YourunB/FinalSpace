import React, {} from 'react';
import "regenerator-runtime/runtime";
import { useDispatch, useSelector } from 'react-redux';
import { updateSaveCharacters } from "../redux/dataSlice.js";

import './PageCharacters.css';
import Character from '../components/Character';

export const PageCharacters = () => {

  const dispatch = useDispatch();
  const dataRedux = useSelector( state => state.data );

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
        saveCharacters(data);
      } catch (error) {
        if (error !== "") console.log("Error: " + error);
      }
    }
  }

  function saveCharacters(charactersArr) { dispatch(updateSaveCharacters(charactersArr)); }

  if (dataRedux.charactersArr === null) getData('https://finalspaceapi.com/api/v0/character'); //get characters

    let characterCode;
    if (dataRedux.charactersArr !== null) {
      characterCode = dataRedux.charactersArr.map( el => {
        return <Character
          character={el}
          key={el.id}
        />
      });
    }
          
    return (
      <div className='PageCharacters'>
        <h1>Characters</h1>
        <div className='PageCharacters__characters'>
          {characterCode}
        </div>
      </div>
    );
    
};
