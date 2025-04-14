import React, { useState } from 'react';

function Registro({ onVolverLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleRegistro = () => {
    fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setMensaje('✅ Usuario creado. Ahora puedes iniciar sesión');
          setError('');
        } else {
          setError('El registro ha fallado.');
          setMensaje('');
        }
      });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Registro</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo" />
      <br />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
      <br />
      <button onClick={handleRegistro}>Registrarse</button>
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={onVolverLogin} style={{ marginTop: '1rem' }}>
        Volver al login
      </button>
    </div>
  );
}

export default Registro;
