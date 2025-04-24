import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import MyCalendar from './Calendar';
import './App.css';

function App({ signOut, user }) {
  return (
    <div className="app-container">
      <h1 className="welcome-title">Bienvenido {user.username}</h1>
      <button className="signout-btn" onClick={signOut}>Cerrar sesión</button>
      <MyCalendar />
    </div>
  );
}

export default withAuthenticator(App);
