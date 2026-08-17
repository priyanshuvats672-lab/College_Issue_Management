import {Router} from "express";
import * as userController from "../controllers/user.controller.js"
import { authenticateUser } from "../middlewares/auth.middlewares.js";

const userRouter = Router();

userRouter.post("/register",userController.register);
userRouter.post("/login",userController.login);
userRouter.get("/refresh",userController.refreshToken);
userRouter.post("/logout",userController.logout);
userRouter.get("/me",authenticateUser,userController.getMe);

export default userRouter;