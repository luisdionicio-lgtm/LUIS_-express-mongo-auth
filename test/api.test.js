import assert from 'node:assert/strict';
import { once } from 'node:events';
import { after, before, mock, test } from 'node:test';
import app from '../src/app.js';
import User from '../src/models/User.js';

let server;
let base;
before(async () => {
  server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  base = `http://127.0.0.1:${server.address().port}/api/users`;
});
after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

test('El modelo exige nombre y correo', () => {
  const error = new User({}).validateSync();
  assert.ok(error.errors.name);
  assert.ok(error.errors.email);
  assert.equal(new User({ name: 'Luis', email: 'luis@example.com' }).validateSync(), undefined);
});

test('GET /api/users devuelve los usuarios del repositorio', async () => {
  const users = [{ _id: '507f1f77bcf86cd799439011', name: 'Luis', email: 'luis@example.com' }];
  const stub = mock.method(User, 'find', async () => users);
  try {
    const response = await fetch(base);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), users);
  } finally { stub.mock.restore(); }
});

test('POST recibe JSON y devuelve el usuario creado con 201', async () => {
  const data = { name: 'Luis', email: 'luis@example.com' };
  const stub = mock.method(User, 'create', async (received) => {
    assert.deepEqual(received, data);
    return { ...received, _id: '507f1f77bcf86cd799439011' };
  });
  try {
    const response = await fetch(base, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    assert.equal(response.status, 201);
    assert.equal((await response.json()).email, data.email);
  } finally { stub.mock.restore(); }
});

test('Un usuario inexistente devuelve 404', async () => {
  const stub = mock.method(User, 'findById', async () => null);
  try {
    const response = await fetch(`${base}/507f1f77bcf86cd799439011`);
    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { message: 'User not found' });
  } finally { stub.mock.restore(); }
});

test('Un correo duplicado se transforma en 409 sin cerrar el servidor', async () => {
  const stub = mock.method(User, 'create', async () => {
    throw Object.assign(new Error('duplicate'), { code: 11000 });
  });
  try {
    const response = await fetch(base, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Luis', email: 'luis@example.com' })
    });
    assert.equal(response.status, 409);
    assert.deepEqual(await response.json(), { message: 'Email already exists' });
  } finally { stub.mock.restore(); }
});

test('JSON incorrecto devuelve 400', async () => {
  const response = await fetch(base, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{'
  });
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { message: 'Invalid JSON' });
});
