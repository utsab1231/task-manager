import { useState } from "react";
import { ADD_TASK } from "../utils/constants.js";
import axios from "axios";
import { loginAction } from "../store/feature/userSlice.js";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import TaskPage from "./TaskPage.jsx";

function LoginHome() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: 1,
  });

  const handleClick = async () => {
    const newData = { ...formData };
    console.log(newData);
    const headers = { auth: user.token };
    try {
      await axios.post(ADD_TASK, newData, { headers: headers });
      toast.success("Task added successfully");
      setFormData({ title: "", description: "", priority: 1 });
      dispatch(loginAction(localStorage.getItem("user")));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="bg-gray-900 w-full min-h-screen h-full p-6">
        <div className="bg-gray-900  w-[90%] mx-auto pt-3">
          <div className="flex flex-col md:flex md:flex-row gap-6">
            <div className="flex flex-col w-[75%] p-1">
              <input
                className=" p-2 m-2 rounded-md bg-gray-800 text-white"
                type="text"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <textarea
                className=" p-2 m-2 rounded-md bg-gray-800 text-white"
                type="text"
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <div className="mt-2">
                <label className="text-white text-lg px-3 ">
                  Select priority:
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: parseInt(e.target.value),
                    })
                  }
                >
                  <option value={1}>Low</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Moderate</option>
                  <option value={4}>High</option>
                  <option value={5}>Critical</option>
                </select>
              </div>
            </div>
            <div className="mt-10">
              <button
                className="px-2 py-4 bg-purple-500 rounded-md hover:bg-purple-800 hover:scale-[1.1] transition duration-300 ease-in-out  font-semibold hover:text-white"
                onClick={handleClick}
              >
                Add task
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
        <div>
          <TaskPage />
        </div>
      </div>
    </>
  );
}

export default LoginHome;
