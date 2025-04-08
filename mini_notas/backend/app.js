const express = require('express');
const cors = require('cors');
const notasRouter = require('./routes/notas');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/notas', notasRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});