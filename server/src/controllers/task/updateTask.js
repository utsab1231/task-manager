import { Task } from "../../models/task.model.js";
import { validationResult } from "express-validator";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";

async function updateTask(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(apiError(400, errors.array()[0].msg));
  }
  try {
    const priorityValue = req.body.priority;
    if (priorityValue) {
      await Task.findByIdAndUpdate(
        { _id: req.body.task_id },
        {
          $set: {
            priority: priorityValue,
          },
        }
      );
    }
    const task = await Task.findByIdAndUpdate(
      { _id: req.body.task_id , userId: req.userId},
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .json(apiResponse(200, "Task updated successfully", task));
  } catch (error) {
    return res.status(500).json(apiError(500, "Internal Server Error"));
  }
}

export default updateTask;
