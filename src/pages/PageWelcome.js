import React from 'react';

import './PageWelcome.css';
import { NavLink } from 'react-router-dom';

export const PageWelcome = () => {

  return (
    <div className='PageWelcome'>
      <NavLink to="/episodes">
        <img src='images/final-space.jpg' alt='Final Space'/>
        <p>&copy; <span>2023</span> This SPA was developed for educational purposes by <span>Yury Butskevich</span>.</p>
      </NavLink>
    </div>
  );
    
};
