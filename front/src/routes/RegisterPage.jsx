import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/RegisterPage.css';
import Image from '../assets/logo.svg';
import { registerUser } from '../apiService';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fio, setFio] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (fio) {
            setError(null);
        }
    }, [fio]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username !== '' && password !== '' && fio !== '') {
            try {
                await registerUser({ username, password, fio });
                navigate('/'); // Перенаправление на страницу логина после успешной регистрации
            } catch (error) {
                setError('Ошибка регистрации: ' + (error.response?.data?.error || error.message));
            }
        } else {
            setError('Заполните все поля');
        }
    };

    return (
        <div className='login-container'>
            <div className="img-container"><img src={Image} width={200} height={200} alt="Logo" /></div>
            <form onSubmit={handleSubmit} className='login-form'>
                <h3 className="h-elem">Регистрация</h3>
                <input
                    className="input-form"
                    type="text"
                    placeholder="ФИО"
                    value={fio}
                    onChange={(e) => setFio(e.target.value)}
                />
                <input
                    className="input-form"
                    type="text"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="input-form"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="submit-btn" type="submit">Зарегистрироваться</button>
            </form>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default RegisterPage;
