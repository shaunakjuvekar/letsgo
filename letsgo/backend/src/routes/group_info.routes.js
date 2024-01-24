import { Router } from 'express';
import { create, findById, findByGroupDetail, deleteGroup, findByUserGroupDetail, createGroup, findByUserID, findByIdGet } from '../controllers/group_info.controller.js';
const router = Router()
router.delete('/delete/:groupId', deleteGroup)
router.post('/', create);
router.post('/user', createGroup);
router.get('/', findById);
router.get('/:id',findByIdGet);
router.get('/detail/:groupId', findByGroupDetail);
router.get('/user/:groupId', findByUserGroupDetail);
router.get('/find/:userId',findByUserID);

export default router


