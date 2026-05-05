import express from 'express';
import Joi from 'joi';
import {
  createRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
} from '../controllers/RestaurantController.js';
import validate from '../middleware/validate.js';

const router = express.Router();

const restaurantSchema = Joi.object({
  name: Joi.string().trim().min(2).required(),
  address: Joi.string().trim().min(3).required(),
  phone: Joi.string().trim().min(6).required(),
  opening_hours: Joi.string().trim().min(3).required(),
});

const restaurantUpdateSchema = restaurantSchema.fork(
  ['name', 'address', 'phone', 'opening_hours'],
  (field) => field.optional()
).min(1);

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: Restaurant management
 * components:
 *   schemas:
 *     RestaurantInput:
 *       type: object
 *       required: [name, address, phone, opening_hours]
 *       properties:
 *         name:
 *           type: string
 *           example: FoodExpress Paris
 *         address:
 *           type: string
 *           example: 12 Rue Example, Paris
 *         phone:
 *           type: string
 *           example: "+33123456789"
 *         opening_hours:
 *           type: string
 *           example: "09:00-22:00"
 *     Restaurant:
 *       allOf:
 *         - $ref: '#/components/schemas/RestaurantInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 */

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: List restaurants
 *     tags: [Restaurants]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: sort
 *         schema: { type: string, enum: [name, address], default: name }
 *       - in: query
 *         name: order
 *         schema: { type: string, enum: [asc, desc], default: asc }
 *     responses:
 *       200:
 *         description: Paginated restaurants
 *   post:
 *     summary: Create a restaurant
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantInput'
 *     responses:
 *       201:
 *         description: Restaurant created
 */
router.get('/', getAllRestaurants);
router.post('/', validate(restaurantSchema), createRestaurant);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   get:
 *     summary: Get one restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Restaurant details
 *       404:
 *         description: Restaurant not found
 *   put:
 *     summary: Update a restaurant
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Restaurant updated
 *   delete:
 *     summary: Delete a restaurant
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Restaurant deleted
 */
router.get('/:id', getRestaurantById);
router.put('/:id', validate(restaurantUpdateSchema), updateRestaurant);
router.delete('/:id', deleteRestaurant);

export default router;
