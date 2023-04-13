import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Clients from '../components/clients/Clients'

const Layout = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth ? state.auth.isAuthenticated : false);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Dashboard>
      <Clients />
    </Dashboard>
  );
};

export default Layout;
