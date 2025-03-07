import express from "express";
import { userControllers } from "../../controllers/user.controller";
import { registerUserValidator, loginUserValidator, newPasswordUserValidator } from "../../middlewares/validator";

const userRouter = express.Router();

userRouter.get("/users",  userControllers.getAllUsers);
userRouter.get("/profile",  userControllers.getUser);
userRouter.delete("/:id", userControllers.removeUser);

userRouter.post("/register", registerUserValidator, userControllers.registerUser);
userRouter.post("/change-pass", newPasswordUserValidator, userControllers.newPassUser);
userRouter.post("/login", loginUserValidator, userControllers.loginUser);

// userRouter.post("/forget-pass", userControllers.registerUser);

export { userRouter };
