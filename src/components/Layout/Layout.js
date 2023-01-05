import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SetupLayout from '../Layout/setupLayout';

const Layout = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={<SetupLayout />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default Layout;
