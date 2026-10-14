import { signin,signup } from "../controller/Auth.controller.js";
import { Router } from "express";

const AuthRouter = Router()

AuthRouter.post('/signup',signup)
AuthRouter.post('/signin',signin)

export default AuthRouter
