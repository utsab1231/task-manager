import jwt from "jsonwebtoken";
import apiError from "../../utils/apiError.js";

function tokenValidation(req, res, next) {
  if (req.headers["auth"] === undefined) {
    return res.status(401).json(apiError(401, "Not Authorized"));
  }
  try {
    const decodedToken = jwt.verify(
      req.headers["auth"],
      process.env.TOKEN_SECRET
    );

    // setting req.userId to be used in createTask.controller.js

    req.userId = decodedToken.user_id;

    return next();
  } catch (err) {
    return res.status(401).json(apiError(401, "Not Authorized"));
  }
}

export default tokenValidation;
