import { validationResult } from "express-validator";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";
import { Task } from "../../models/task.model.js";
import { User } from "../../models/user.model.js";

async function createTask(req, res) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json(apiError(400, result.array()[0].msg));
  } else {
    // requiring user id for task creation
    try {
      const task = await Task.create({
        userId: req.userId,
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority ? req.body.priority : 1, // will set priotity to 1 if not provided
      });

      if (task) {
        await User.findByIdAndUpdate(
          { _id: req.userId },
          {
            $push: {
              // mongodb method to push data into an array using $push operator. this push task._id into tasks array
              tasks: task._id,
            },
          }
        );
      }
      return res
        .status(201)
        .json(apiResponse(201, "Task created successfully", task));
    } catch (error) {
      return res.status(500).json(apiError(500, "Internal Server Error"));
    }
  }
}

export default createTask;
