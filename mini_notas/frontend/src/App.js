import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App({ signOut, user }) {
  return (
    <div className="App">
      <h1>Bienvenido {user.username}</h1>
      <button onClick={signOut}>Cerrar sesión</button>
    </div>
  );
}

export default withAuthenticator(App);
