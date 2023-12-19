import apiResponse from "../../utils/apiResponse.js";
import apiError from "../../utils/apiError.js";
import { User } from "../../models/user.model.js";

async function readTask(req, res) {
  try {
    const task = await User.findById(req.userId)
      .select("-password") // mongodb query to exclude password
      .populate("tasks") // mongodb query that populates task with tasks array
      .exec(); // execute query
    return res.status(200).json(apiResponse(200, "Task fetched", task.tasks));
  } catch (error) {
    return res.status(500).json(apiError(500, "Internal Server Error"));
  }
}

export default readTask;
