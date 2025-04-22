import React, { useState } from 'react';

function Login({ onLogin, onIrARegistro }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          onLogin(); // 🟢 Trigger para recargar App.jsx
        } else {
          setError('Credenciales inválidas');
        }
      });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Iniciar sesión</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo" />
      <br />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
      <br />
      <button onClick={handleLogin}>Entrar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={onIrARegistro} style={{ marginTop: '1rem' }}>
        ¿No tienes cuenta? Regístrate
      </button>
    </div>
  );
}

export default Login;
