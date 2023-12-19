import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { REGISTER_URL } from "../utils/constants.js";
import { toast, ToastContainer } from "react-toastify";
function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form (call API)

    axios
      .post(REGISTER_URL, formData)
      .then((res) => {
        toast.success(
          `User ${res.data.data.username}  registered Successfully`
        );

        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return;
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen scroll-m-0  bg-gray-900 ">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-lg md:max-w-xl lg:max-w-2xl">
        <h1 className="text-4xl font-bold text-purple-400 mb-8 text-center">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-gray-300 text-xl">Username</label>
            <input
              type="text"
              className="border p-3 rounded-lg w-full bg-gray-700 text-gray-300"
              name="username"
              value={formData.username}
              onChange={handleChange}
              minLength={(5, "Username must be at least 5 characters long")}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-300 text-xl">Email</label>
            <input
              type="email"
              name="email"
              className="border p-3 rounded-lg w-full bg-gray-700 text-gray-300"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-300 text-xl">Password</label>
            <input
              type="password"
              name="password"
              className="border p-3 rounded-lg w-full bg-gray-700 text-gray-300"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white py-3 px-8 rounded-lg text-xl hover:bg-purple-700"
          >
            Sign Up
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;
