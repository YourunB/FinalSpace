import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageEpisodes } from '../pages/PageEpisodes';
import { PageCharacters } from '../pages/PageCharacters';
import { PageWelcome } from '../pages/PageWelcome';
import { PageProfile } from '../pages/PageProfile';
import { PageFavorites } from '../pages/PageFavorites';
import { PageAbout } from '../pages/PageAbout';

export const PagesRouter = () => {
          
    return (
      <Routes>
        <Route path="/" element={<PageWelcome/>} />
        <Route path="/episodes" element={<PageEpisodes/>} />
        <Route path="/characters" element={<PageCharacters/>} />
        <Route path="/profile" element={<PageProfile/>} />
        <Route path="/favorites" element={<PageFavorites/>} />
        <Route path="/about" element={<PageAbout/>} />
      </Routes>
    );
    
};
