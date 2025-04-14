const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las notas
router.get('/', async (req, res) => {
  const { fecha } = req.query;
  try {
    let result;
    if (fecha) {
      result = await db.query(
        'SELECT * FROM notas WHERE fecha_asignada = $1 ORDER BY id',
        [fecha]
      );
    } else {
      result = await db.query('SELECT * FROM notas ORDER BY id');
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener notas:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// Crear una nueva nota
router.post('/', async (req, res) => {
  const { texto, fecha_asignada } = req.body;
  if (!texto || texto.trim() === '') {
    return res.status(400).json({ error: 'Texto requerido' });
  }

  try {
    const result = await db.query(
      'INSERT INTO notas (texto, fecha, fecha_asignada) VALUES ($1, NOW(), $2) RETURNING *',
      [texto, fecha_asignada || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear nota:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// Eliminar una nota
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM notas WHERE id = $1', [req.params.id]);
    res.status(204).end();
  } catch (err) {
    console.error('Error al eliminar nota:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar una nota
router.put('/:id', async (req, res) => {
  const { texto } = req.body;
  const { id } = req.params;

  if (!texto || texto.trim() === '') {
    return res.status(400).json({ error: 'Texto requerido' });
  }

  try {
    const result = await db.query(
      'UPDATE notas SET texto = $1 WHERE id = $2 RETURNING *',
      [texto, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al editar nota:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

  // Obtener fechas únicas con notas
  router.get('/fechas', async (req, res) => {
    try {
      const result = await db.query(`
        SELECT DISTINCT TO_CHAR(fecha_asignada, 'YYYY-MM-DD') AS fecha
        FROM notas
        WHERE fecha_asignada IS NOT NULL
      `);

      const fechas = result.rows.map(row => row.fecha);
      res.json(fechas);
    } catch (err) {
      console.error('Error al obtener fechas con notas:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });



module.exports = router;
