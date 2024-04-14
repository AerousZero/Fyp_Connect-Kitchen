import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUp } from "../../api/auth";
import { notification } from "antd";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const Register = (role) => {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    username: "",
    role: role,
  };
  const [credentials, setCredentials] = useState(INITIAL_STATE);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const registerHandler = async (data) => {
    try {
      data.role = role.role;
      const response = await signUp(data);
      console.log(response, "response,");
      if (response.status === 201) {
        notification.success({ message: response.data.message });
        navigate("/login");
      } else {
        notification.error({ message: "An unexpected error occurred" });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        notification.error({
          message: "Bad Request: " + error.response.data.message,
        });
      } else {
        notification.error({ message: "An unexpected error occurred" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div className="p-10 bg-white mx-auto max-w-lg rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Register as {capitalizeFirstLetter(role.role)}
        </h2>
        <form onSubmit={handleSubmit(registerHandler)}>
          <div className="mb-6 flex flex-col">
            <label htmlFor="email" className="mb-2 text-sm font-medium">
              FirstName:
            </label>
            <input
              type="firstName"
              id="firstName"
              {...register("first_name", { required: "firstName is required." })}
              className={`w-full px-4 py-3 rounded-lg border-2 border-black focus:border-blue-500 focus:outline-none ${
                errors.username ? "border-red-500" : ""
              }`}
              placeholder="Enter your firstName"
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className="mb-6 flex flex-col">
            <label htmlFor="email" className="mb-2 text-sm font-medium">
              LastName:
            </label>
            <input
              type="LastName"
              id="LastName"
              {...register("last_name", { required: "LastName is required." })}
              className={`w-full px-4 py-3 rounded-lg border-2 border-black focus:border-blue-500 focus:outline-none ${
                errors.username ? "border-red-500" : ""
              }`}
              placeholder="Enter your LastName"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">
                {errors.lastName.message}
              </span>
            )}
          </div>
          <div className="mb-6 flex flex-col">
            <label htmlFor="email" className="mb-2 text-sm font-medium">
              Email:
            </label>
            <input
              type="Email"
              id="Email"
              {...register("email", { required: "Email is required." })}
              className={`w-full px-4 py-3 rounded-lg border-2 border-black focus:border-blue-500 focus:outline-none ${
                errors.username ? "border-red-500" : ""
              }`}
              placeholder="Enter your Email"
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
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
            Sign Up
          </button>
        </form>
        <div className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
