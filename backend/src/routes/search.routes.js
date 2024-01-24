import { Router } from 'express';
const router = Router();

import { 
    searchAll,
    searchDestinations, 
    searchGroups, 
    searchUsers 
} from '../controllers/search.controller.js';

// Search All
router.get('/', searchAll);

// Search Destinations
router.get('/destinations', searchDestinations);

// Search Groups
router.get('/groups', searchGroups);

// Search Users
router.get('/users', searchUsers);

export default router;
