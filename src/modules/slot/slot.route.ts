import express from 'express';
import { createSlotController, getAvailableSlots } from "./slot.controller";


const router = express.Router();

router.post('/create', createSlotController);
router.get('/availability',getAvailableSlots);

export const SlotRoutes = router;