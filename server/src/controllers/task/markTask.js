import { Task } from "../../models/task.model.js";
import apiResponse from "../../utils/apiResponse.js";
import apiError from "../../utils/apiError.js";

async function markTask(req, res) {
  try {
    const task = await Task.findById({
      _id: req.body.task_id,
      userId: req.userId,
    });
    if (task) {
      if (task.isCompleted === true) {
        return res.status(400).json(apiError(400, "Task already completed"));
      } else {
        const updatedTask = await Task.findByIdAndUpdate(
          { _id: req.body.task_id },
          {
            isCompleted: true,
          },
          { new: true }
        );
        return res
          .status(200)
          .json(apiResponse(200, "Task marked completed", updatedTask));
      }
    } else {
      res.status(404).json(apiError(404, "Task not found"));
    }
  } catch (error) {
    res.status(500).json(apiError(500, "Internal Server Error"));
  }
}

export default markTask;
