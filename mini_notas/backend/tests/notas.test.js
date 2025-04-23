const request = require('supertest');
const app = require('../app');

describe('API /api/notas con autenticación', () => {
  let token;
  let notaCreada = null;
  const fechaTest = '2025-04-15';
  const emailTest = 'test@example.com';
  const passwordTest = '1234';

  beforeAll(async () => {
    // Registrar usuario
    await request(app)
      .post('/api/auth/register')
      .send({ email: emailTest, password: passwordTest });

    // Login y guardar token
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: emailTest, password: passwordTest });

    token = res.body.token;
  });

  it('GET debe devolver un array de notas', async () => {
    const response = await request(app)
      .get('/api/notas')
      .set('Authorization', `Bearer ${token}`);
      
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST debe crear una nueva nota con fecha_asignada', async () => {
    const response = await request(app)
      .post('/api/notas')
      .set('Authorization', `Bearer ${token}`)
      .send({ texto: 'Nota de prueba', fecha_asignada: fechaTest });

    expect(response.statusCode).toBe(201);
    expect(response.body.texto).toBe('Nota de prueba');
    expect(response.body.fecha_asignada.slice(0, 10)).toBe(fechaTest);
    expect(response.body.id).toBeDefined();

    notaCreada = response.body;
  });

  it('GET /fechas debe incluir la fecha asignada a la nota creada', async () => {
    const response = await request(app)
      .get('/api/notas/fechas')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain(fechaTest);
  });

  it('PUT debe editar la nota creada', async () => {
    const response = await request(app)
      .put(`/api/notas/${notaCreada.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ texto: 'Nota editada' });

    expect(response.statusCode).toBe(200);
    expect(response.body.texto).toBe('Nota editada');
  });

  it('GET con fecha debe devolver la nota editada', async () => {
    const response = await request(app)
      .get(`/api/notas?fecha=${fechaTest}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    const encontrada = response.body.find(n => n.id === notaCreada.id);
    expect(encontrada).toBeDefined();
    expect(encontrada.texto).toBe('Nota editada');
  });

  it('DELETE debe eliminar la nota creada', async () => {
    const response = await request(app)
      .delete(`/api/notas/${notaCreada.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
  });

  it('GET /fechas NO debe incluir la fecha si se eliminó la única nota', async () => {
    const response = await request(app)
      .get('/api/notas/fechas')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toContain(fechaTest);
  });
});
