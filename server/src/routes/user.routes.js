import { Router } from "express";
import { signUp } from "../middleware/validation/user/signupValidation.js";
import userSignUp from "../controllers/user/userSignUp.js";
import { loginValidation } from "../middleware/validation/user/loginValidation.js";
import userLogin from "../controllers/user/userLogin.js";
// router instance
const userRouter = Router();

// routes

userRouter.post("/signup", signUp, userSignUp);
userRouter.post("/login", loginValidation, userLogin);

export default userRouter;
