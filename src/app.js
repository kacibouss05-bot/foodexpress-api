import express from 'express';
import swaggerUi from 'swagger-ui-express';
import menuRoute from './routes/menuroute.js';
import restaurantRoute from './routes/restaurantroute.js';
import swaggerSpec from './config/swagger.js';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/menus', menuRoute);
app.use('/api/restaurants', restaurantRoute);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal server error',
  });
});

export default app;
