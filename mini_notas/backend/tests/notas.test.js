const request = require('supertest');
const app = require('../app');

describe('API /api/notas', () => {
  let notaCreada = null;
  const fechaTest = '2025-04-15';

  it('GET debe devolver un array de notas', async () => {
    const response = await request(app).get('/api/notas');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST debe crear una nueva nota con fecha_asignada', async () => {
    const response = await request(app)
      .post('/api/notas')
      .send({ texto: 'Nota de prueba', fecha_asignada: fechaTest });

    expect(response.statusCode).toBe(201);
    expect(response.body.texto).toBe('Nota de prueba');
    expect(response.body.fecha_asignada.slice(0, 10)).toBe(fechaTest);
    expect(response.body.id).toBeDefined();

    notaCreada = response.body;
  });

  it('PUT debe editar la nota creada', async () => {
    const response = await request(app)
      .put(`/api/notas/${notaCreada.id}`)
      .send({ texto: 'Nota editada' });

    expect(response.statusCode).toBe(200);
    expect(response.body.texto).toBe('Nota editada');
  });

  it('GET con fecha debe devolver la nota editada', async () => {
    const response = await request(app).get(`/api/notas?fecha=${fechaTest}`);
    expect(response.statusCode).toBe(200);
    const encontrada = response.body.find(n => n.id === notaCreada.id);
    expect(encontrada).toBeDefined();
    expect(encontrada.texto).toBe('Nota editada');
  });

  it('DELETE debe eliminar la nota creada', async () => {
    const response = await request(app).delete(`/api/notas/${notaCreada.id}`);
    expect(response.statusCode).toBe(204);
  });
});
