import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('loggedIn').then(value => {
        if (value !== null) {
            setIsLoggedIn(JSON.parse(value));
            console.log('context--',JSON.parse(value));
        }
    });
}, []);

  const [profile, setProfile] = useState({});

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, profile, setProfile}}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;