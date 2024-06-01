import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LoginPage.css';
import Image from '../assets/logo.svg';
import { loginUser } from '../apiService';
import { useDispatch } from 'react-redux';
import { login } from '../authSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginU, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loginU && password) {
      setError(null);
    }
  }, [loginU, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginU !== '' && password !== '') {
      try {
        const response = await loginUser({ username: loginU, password });
        localStorage.setItem('token', response.data.token);
        dispatch(login(response.data.token));
        navigate('/home');
      } catch (error) {
        setError('Ошибка авторизации: ' + (error.response?.data?.error || error.message));
      }
    } else {
      setError(loginU === '' ? 'Введите логин' : 'Введите пароль');
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="img-container">
        <img src={Image} width={200} height={200} alt="Logo" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="h-elem">Авторизация</h3>
        <input
          className="input-form"
          placeholder="Логин"
          value={loginU}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          className="input-form"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submit-btn" type="submit">Войти</button>
      </form>
      <button onClick={handleClick} className="toRegister-btn">Регистрация</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default LoginPage;
