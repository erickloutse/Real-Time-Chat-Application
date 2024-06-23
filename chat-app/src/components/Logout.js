

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprime le token de localStorage
    navigate('/login', { replace: true }); // Redirige vers la page de connexion après déconnexion
  };

  return <button onClick={handleLogout}>Logout</button>; // Bouton de déconnexion qui appelle handleLogout() onClick
};

export default Logout;
