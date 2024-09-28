import express from "express";
import {
  createSlotController,
  deleteSlotController,
  getAvailableSlots,
  updateSlotController,
} from "./slot.controller";

const router = express.Router();

router.post("/create", createSlotController);
router.get("/availability", getAvailableSlots);

router.put("/:id", updateSlotController);
router.delete("/:id", deleteSlotController);

export const SlotRoutes = router;
