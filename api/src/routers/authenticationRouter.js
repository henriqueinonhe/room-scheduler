import express from "express";
import { AuthenticationController } from "../controllers/AuthenticationController.js";
import { authentication } from "../middlewares/authentication.js";

export const authenticationRouter = express.Router();

authenticationRouter.post("/login", AuthenticationController.login);
authenticationRouter.get("/logout", AuthenticationController.logout);
authenticationRouter.get("/session", authentication, AuthenticationController.checkSession);