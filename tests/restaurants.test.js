import request from 'supertest';
import app from '../src/app.js';

describe('restaurants routes', () => {
  test('rejects invalid restaurant payloads', async () => {
    const response = await request(app)
      .post('/api/restaurants')
      .send({ name: 'A' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation error');
  });

  test('rejects invalid restaurant ids before database access', async () => {
    const response = await request(app).get('/api/restaurants/not-a-valid-id');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid restaurant id');
  });
});
