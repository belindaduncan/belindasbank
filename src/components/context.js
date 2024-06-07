import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase'; // Ensure this path points to your firebase.js file

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    auth.signOut()
      .then(() => setUser(null))
      .catch(error => console.error('Error logging out:', error));
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};