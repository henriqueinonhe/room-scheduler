import express from "express";
import { LoginController } from "../controllers/LoginController.js";

export const loginRouter = express.Router();

loginRouter.get("/login", LoginController.login);
loginRouter.get("/logout", LoginController.logout);