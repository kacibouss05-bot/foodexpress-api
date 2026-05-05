import express from 'express';
import { createRestaurant, deleteRestaurant, getAllRestaurants,getRestaurants, updateRestaurant } from '../controllers/restaurantController.js';

const router = express.Router();


router.post('/', createRestaurant);
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurants); 
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);