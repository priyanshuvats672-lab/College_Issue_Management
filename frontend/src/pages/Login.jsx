import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(form);
            navigate('/issue');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
            setForm({ email: '', password: '' });
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }

                .auth-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px 16px;
                    font-family: 'Inter', system-ui, sans-serif;
                }

                .auth-card {
                    background: #ffffff;
                    border-radius: 24px;
                    box-shadow: 0 4px 24px rgba(34,197,94,0.10), 0 1px 4px rgba(0,0,0,0.06);
                    border: 1px solid #bbf7d0;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    overflow: hidden;
                    width: 100%;
                    max-width: 900px;
                    min-height: 520px;
                }

                @media (max-width: 700px) {
                    .auth-card { grid-template-columns: 1fr; }
                    .auth-panel { display: none; }
                }

                .auth-form-section {
                    padding: 48px 44px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 8px;
                }

                .auth-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 28px;
                }

                .auth-logo-icon {
                    width: 38px; height: 38px;
                    background: linear-gradient(135deg, #16a34a, #22c55e);
                    border-radius: 10px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 20px;
                    flex-shrink: 0;
                    box-shadow: 0 2px 8px rgba(34,197,94,0.3);
                }

                .auth-logo-name {
                    font-size: 16px;
                    font-weight: 700;
                    color: #15803d;
                    letter-spacing: -0.3px;
                }

                .auth-heading {
                    font-size: 26px;
                    font-weight: 800;
                    color: #14532d;
                    letter-spacing: -0.5px;
                }

                .auth-subtext {
                    font-size: 14px;
                    color: #6b7280;
                    margin-top: 4px;
                    margin-bottom: 20px;
                }

                .auth-subtext a {
                    color: #16a34a;
                    font-weight: 600;
                    text-decoration: none;
                    transition: color 0.15s;
                }
                .auth-subtext a:hover { color: #15803d; text-decoration: underline; }

                .auth-error {
                    background: #fef2f2;
                    border: 1px solid #fecaca;
                    border-radius: 10px;
                    padding: 10px 14px;
                    color: #dc2626;
                    font-size: 13px;
                    font-weight: 500;
                    margin-bottom: 8px;
                }

                .auth-form { display: flex; flex-direction: column; gap: 16px; }

                .form-group { display: flex; flex-direction: column; gap: 6px; position: relative; }

                .form-label {
                    font-size: 13px;
                    font-weight: 600;
                    color: #374151;
                }

                .form-input {
                    background: #f9fafb;
                    border: 1.5px solid #d1fae5;
                    border-radius: 10px;
                    padding: 10px 14px;
                    font-size: 14px;
                    color: #111827;
                    outline: none;
                    transition: border-color 0.18s, box-shadow 0.18s;
                    font-family: inherit;
                    width: 100%;
                }
                .form-input::placeholder { color: #9ca3af; }
                .form-input:focus {
                    border-color: #22c55e;
                    background: #fff;
                    box-shadow: 0 0 0 3px rgba(34,197,94,0.12);
                }

                .pw-toggle {
                    position: absolute; top: 30px; right: 12px;
                    background: none; border: none;
                    cursor: pointer; padding: 2px;
                    color: #9ca3af;
                    display: flex; align-items: center;
                    transition: color 0.15s;
                }
                .pw-toggle:hover { color: #16a34a; }

                .form-row {
                    display: flex; align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .remember-label {
                    display: flex; align-items: center; gap: 8px;
                    font-size: 13px; color: #6b7280; cursor: pointer;
                }

                .remember-box {
                    width: 16px; height: 16px;
                    border: 1.5px solid #86efac;
                    border-radius: 4px;
                    background: #fff;
                    appearance: none;
                    cursor: pointer;
                    transition: background 0.15s, border-color 0.15s;
                    flex-shrink: 0;
                }
                .remember-box:checked {
                    background: #22c55e;
                    border-color: #22c55e;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 12 10' fill='none' stroke='white' strokeWidth='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 5l3 3 7-7'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: center;
                }

                .forgot-link {
                    font-size: 13px;
                    color: #16a34a;
                    font-weight: 500;
                    text-decoration: none;
                }
                .forgot-link:hover { text-decoration: underline; }

                .submit-btn {
                    background: linear-gradient(135deg, #16a34a, #22c55e);
                    border: none;
                    border-radius: 10px;
                    padding: 12px;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    width: 100%;
                    margin-top: 4px;
                    transition: opacity 0.18s, transform 0.18s, box-shadow 0.18s;
                    box-shadow: 0 4px 12px rgba(34,197,94,0.3);
                    letter-spacing: 0.02em;
                    font-family: inherit;
                    display: flex; align-items: center; justify-content: center; gap: 6px;
                }
                .submit-btn:hover:not(:disabled) {
                    opacity: 0.93;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 18px rgba(34,197,94,0.38);
                }
                .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

                .btn-spinner {
                    width: 15px; height: 15px;
                    border: 2px solid rgba(255,255,255,0.4);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }

                /* Right panel */
                .auth-panel {
                    background: linear-gradient(145deg, #16a34a 0%, #15803d 50%, #166534 100%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 48px 36px;
                    gap: 24px;
                    position: relative;
                    overflow: hidden;
                }

                .auth-panel::before {
                    content: '';
                    position: absolute;
                    top: -60px; right: -60px;
                    width: 220px; height: 220px;
                    background: rgba(255,255,255,0.07);
                    border-radius: 50%;
                }
                .auth-panel::after {
                    content: '';
                    position: absolute;
                    bottom: -40px; left: -40px;
                    width: 160px; height: 160px;
                    background: rgba(255,255,255,0.07);
                    border-radius: 50%;
                }

                .auth-panel-img {
                    width: 80%;
                    max-width: 260px;
                    aspect-ratio: 1;
                    object-fit: contain;
                    position: relative;
                    z-index: 1;
                    filter: drop-shadow(0 8px 20px rgba(0,0,0,0.2));
                }

                .auth-panel-text {
                    text-align: center;
                    position: relative;
                    z-index: 1;
                }

                .auth-panel-text h2 {
                    font-size: 20px;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 6px;
                }

                .auth-panel-text p {
                    font-size: 13px;
                    color: rgba(255,255,255,0.7);
                    line-height: 1.6;
                }
            `}</style>

            <div className="auth-page">
                <div className="auth-card">
                    {/* Form section */}
                    <div className="auth-form-section">
                        <div className="auth-logo">
                            <div className="auth-logo-icon">🏫</div>
                            <span className="auth-logo-name">CollegeIssue</span>
                        </div>

                        <h1 className="auth-heading">Welcome back</h1>
                        <p className="auth-subtext">
                            Don't have an account? <Link to="/register">Register here</Link>
                        </p>

                        {error && <div className="auth-error">{error}</div>}

                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="password">Password</label>
                                <button
                                    type="button"
                                    id="togglePassword"
                                    className="pw-toggle"
                                    onClick={() => setIsVisible(v => !v)}
                                    aria-label={isVisible ? 'Hide password' : 'Show password'}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 128 128" fill="currentColor">
                                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"/>
                                        {!isVisible && <path d="M15 15l98 98" stroke="currentColor" strokeWidth="10" strokeLinecap="round" fill="none"/>}
                                    </svg>
                                </button>
                                <input
                                    id="password"
                                    name="password"
                                    type={isVisible ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    required
                                    value={form.password}
                                    onChange={handleChange}
                                    className="form-input"
                                    style={{ paddingRight: 38 }}
                                />
                            </div>

                            <div className="form-row">
                                <label className="remember-label">
                                    <input id="remember" name="remember" type="checkbox" className="remember-box" />
                                    Remember me
                                </label>
                                <a href="#" className="forgot-link">Forgot password?</a>
                            </div>

                            <button type="submit" id="login-submit" className="submit-btn" disabled={loading}>
                                {loading ? <span className="btn-spinner" /> : 'Sign in'}
                            </button>
                        </form>
                    </div>

                    {/* Right panel */}
                    <div className="auth-panel">
                        <img src="https://readymadeui.com/signin-image.webp" className="auth-panel-img" alt="sign-in illustration" />
                        <div className="auth-panel-text">
                            <h2>Report & Resolve</h2>
                            <p>Submit campus issues and track their resolution — all in one place.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;