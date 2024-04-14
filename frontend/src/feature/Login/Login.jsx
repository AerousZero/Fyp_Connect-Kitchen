import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser, login } from "../../api/auth";
import { useForm } from "react-hook-form";
import { notification } from "antd";
import { updateUserDetails } from "../../store/userSlice";
import Cookies from "js-cookie";
import { setCookie } from "cookies-next";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginHandler = async (username, password) => {
    try {
      const response = await login(username, password);
      console.log(response.access);
      setCookie("accessToken", response.access);
      await getMyDetails();
      notification.success({ message: response.message });
    } catch (error) {
      notification.error({ message: "Invalid email or password" });
    } finally {
    }
  };

  const getMyDetails = async () => {
    const token = await Cookies.get("accessToken");
    console.log(token, "token");

    try {
      const response = await getUser(token);
      console.log(response.data.role.name, "response for profile");
      dispatch(updateUserDetails(response.data));
      setCookie("userId", response.data.id);
      redirectBasedOnRole(response.data.role.name);
    } catch (error) {
      // Handle error
    }
  };

  const redirectBasedOnRole = (role) => {
    console.log(role, "role");

    switch (role) {
      case "admin":
        navigate("/admin/home");
        break;
      case "client":
        navigate("/client/home");
        break;
      case "chef":
        navigate("/chef/home");
        break;
      default:
        navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div className="p-10 bg-white mx-auto max-w-lg rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Log In</h2>
        <form onSubmit={handleSubmit(loginHandler)}>
          <div className="mb-6 flex flex-col">
            <label htmlFor="email" className="mb-2 text-sm font-medium">
              Username:
            </label>
            <input
              type="username"
              id="username"
              {...register("username", { required: "Username is required." })}
              className={`w-full px-4 py-3 rounded-lg border-2 border-black focus:border-blue-500 focus:outline-none ${
                errors.username ? "border-red-500" : ""
              }`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="mb-6 flex flex-col">
            <label htmlFor="password" className="mb-2 text-sm font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required." })}
              className={`w-full px-4 py-3 rounded-lg border-2 border-black focus:border-blue-500 focus:outline-none text-black ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Log In
          </button>
        </form>
        <div className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
