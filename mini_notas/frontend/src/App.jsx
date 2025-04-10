import React, { useEffect, useState } from 'react';

function App() {
  const API_BASE = 'http://localhost:3001/api/notas';

  const [notas, setNotas] = useState([]);
  const [texto, setTexto] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoTexto, setNuevoTexto] = useState('');
  const [diaSeleccionado, setDiaSeleccionado] = useState(getHoy());

  function getHoy() {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0]; // formato YYYY-MM-DD
  }

  // Cargar notas del día seleccionado
  useEffect(() => {
    fetch(`${API_BASE}?fecha=${diaSeleccionado}`)
      .then(res => res.json())
      .then(data => setNotas(data));
  }, [diaSeleccionado]);

  const agregarNota = () => {
    fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto, fecha_asignada: diaSeleccionado })
    })
      .then(res => res.json())
      .then(nueva => setNotas(prev => [...prev, nueva]));
    setTexto('');
  };

  const eliminarNota = (id) => {
    fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
      .then(() => setNotas(notas.filter(n => n.id !== id)));
  };

  const empezarEdicion = (nota) => {
    setEditandoId(nota.id);
    setNuevoTexto(nota.texto);
  };

  const guardarEdicion = (id) => {
    fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto: nuevoTexto })
    })
      .then(res => res.json())
      .then(actualizada => {
        setNotas(notas.map(n => (n.id === id ? actualizada : n)));
        setEditandoId(null);
        setNuevoTexto('');
      });
  };

  const generarDias = () => {
    const dias = [];
    const año = 2025;
    const mes = 7; // Julio → ¡ahora como número humano!
    for (let i = 1; i <= 31; i++) {
      const dia = i.toString().padStart(2, '0');
      const mesFormateado = mes.toString().padStart(2, '0');
      const fecha = `${año}-${mesFormateado}-${dia}`;
      dias.push(fecha);
    }
    return dias;
  };
  
    
  return (
    <div>
      <h1>MiniNotas por Día</h1>

      <h3>Selecciona un día</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
        {generarDias().map((dia) => (
          <button
            key={dia}
            onClick={() => setDiaSeleccionado(dia)}
            style={{
              padding: '8px',
              backgroundColor: dia === diaSeleccionado ? '#a2d2ff' : '#eee',
              border: '1px solid #ccc',
              cursor: 'pointer'
            }}
          >
            {new Date(dia).getDate()}
          </button>
        ))}
      </div>

      <h3>
        Notas para el {(() => {
          const [a, m, d] = diaSeleccionado.split('-');
          return `${d}-${m}-${a}`;
        })()}
      </h3>

      <input
        value={texto}
        onChange={e => setTexto(e.target.value)}
        placeholder="Escribe una nota"
      />
      <button onClick={agregarNota}>Agregar</button>

      <ul>
        {notas.map(n => (
          <li key={n.id}>
            {editandoId === n.id ? (
              <>
                <input
                  value={nuevoTexto}
                  onChange={e => setNuevoTexto(e.target.value)}
                />
                <button onClick={() => guardarEdicion(n.id)}>💾</button>
              </>
            ) : (
              <>
                {n.texto}
                <button onClick={() => empezarEdicion(n)}>✏️</button>
                <button onClick={() => eliminarNota(n.id)}>❌</button>
              </>
            )}
            <br />
            <small>Creada: {new Date(n.fecha).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
