import React, { useState, useEffect } from 'react';

function Unauthorized({setHeaderVisibility}) {

  React.useEffect(() => {
    setHeaderVisibility();
  });

  return (<>
    <div>
        <p>ERROR 401</p>
        UNAUTHORIZED
    </div>
    </>);
}

export default Unauthorized;
