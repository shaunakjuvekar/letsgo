import { Router } from 'express';
import { create, findById, findbySuggestedId, deleteFriendship } from '../controllers/friends.controller.js';
const router = Router()
router.delete('/delete/:userId/:friendId', deleteFriendship)
router.get('/', findById);
router.get('/suggested', findbySuggestedId);
router.post('/suggestedOne', create);


export default router
