import React, { useState } from 'react';
import './LoginRegister.css';
import { useNavigate } from 'react-router-dom';


const LoginRegister = () => {
    const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    PhoneNumber: '',
    dob: '',
    age: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!isLogin) {
    // Registration submission
    try {
      const response = await fetch('http://localhost:8081/SaveNewUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

     const result = await response.text(); 
console.log('Registration successful:', result);

      // Redirect to home
      navigate('/');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed');
    }
  } else {
    // Login form logic (optional — leave blank or handle separately)
    console.log('Login form submitted (no backend logic yet)');
  }
};


  const handleOAuthLogin = (provider) => {
    console.log(`${provider} login clicked`);
    // Handle OAuth login
  };

  return (
    <div className="auth-container">
      {/* Background Elements */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>
      
      <div className="auth-card">
        {/* Toggle Buttons */}
        <div className="auth-toggle">
          <button 
            className={`toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={`toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
          <div className={`toggle-indicator ${isLogin ? 'left' : 'right'}`}></div>
        </div>

        {/* Form Container */}
        <div className="form-container">
          <div className={`form-wrapper ${isLogin ? 'show-login' : 'show-register'}`}>
            
            {/* Login Form */}
            <div className="form login-form">
              <div className="form-header">
                <h2>Welcome Back! 👋</h2>
                <p>Ready to dive back in?</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <div className="input-wrapper">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="input-icon">📧</span>
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-wrapper">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="input-icon">🔒</span>
                  </div>
                </div>

                <div className="form-options">
                  <label className="checkbox-container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>

                <button type="submit" className="submit-btn">
                  <span>Sign In</span>
                  <div className="btn-glow"></div>
                </button>
              </form>

              <div className="divider">
                <span>or continue with</span>
              </div>

              <div className="oauth-buttons">
                <button 
                  className="oauth-btn google-btn"
                  onClick={() => handleOAuthLogin('Google')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 6.54c1.62 0 3.07.56 4.22 1.65l3.16-3.16C17.46 3.34 14.97 2.36 12 2.36 7.7 2.36 3.99 4.83 2.18 7.93l2.85 2.22C6.71 8.47 9.14 6.54 12 6.54z"/>
                  </svg>
                  <span>Google</span>
                </button>
                {/* You can add more OAuth buttons here */}
              </div>
            </div>

            {/* Register Form */}
            <div className="form register-form">
              <div className="form-header">
                <h2>Join Us! 🚀</h2>
                <p>Create your account</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="input-icon">👤</span>
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-wrapper">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="input-icon">📧</span>
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-wrapper">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="input-icon">🔒</span>
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-wrapper">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <span className="input-icon">📱</span>
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-wrapper">
                    <input
                      type="date"
                      name="dob"
                      placeholder="Date of Birth"
                      value={formData.dob}
                      onChange={handleInputChange}
                    />
                    <span className="input-icon">🎂</span>
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-wrapper">
                    <input
                      type="number"
                      name="age"
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleInputChange}
                    />
                    <span className="input-icon">🔢</span>
                  </div>
                </div>

                <button type="submit" className="submit-btn">
                  <span>Register</span>
                  <div className="btn-glow"></div>
                </button>
              </form>

              <div className="divider">
                <span>or continue with</span>
              </div>

              <div className="oauth-buttons">
                <button 
                  className="oauth-btn google-btn"
                  onClick={() => handleOAuthLogin('Google')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 6.54c1.62 0 3.07.56 4.22 1.65l3.16-3.16C17.46 3.34 14.97 2.36 12 2.36 7.7 2.36 3.99 4.83 2.18 7.93l2.85 2.22C6.71 8.47 9.14 6.54 12 6.54z"/>
                  </svg>
                  <span>Google</span>
                </button>
                {/* You can add more OAuth buttons here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;