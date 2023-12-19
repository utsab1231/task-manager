import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../store/feature/userSlice.js";
import { DELETE_TASK, UPDATE_TASK, MARK_TASK } from "../utils/constants.js";
import { ToastContainer, toast } from "react-toastify";
import { PRIORITY_CHART } from "../utils/constants.js";

function TaskCard({ task }) {
  const dateDiff = (new Date() - new Date(task.createdAt)) / (1000 * 60 * 60);
  const user = JSON.parse(useSelector((state) => state.user));
  const dispatch = useDispatch();

  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateValue, setUpdateValue] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
  });

  const handleDeletetask = async (id) => {
    try {
      const headers = { auth: user.token };

      const data = { task_id: id };

      await axios.post(DELETE_TASK, data, { headers });

      dispatch(loginAction(localStorage.getItem("user")));
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //for updating task
  const handleUpdatetask = async (id) => {
    try {
      const headers = { auth: user.token };
      const data = {
        task_id: id,
        title: updateValue.title,
        description: updateValue.description,
        priority: updateValue.priority,
      };

      await axios.put(UPDATE_TASK, data, { headers });
      toast.success("task updated successfully");
      setIsUpdate(!isUpdate);
      dispatch(loginAction(localStorage.getItem("user")));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleChecked = async (id) => {
    if (task.isCompleted) {
      toast.error("task already completed");
      return;
    }

    try {
      const headers = { auth: user.token };
      const data = { task_id: id };

      await axios.put(MARK_TASK, data, { headers });
      toast.success("task updated successfully updated");
      setIsCompleted(true);
      dispatch(loginAction(localStorage.getItem("user")));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      className={`shadow-md rounded-md p-4 w-[1/3] m-4 h-86 ${
        isCompleted ? "bg-gray-600" : "bg-black"
      }`}
    >
      {isUpdate ? (
        <>
          <textarea
            value={updateValue.title}
            onChange={(e) =>
              setUpdateValue({ ...updateValue, title: e.target.value })
            }
            className="w-full h-24 text-black p-2 rounded-sm"
          />
          <textarea
            value={updateValue.description}
            onChange={(e) =>
              setUpdateValue({ ...updateValue, description: e.target.value })
            }
            className="w-full h-24 text-black p-2 rounded-sm"
          />
          <div className="">
            <label className="text-white text-lg px-3">Select priority:</label>
            <select
              value={updateValue.priority}
              onChange={(e) =>
                setUpdateValue({
                  ...updateValue,
                  priority: Number(e.target.value),
                })
              }
              className="text-white bg-black"
            >
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>Moderate</option>
              <option value={4}>High</option>
              <option value={5}>Critical</option>
            </select>
          </div>
        </>
      ) : (
        <>
          <h2
            className={`text-xl font-semibold mb-2 h-14  ${
              isCompleted
                ? "line-through"
                : PRIORITY_CHART[updateValue.priority]
            } `}
          >
            {updateValue.title.toUpperCase()}{" "}
            <span className="text-[10px] border border-white rounded px-[2px] py-[1px]">
              {PRIORITY_CHART[updateValue.priority]}
            </span>
          </h2>
          <h2
            className={`text-md font-semibold mb-2 h-24 text-white${
              isCompleted ? "line-through" : ""
            }`}
          >
            {updateValue.description}
          </h2>
          <h2 className="font-bold pb-4 text-white">
            {`Priority: ${PRIORITY_CHART[updateValue.priority]}`}
          </h2>
        </>
      )}

      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="form-checkbox rounded text-blue-500 mr-2"
          checked={isCompleted}
          onChange={() => handleChecked(task._id)}
        />
        <span className="text-blue-600 text-md">
          {isCompleted ? "Task Completed" : "Pending Task"}
        </span>
      </label>

      {/* <!-- Created At Date --> */}
      <p className="text-sm text-gray-500 mt-2 mb-4 p-2">
        Created
        {dateDiff < 24
          ? ` ${dateDiff.toFixed(2)} hours ago`
          : ` ${(dateDiff / 24).toFixed(2)} days ago`}
      </p>

      <div className="flex justify-between items-center">
        {isUpdate ? (
          <>
            {isCompleted ? (
              <></>
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                onClick={() => handleUpdatetask(task._id)}
              >
                Update
              </button>
            )}

            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
              onClick={() => {
                setIsUpdate(!isUpdate);

                setUpdateValue({
                  title: task.title,
                  description: task.description,
                  priority: task.priority,
                });
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {isCompleted ? (
              <></>
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                onClick={() => setIsUpdate(!isUpdate)}
              >
                Update
              </button>
            )}

            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
              onClick={() => handleDeletetask(task._id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};
export default TaskCard;
