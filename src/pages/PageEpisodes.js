import React from 'react';

import './PageEpisodes.css';
import Footer from '../components/Footer.js';
import Episode from '../components/Episode.js';

export const PageEpisodes = () => {
          
    return (
      <div className='PageEpisodes'>
        <div className='PageEpisodes__content'>
          <h1>Episodes</h1>
          <div className='PageEpisodes__content_episodes'>
            <Episode/>
          </div>
        </div>
        <Footer/>
      </div>
    );
    
};
