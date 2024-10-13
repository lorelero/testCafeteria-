
const request = require('supertest');
const server = require('../index');

describe('Operaciones CRUD de cafes', () => {
  it('GET /cafes - Obteniendo un 200 y un arreglo con por lo menos 1 objeto', async () => {
    const { body: cafes, statusCode } = await request(server)
      .get('/cafes')
      .send();

    expect(statusCode).toBe(200);
    expect(cafes).toBeInstanceOf(Array);
    expect(cafes.length).toBeGreaterThan(0);
    expect(cafes[0]).toBeInstanceOf(Object);
  });
});

  describe('DELETE /cafes/:id', () => {
    it('debería devolver un status code 404 si el id no existe', async () => {
    const jwt = 'token';
    const deleteCafeId = 5;
    const { statusCode } = await request(server)
      .delete(`/cafes/${deleteCafeId}`)
      .set('Authorization', jwt)
      .send();

    expect(statusCode).toBe(404);
  });
});

  describe('POST /cafes', () => {
    it('debería agregar un nuevo café y devolver un status code 201', async () => {
        const nuevoCafe = { nombre: 'Café Mocha', descripcion: 'Delicioso café con chocolate' };
        const response = await request(app).post('/cafes').send(nuevoCafe);
        expect(response.status).toBe(201);
        expect(response.body.nombre).toBe(nuevoCafe.nombre);
    });
});
  
describe('PUT /cafes/:id', () => {
  it('debería devolver un status code 400 si los ids no coinciden', async () => {
        const cafeActualizado = { id: 1, nombre: 'Café Latte', descripcion: 'Café con leche' };
        const response = await request(app).put('/cafes/2').send(cafeActualizado);
        expect(response.status).toBe(400);
    });
});
