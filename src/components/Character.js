import React, { } from 'react';

import './Character.css';

const Character = props => {

  //console.log(props.character)

  return (
    <div className='Character'>
      <div className='Character__image'><img src={props.character.img_url} alt='Character'></img></div>
      <h3>{props.character.name}</h3>
      <div className='Character__description'>
        <p><span>Gender: </span>{props.character.gender}</p>
        <p><span>Status: </span>{props.character.status}</p>
        <p><span>Origin: </span>{props.character.origin}</p>
        <p><span>Species: </span>{props.character.species}</p>
      </div>
    </div>
  );
};

export default React.memo(Character);