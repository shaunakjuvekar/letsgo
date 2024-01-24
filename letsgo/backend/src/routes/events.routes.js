import { Router } from 'express';
const router = Router()
import { findAll, createUserEvents, findEventByUserProfileId } from '../controllers/events.controller.js';

router.get('/', findAll);

router.post('/create', createUserEvents);

router.get('/fetch', findEventByUserProfileId)

export default router
