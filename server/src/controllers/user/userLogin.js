import { User } from "../../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";

async function userLogin(req,res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(apiError(400, errors.array()[0].msg));
  }

  const { username, password } = req.body;
  // check if user exists
  const user = await User.findOne({ $or: [{ username: username }] });
  if (!user) {
    return res.status(400).json(apiError(400, "Invalid credentials"));
  }

  // check if password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json(apiError(400, "Invalid credentials"));
  }

  // create and assign a token
  const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_SECRET);

  return res
    .status(200)
    .json(apiResponse(200, "Login successful", { user_id: user._id, token }));
}
export default userLogin;
