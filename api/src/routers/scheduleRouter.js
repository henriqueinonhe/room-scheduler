import express from "express";
import { ScheduleController } from "../controllers/ScheduleController";

export const scheduleRouter = express.Router();

scheduleRouter.get("/users/:id/schedule", ScheduleController.fetchUserSchedule);
scheduleRouter.get("/rooms/:id/schedule", ScheduleController.fetchRoomSchedule);