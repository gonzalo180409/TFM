import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

export default function MyCalendar() {
  const [value, setValue] = useState(new Date());
  const [notaVisible, setNotaVisible] = useState(false);
  const [nota, setNota] = useState('');

  const handleAddNote = () => {
    setNotaVisible(true);
    console.log(`Añadir nota para ${value.toLocaleDateString()}`);
  };

  // Resetear el input de nota si cambia el día seleccionado
  useEffect(() => {
    setNota('');
    setNotaVisible(false);
  }, [value]);

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Calendario de Notas</h2>
      <Calendar
        onChange={setValue}
        value={value}
        className="custom-calendar"
      />
      <p className="selected-date">
        Día seleccionado: <strong>{value.toLocaleDateString()}</strong>
      </p>

      {!notaVisible && (
        <button className="add-note-btn" onClick={handleAddNote}>
          ➕ Añadir Nota
        </button>
      )}

      {notaVisible && (
        <div style={{ marginTop: '1rem' }}>
          <input
            type="text"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Escribe tu nota..."
            style={{
              padding: '0.5rem',
              width: '100%',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '0.5rem'
            }}
          />
          <button
            className="add-note-btn"
            onClick={() => console.log(`Nota escrita para ${value.toLocaleDateString()}: ${nota}`)}
          >
            💾 Guardar (mock)
          </button>
        </div>
      )}
    </div>
  );
}
