import request from 'supertest';
import app from '../src/app.js';

describe('menus routes', () => {
  test('rejects invalid menu payloads', async () => {
    const response = await request(app)
      .post('/api/menus')
      .send({
        restaurant_id: 'bad-id',
        name: 'B',
        description: 'ok',
        price: -1,
        category: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation error');
  });

  test('rejects invalid menu ids before database access', async () => {
    const response = await request(app).get('/api/menus/not-a-valid-id');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid menu id');
  });
});
