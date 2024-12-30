import express from "express";
import { login, userAdd } from "../controller/userController.js";

export const userRoute = express.Router();

userRoute.post("/addUser" , userAdd);
userRoute.post("/login", login)