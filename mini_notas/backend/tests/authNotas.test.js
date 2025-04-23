const request = require('supertest');
const app = require('../app');

describe('Flujo completo de autenticación + notas', () => {
  const usuario = {
    email: 'testuser@example.com',
    password: '1234'
  };

  const fechaTest = '2025-04-15';
  let token = null;
  let notaCreada = null;

  it('Registro del usuario', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(usuario);

    // Puede ser 200 si ya existe, o 201 o 400 por mail ya registrado
    expect([200, 201, 400]).toContain(res.statusCode);
  });

  it('Login del usuario', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send(usuario);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('POST debe crear una nueva nota con el token', async () => {
    const res = await request(app)
      .post('/api/notas')
      .set('Authorization', `Bearer ${token}`)
      .send({ texto: 'Nota protegida', fecha_asignada: fechaTest });

    expect(res.statusCode).toBe(201);
    expect(res.body.texto).toBe('Nota protegida');
    expect(res.body.fecha_asignada.slice(0, 10)).toBe(fechaTest);
    notaCreada = res.body;
  });

  it('GET con fecha y token debe devolver la nota', async () => {
    const res = await request(app)
      .get(`/api/notas?fecha=${fechaTest}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    const encontrada = res.body.find(n => n.id === notaCreada.id);
    expect(encontrada).toBeDefined();
    expect(encontrada.texto).toBe('Nota protegida');
  });

  it('DELETE debe eliminar la nota creada', async () => {
    const res = await request(app)
      .delete(`/api/notas/${notaCreada.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
