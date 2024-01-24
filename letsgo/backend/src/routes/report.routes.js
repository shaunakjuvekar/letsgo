import { Router } from 'express';
const router = Router()
import { findAll, create } from '../controllers/report.controller.js';

router.get('/', findAll);
router.post('/', create);

export default router
