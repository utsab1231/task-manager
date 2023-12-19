import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import apiResponse from "../../utils/apiResponse.js";
import { User } from "../../models/user.model.js";
import apiError from "../../utils/apiError.js";

async function userSignUp(req, res) {
  // check for validation errors in username,email and body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(apiError(400, errors.array()[0].msg));
  }

  // check if user already exists
  const user = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });
  if (user) {
    return res.status(400).json(apiError(400, "User already exists"));
  }

  // hashing password for security
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // create new user
  try {
    const newUser = await User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json(
      apiResponse(201, "User created Sucessfully ", {
        userId: newUser._id,
        username: newUser.username,
      })
    );
  } catch (error) {
    return res.status(500).json(apiError(500, error.message));
  }
}

export default userSignUp;
