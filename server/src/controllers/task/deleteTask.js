import { Task } from "../../models/task.model.js";
import { User } from "../../models/user.model.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";

async function deleteTask(req, res) {
  try {
    const task = await Task.findByIdAndDelete({
      _id: req.body.task_id,
      userId: req.userId,
    });
    if (task) {
      await User.findByIdAndUpdate(
        { _id: req.userId },
        {
          $pull: {
            tasks: req.body.task_id,
          },
        }
      );
      return res
        .status(200)
        .json(apiResponse(200, "Task deleted successfully", ""));
    } else {
      return res.status(404).json(apiError(404, "Task not found"));
    }
  } catch (error) {
    return res.status(500).json(apiError(500, "Internal Server Error"));
  }
}

export default deleteTask;
