import React, { useState, useEffect } from 'react';

function AdminDashboard({setHeaderVisibility}) {

  React.useEffect(() => {
    setHeaderVisibility();
  });

  return (<>
    <div>
        Hello world !  Ceci est une page administateur. Elle ne doit être accessible en aucun cas pour les autres utilisateurs.
    </div>
    </>);
}

export default AdminDashboard;
