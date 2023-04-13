import React from 'react';
/*import { Link } from 'react-router-dom';
import { FaBars, FaSearch } from 'react-icons/fa';*/
import '../../styles/Header.scss'

const Header = () => {
  const handleToggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const mainContain = document.querySelector('.gridContainer');
    const header__icon_toogle = document.querySelector('.header__icon_toogle');
    sidebar.classList.toggle('sidebar--hidden');
    mainContain.classList.toggle('gridContainer--maximize');
    header__icon_toogle.classList.toggle('header__icon_toogle--open');
  };

  return (
    <header className='header'>
      <div className='header__toggle-button' onClick={handleToggleSidebar}>
      <i className='header__icon_toogle'></i>
      </div>
      <div className='header__search-box'>
        <input type='text' placeholder='Search...' />
        <i className='header__search-icon'></i>
      </div>
    </header>
  );
};

export default Header;
