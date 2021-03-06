import express from "express";
import { AuthenticationController } from "../controllers/AuthenticationController.js";

export const authenticationRouter = express.Router();

authenticationRouter.post("/login", AuthenticationController.login);
authenticationRouter.get("/logout", AuthenticationController.logout);
authenticationRouter.get("/session", AuthenticationController.checkSession);