import React from 'react';

export const PageProfile = () => {
          
    return (
      <div>
        <h1>Profile page</h1>
        {localStorage.login !== true ? 'Please login first to see your profile...' : null}
      </div>
    );
    
};
