import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaClipboard } from 'react-icons/fa';
import '../../styles/Sidebar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/Auth';
import { Navigate } from 'react-router-dom';

const Sidebar = () => {
  const isAuthenticated = useSelector(state => state.auth ? state.auth.isAuthenticated : false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    return <Navigate to="/login" />;
  };

  return (
    <aside className='sidebar'>
      <h2 className='titleApp'><i className='line'></i>CRUD OPERATIONS</h2>
      <div className='profile'>
        <img className='profile__img' src={process.env.PUBLIC_URL + '/img/pexels-photo-2379004 1.png'} alt='Profile' />
        <h3 className='profile__h3'>Karthi Madesh</h3>
        <p className='profile__p'>Admin</p>
      </div>
      <ul className='sidebar__menu'>
        <li className='sidebar__menu-item'>
          <Link to='/'>
            
            <i className='sidebar__icons__home'></i>
            Home
          </Link>
        </li>
        <li className='sidebar__menu-item'>
          <Link to='/'>
          <i className='sidebar__icons__stick'></i>
            Course
          </Link>
        </li>
        <li className='sidebar__menu-item'>
          <Link to='/clients'>
            <i className='sidebar__icons__grade'></i>
            Clients
          </Link>
        </li>
        <li className='sidebar__menu-item'>
          <Link to='/orders'>
            <i className='sidebar__icons__payment'></i>
            Payment
          </Link>
        </li>
        <li className='sidebar__menu-item'>
          <Link to='/orders'>
            <i className='sidebar__icons__report'></i>
            Report
          </Link>
        </li>
        <li className='sidebar__menu-item'>
          <Link to='/orders'>
            <i className='sidebar__icons__settings'></i>
            Settings
          </Link>
        </li>
      </ul>
      <div className='logout'>
        {isAuthenticated && (
          <button className='logout__a' onClick={handleLogout}>
            Logout
            <i className='sidebar__icons__logout'></i>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
