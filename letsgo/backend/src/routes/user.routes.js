import { Router } from 'express';
const router = Router()
import { check, create, login, logout } from '../controllers/user.controller.js';

// Create a new user
router.post('/', create);

// login
router.post('/login', login);

router.post('/logout', logout)

router.get('/check', check)

export default router
