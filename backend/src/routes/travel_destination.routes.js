import { Router } from 'express';
const router = Router()
import { findAll, findByTravelDestinationId, findDestinationsByUserId, findLocation } from '../controllers/travel_destination.controller.js';

// Retrieve all travel_destinations
router.get('/', findAll);

// this route will be called as /api/v1/travelDestinations/:destinationId/users
router.get('/:destinationId/users',findByTravelDestinationId)

router.get('/user/:id',findDestinationsByUserId)

router.get('/:travelId/coordinates', findLocation)

export default router
