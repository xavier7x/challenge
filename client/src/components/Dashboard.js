import React from 'react';
import Header from './Header/Header';

import Sidebar from './Sidebar/Sidebar';

const Dashboard = ({ children }) => {
  return (
    <div className='gridContainer'>
        <Header />
        <Sidebar />
        <article className='main-content'>
          {children}
        </article>
      
    </div>
  );
};

export default Dashboard;
