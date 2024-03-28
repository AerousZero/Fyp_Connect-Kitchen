import React, { useState } from "react";
import { Link } from "react-router-dom";

const INITIAL_STATE = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  username: "",
  role: "chef",
};

const Register = () => {
  const [credentials, setCredentials] = useState(INITIAL_STATE);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Replace with actual registration logic
      await register(credentials);
      // Handle successful registration (redirect, message)
      console.log("Registration successful!");
    } catch (error) {
      // Handle registration errors
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div className="p-10 bg-white mx-auto w-[50%] rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Register</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex flex-col">
            <label
              htmlFor="first_name"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={credentials.first_name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="mb-6 flex flex-col">
            <label
              htmlFor="last_name"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={credentials.last_name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="mb-6 flex flex-col">
            <label
              htmlFor="email"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6 flex flex-col">
            <label
              htmlFor="username"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
              placeholder="Choose a username"
              required
            />
          </div>
          <div className="mb-6 flex flex-col">
            <label
              htmlFor="password"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white rounded-lg px-4 py-3 font-semibold uppercase tracking-wide hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <div className="text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
