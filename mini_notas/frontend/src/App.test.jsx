import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('muestra el título principal', () => {
    render(<App />);
    expect(screen.getByText(/MiniNotas por Día/i)).toBeInTheDocument();
  });

  it('muestra el input para añadir notas', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/Escribe una nota/i)).toBeInTheDocument();
  });
});
