const express = require('express');
const router = express.Router();

let notas = [];
let id = 1;

router.get('/', (req, res) => {
  res.json(notas);
});

router.post('/', (req, res) => {
  const { texto } = req.body;
  if (!texto) return res.status(400).json({ error: 'Texto requerido' });

  const nuevaNota = { id: id++, texto };
  notas.push(nuevaNota);
  res.status(201).json(nuevaNota);
});

router.delete('/:id', (req, res) => {
  const notaId = parseInt(req.params.id);
  notas = notas.filter(n => n.id !== notaId);
  res.status(204).end();
});

module.exports = router;