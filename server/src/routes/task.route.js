import { Router } from "express";
import createTask from "../controllers/task/createTask.js";
import createTaskValidation from "../middleware/validation/task/createTaskValidation.js";
import updateTask from "../controllers/task/updateTask.js";
import deleteTask from "../controllers/task/deleteTask.js";
import readTask from "../controllers/task/readTask.js";
import markTask from "../controllers/task/markTask.js";
const taskRouter = Router();

// create new task
taskRouter.post("/createtask", createTaskValidation, createTask);

// update task
taskRouter.put("/updatetask", createTaskValidation, updateTask);

// delete task
taskRouter.post("/deletetask", deleteTask);

// read task
taskRouter.get("/gettask", readTask);

// mark task completed
taskRouter.put("/marktask", markTask);
export default taskRouter;
