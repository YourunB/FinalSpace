import React from 'react';

import './PageAbout.css';
import Footer from '../components/Footer.js';

export const PageAbout = () => {
          
    return (
      <div className='PageAbout'>
        <div className='PageAbout__wrapper'>
          <h1>About App</h1>
          <div className='PageAbout__image-box'><img className='PageAbout__image-box_image' alt='Final Space' src='images/final-space-about.png'></img></div>
          <h3>Final Space is an epic animated sci-fi comedy about a spaceman named Gary who is working off a prison sentence and makes a mysterious new alien friend, Mooncake, that he immediately bonds with.</h3>
          <h4>Final Space is an American adult animated space opera comedy-drama television series created by Olan Rogers for TBS. The series involves a prisoner named Gary Goodspeed and his alien friend, Mooncake, and focuses on their intergalactic adventures as they try to solve the mystery of the titular "Final Space". The data and images are used without claim of ownership and belong to their respective owners. This API is open source and uses a BSD license.</h4>
          <div className='PageAbout__image-box'><img className='PageAbout__image-box_image' alt='Final Space' src='images/man.png'></img></div>
          <p>This SPA was developed for educational purposes to learn how React works.</p>
          <p>The application is built on the free <a className='PageAbout__link' href='https://finalspaceapi.com' target={'_blank'}>Final Space API</a> with movie information.</p>
          <p>The application uses <a className='PageAbout__link' href='https://firebase.google.com' target={'_blank'}>FireBase</a> from Google to store and edit data.</p>
        </div>
        <Footer/>
      </div>
    );
    
};
