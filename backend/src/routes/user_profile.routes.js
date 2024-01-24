import { Router } from 'express';
const router = Router()
import {create, findById, update, getUserProfileById} from '../controllers/user_profile.controller.js';

// Create a new userProfile
router.post('/', create);

// Retrieve a single userProfile with id
router.get('/', findById);

// Update a userProfile with id
router.put('/', update);

router.get('/:id', getUserProfileById);

export default router
