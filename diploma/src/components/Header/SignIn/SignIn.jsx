import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Form.module.css';
import { useAuth } from '../../../hooks/AuthContext';

const SignIn = () => {
  const { setLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add this line to track loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when request starts
    try {
      const response = await fetch('http://localhost:8080/api/registration/login-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setLoggedIn(true);
        navigate('/account');
      } else {
        setError(data.message || 'Неправильный логин или пароль. Попробуйте снова');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false); // Set loading to false when request is completed
    }
  };

  return (
    <div className={styles.form}>
      <h2 className="pb-3">Вход в аккаунт</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">Логин (E-mail):</label>
          <input
            type="text"
            id="login"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
            disabled={isLoading} // Disable input fields when loading
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading} // Disable input fields when loading
          />
        </div>
        <button disabled={isLoading}> {/* Disable the button when loading */}
          {isLoading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
