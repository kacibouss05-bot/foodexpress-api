import express from "express";
import Joi from 'joi';
import {
  createMenu,
  getAllMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
} from "../controllers/MenuController.js";
import validate from '../middleware/validate.js';

const router = express.Router();

const menuSchema = Joi.object({
  restaurant_id: Joi.string().hex().length(24).required(),
  name: Joi.string().trim().min(2).required(),
  description: Joi.string().trim().min(3).required(),
  price: Joi.number().positive().precision(2).required(),
  category: Joi.string().trim().min(2).required(),
});

const menuUpdateSchema = menuSchema.fork(
  ['restaurant_id', 'name', 'description', 'price', 'category'],
  (field) => field.optional()
).min(1);

/**
 * @swagger
 * tags:
 *   name: Menus
 *   description: Menu management
 * components:
 *   schemas:
 *     MenuInput:
 *       type: object
 *       required: [restaurant_id, name, description, price, category]
 *       properties:
 *         restaurant_id:
 *           type: string
 *           example: "665f1c2b3a4d5e6f78901234"
 *         name:
 *           type: string
 *           example: Burger menu
 *         description:
 *           type: string
 *           example: Burger, fries, and drink
 *         price:
 *           type: number
 *           example: 12.99
 *         category:
 *           type: string
 *           example: fast-food
 */

/**
 * @swagger
 * /api/menus:
 *   get:
 *     summary: List menus
 *     tags: [Menus]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: sort
 *         schema: { type: string, enum: [price, category], default: category }
 *       - in: query
 *         name: order
 *         schema: { type: string, enum: [asc, desc], default: asc }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Paginated menus
 *   post:
 *     summary: Create a menu
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuInput'
 *     responses:
 *       201:
 *         description: Menu created
 */
router.get("/", getAllMenus);
router.post("/", validate(menuSchema), createMenu);

/**
 * @swagger
 * /api/menus/{id}:
 *   get:
 *     summary: Get one menu
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Menu details
 *       404:
 *         description: Menu not found
 *   put:
 *     summary: Update a menu
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Menu updated
 *   delete:
 *     summary: Delete a menu
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Menu deleted
 */
router.get("/:id", getMenuById);
router.put("/:id", validate(menuUpdateSchema), updateMenu);
router.delete("/:id", deleteMenu);

export default router;
