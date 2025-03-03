import express from "express";
import { userControllers } from "../../controllers/user.controller";
import { registerUserValidator, loginUserValidator } from "../../middlewares/validator";

const userRouter = express.Router();

userRouter.get("/users",  userControllers.getAllUsers);
userRouter.get("/profile",  userControllers.getUser);
userRouter.delete("/:id", userControllers.removeUser);

userRouter.post("/register", registerUserValidator, userControllers.registerUser);
userRouter.post("/login", loginUserValidator, userControllers.loginUser);

// userRouter.post("/forget-pass", userControllers.registerUser);
// userRouter.post("/reset-pass", userControllers.registerUser);

export { userRouter };
