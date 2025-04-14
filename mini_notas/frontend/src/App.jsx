import React, { useEffect, useState } from 'react';

function App() {
  const API_BASE = 'http://localhost:3001/api/notas';
  const token = localStorage.getItem('token');

  const [notas, setNotas] = useState([]);
  const [texto, setTexto] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoTexto, setNuevoTexto] = useState('');
  const [diaSeleccionado, setDiaSeleccionado] = useState(getHoy());
  const [diasConNotas, setDiasConNotas] = useState([]);

  function getHoy() {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  }

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}?fecha=${diaSeleccionado}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setNotas(data));
  }, [diaSeleccionado]);

  const cargarDiasConNotas = () => {
    fetch(`${API_BASE}/fechas`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setDiasConNotas(data));
  };

  useEffect(() => {
    if (token) {
      cargarDiasConNotas();
    }
  }, []);

  const agregarNota = () => {
    fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ texto, fecha_asignada: diaSeleccionado })
    })
      .then(res => res.json())
      .then(nueva => {
        setNotas(prev => [...prev, nueva]);
        cargarDiasConNotas();
      });
    setTexto('');
  };

  const eliminarNota = (id) => {
    fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(() => {
      setNotas(prev => prev.filter(n => n.id !== id));
      cargarDiasConNotas();
    });
  };

  const empezarEdicion = (nota) => {
    setEditandoId(nota.id);
    setNuevoTexto(nota.texto);
  };

  const guardarEdicion = (id) => {
    fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
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
    const mes = 7;
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
      <button onClick={() => {
        localStorage.removeItem('token');
        window.location.reload();
      }}>
        Cerrar sesión
      </button>

      <h3>Selecciona un día</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
        {generarDias().map((dia) => (
          <button
            key={dia}
            onClick={() => setDiaSeleccionado(dia)}
            style={{
              padding: '8px',
              backgroundColor:
                dia === diaSeleccionado
                  ? '#a2d2ff'
                  : diasConNotas.includes(dia)
                    ? '#b4f8c8'
                    : '#eee',
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
