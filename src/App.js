import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { PagesLinks } from './components/PagesLinks';
import { PagesRouter } from './routes/PagesRouter';

export const App = () => (
  <BrowserRouter>
    <header>
      <PagesLinks />
      <PagesRouter />
    </header>
  </BrowserRouter>
);
