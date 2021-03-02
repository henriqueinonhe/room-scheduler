import express from "express";
import { LoginController } from "../controllers/LoginController";

export const loginRouter = express.Router();

loginRouter.get("/login", LoginController.login);
loginRouter.get("/logout", LoginController.logout);