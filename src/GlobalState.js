import React, { createContext, useState, useEffect } from 'react';
import ProductsAPI from './api/ProductsAPI';
import UserAPI from './api/UserAPI';
import CategoriesAPI from './api/CategoriesApi';

import axios from 'axios';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [theme,setTheme]=useState('light');
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get('/user/refresh_token');
        setToken(res.data.access_token);

        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);
  const state = {
    theme: [theme,setTheme],
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
