import React, { useState, useEffect } from 'react';

function NotFound({setHeaderVisibility}) {

  React.useEffect(() => {
    setHeaderVisibility();
  });

  return (<>
    <div>
        <p>ERROR 404</p>
        NOT FOUND
    </div>
    </>);
}

export default NotFound;
