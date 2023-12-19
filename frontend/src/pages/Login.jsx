import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN_URL } from "../utils/constants.js";
import { toast, ToastContainer } from "react-toastify";
function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(LOGIN_URL, formData);
      if (data) {
        toast.success(`User Logged in Successfully`);
        localStorage.setItem("user", JSON.stringify(data.data.data));
        setTimeout(() => {
          navigate("/");
        }, 2000);
        return;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      return;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg max-w-md">
        <h1 className="text-3xl font-bold text-purple-400 mb-8 text-center">
          Log In
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-white">Username</label>
            <input
              type="text"
              name="username"
              className="border p-3 rounded-lg w-full bg-gray-700 text-white"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-white">Password</label>
            <input
              type="password"
              name="password"
              className="border p-3 rounded-lg w-full bg-gray-700 text-white"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white py-3 px-8 rounded-lg hover:bg-purple-700"
          >
            Log In
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default Login;
