import React from 'react';

export const PageFavorites = () => {
          
    return (
      <div>
        <h1>Favorites page</h1>
        {localStorage.login !== 'true' ? 'Please login first to see your favorites...' : null}
      </div>
    );
    
};
