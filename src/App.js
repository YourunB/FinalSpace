import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { PagesLinks } from './components/PagesLinks';
import { PagesRouter } from './routes/PagesRouter';

import { Provider } from 'react-redux';
import { store } from './redux/store.js';

export const App = () => (
  <BrowserRouter>
    <Provider store={store}>

      <header>
        <PagesLinks />
        <PagesRouter />
      </header>
      
    </Provider>
  </BrowserRouter>
);
