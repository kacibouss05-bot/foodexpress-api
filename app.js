import express from 'express';
import menuroute from './src/routes/menuroute.js';
import restaurantroute from './src/routes/restaurantroute.js';

const app = express();

app.use(express.json());
app.use('/api/menus', menuroute);
app.use('/api/restaurants', restaurantroute);

export default app;