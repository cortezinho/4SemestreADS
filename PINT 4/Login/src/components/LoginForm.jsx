import React from 'react';
import { LogIn } from 'lucide-react';
import '../styles/main.css';

const LoginForm = ({ formData, setFormData, handleSubmit, isLogin, handleFormToggle }) => {

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">

            <div className="form-group">
                <label htmlFor="username">
                    Usuário:
                </label>
                <input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder=""
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">
                    Senha:
                </label>
                <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder=""
                />
            </div>

            {/* Campo Confirmar Senha só aparece no MODO CADASTRO */}
            {!isLogin && (
                <div className="form-group">
                    <label htmlFor="confirmPassword">
                        Confirme sua senha:
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder=""
                    />
                </div>
            )}

            {/* Link Esqueceu a Senha só aparece no MODO LOGIN */}
            {isLogin && (
                <div className="flex justify-end pt-2">
                    <a
                        href="#"
                        className="forgot-password"
                        onClick={(e) => e.preventDefault()}
                    >
                        esqueceu a senha?
                    </a>
                </div>
            )}

            <div className="pt-4">
                <button
                    type="submit"
                    className="login-button"
                >
                    <LogIn className="w-5 h-5 mr-2" />
                    {isLogin ? 'LOGIN' : 'CADASTRAR'}
                </button>
            </div>

            <div className="pt-4 text-center">
                <a
                    href="#"
                    className="register-link"
                    onClick={handleFormToggle} // Alterna o formulário
                >
                    {isLogin ? 'cadastre-se' : 'já possui uma conta?'}
                </a>
            </div>
        </form>
    );
};

export default LoginForm;
