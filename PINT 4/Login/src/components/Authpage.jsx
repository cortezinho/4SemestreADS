import React, { useState } from 'react';
import LoginForm from './LoginForm';
import '../styles/main.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log('Tentativa de Login:', { username: formData.username, password: formData.password });
        } else {
            if (formData.password !== formData.confirmPassword) {
                console.error('As senhas não coincidem!');
                return;
            }
            console.log('Tentativa de Cadastro:', formData);
        }
    };

    const handleFormToggle = (e) => {
        e.preventDefault();
        setIsLogin(!isLogin);
        setFormData({ username: '', password: '', confirmPassword: '' });
    };

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <h2 className="welcome-title">
                    Bem-vindo ao bookscape!
                </h2>
                
                <p className="welcome-subtitle">
                    {isLogin ? 'Faça seu login' : 'Faça seu cadastro'}
                </p>

                <LoginForm 
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    isLogin={isLogin}
                    handleFormToggle={handleFormToggle}
                />
            </div>
        </div>
    );
};

export default AuthPage;