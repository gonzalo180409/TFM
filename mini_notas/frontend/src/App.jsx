import React from 'react';
import { useEffect, useState } from 'react';

function App() {

  const API_BASE = 'http://localhost:3001/api/notas'; // usa el nombre del servicio Docker

  const [notas, setNotas] = useState([]);
  const [texto, setTexto] = useState('');

  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => setNotas(data));
  }, []);

  const agregarNota = () => {
    fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto })
    })
      .then(res => res.json())
      .then(nueva => setNotas([...notas, nueva]));
    setTexto('');
  };

  const eliminarNota = (id) => {
    fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
      .then(() => setNotas(notas.filter(n => n.id !== id)));
  };

  return (
    <div>
      <h1>MiniNotas</h1>
      <input value={texto} onChange={e => setTexto(e.target.value)} placeholder="Escribe una nota" />
      <button onClick={agregarNota}>Agregar</button>
      <ul>
        {notas.map(n => (
          <li key={n.id}>{n.texto} <button onClick={() => eliminarNota(n.id)}>X</button></li>
        ))}
      </ul>
    </div>
  );
}

export default App;