import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/Auth';
import { Navigate } from 'react-router-dom';
import '../styles/Login.scss'; // Importar el archivo SCSS

const Login = () => {
  useEffect(() => {
    document.body.classList.add('login_challenge');
    return () => {
      document.body.classList.remove('login_challenge');
    };
  }, []);

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await dispatch(login(email, password));
    if (response && response.error) {
      setShowErrorMessage(true);
      setErrorMessage(response.error);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/clients" />;
  }

  return (
    <div className='loginForm'>
      <h2 className='loginForm__h2'><i className='loginForm__line'></i>CRUD OPERATIONS</h2>
      <h3 className='loginForm__h3'>Sign In</h3>
      <p className='loginForm__p'>Enter your credentials <br className='d-block' />to access your account</p>
      {showErrorMessage && <div className="loginForm__error">{errorMessage}</div>}
      <form className='loginForm__form' onSubmit={handleLogin}>
        <label className='loginForm__label'>
          Email:
        </label>
        <input className='loginForm__input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <br />
        <label className='loginForm__label'>
          Password:
        </label>
        <input className='loginForm__input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <br />
        <button className='loginForm__button' type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
