import React, { useState, useEffect } from 'react';

function TestAdmin({ setHeaderVisibility }) {
  React.useEffect(() => {
    setHeaderVisibility();
  });
  
  return (<>
    <div>
        Ceci est un test pour admin
    </div>
    </>);
}

export default TestAdmin;
