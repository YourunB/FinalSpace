import React from 'react';
import { NavLink } from 'react-router-dom';

import './PagesLinks.css';

export const PagesLinks = () => {
          
  function getLinkClass(obj) {
    let className="PageLink";
    if ( obj.isActive )
      className+=" ActivePageLink";
    return className;
  }

  return (
    <nav>
      <NavLink to="/" end    className={getLinkClass}>Welcome</NavLink>
      <NavLink to="/episodes" className={getLinkClass}>Episodes</NavLink>
      <NavLink to="/characters" className={getLinkClass}>Characters</NavLink>
      <NavLink to="/profile" className={getLinkClass}>Profile</NavLink>
      <NavLink to="/favorites" className={getLinkClass}>Favorites</NavLink>
      <NavLink to="/about" className={getLinkClass}>About</NavLink>
    </nav>
  );
};
