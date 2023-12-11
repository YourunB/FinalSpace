import React, { } from 'react';

import './Footer.css';

const Footer = props => {

  return (
    <footer className='Footer'>
      <a className='Footer__author' href="https://github.com/yourunb" title="open the link">&copy; 2023 Yury Butskevich</a>
      <ul className='Footer__list'>
        <li className='Footer__list_item'><a href="https://codepen.io/BxYura/pens/public" title="open my codepen" target="_blank"><img src="images/svg/codepen.svg" alt="Codepen"/></a></li>
        <li className='Footer__list_item'><a href="https://www.codewars.com/users/rsschool_785da839e5c30a16" title="open my codewars" target="_blank"><img src="images/svg/codewars.svg" alt="Codewars"/></a></li>
        <li className='Footer__list_item'><a href="https://github.com/YourunB" title="open my github" target="_blank"><img src="images/svg/github.svg" alt="Github"/></a></li>
      </ul>
    </footer>
  );
};

export default Footer;