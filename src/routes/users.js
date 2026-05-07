import {Router } from 'express';
import * as UserController from '../controllers/userController.js';
import {authenticate ,isAdmin} from '../middleware/auth.js';
const router = Router();
router.post('/',UserController.register);
router.post('/login',UserController.login);
router.get('/',authenticate,isAdmin,UserController.getUsers);
router.get('/:id',authenticate,UserController.getUser);
router.put('/:id',authenticate,UserController.updateUser);
router.delete('/:id',authenticate,UserController.deleteUser);

export default router; 