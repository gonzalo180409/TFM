import React, { useState } from 'react';
import App from './App';
import Login from './Login';
import Registro from './Registro';

function AppWrapper() {
  const [pantalla, setPantalla] = useState(
    localStorage.getItem('token') ? 'app' : 'login'
  );

  if (pantalla === 'login') {
    return <Login onLogin={() => setPantalla('app')} onIrARegistro={() => setPantalla('registro')} />;
  }

  if (pantalla === 'registro') {
    return <Registro onVolverLogin={() => setPantalla('login')} />;
  }

  return <App />;
}

export default AppWrapper;
