import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://127.0.0.1:8000/api/";

export const login = async ({ username, password }) => {
  console.log(username, password, "apii");

  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/login/`, {
      username,
      password,
    });

    console.log(response, "response from API");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const signUp = async (data) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/register/",
      data
    );
    return response;
  } catch (error) {
    throw error; // Re-throw error for handling at calling location
  }
};

export const getUser = async (token) => {
  console.log(token, "in api service");
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/profile/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(response, "profile response");
    return response; // Assuming data is in response
  } catch (error) {
    throw error; // Re-throw error for handling at calling location
  }
};

export const updateUser = async (userData) => {
  const token = await Cookies.get("accessToken");
  try {
    const response = await axios.patch(
      "http://127.0.0.1:8000/api/profile/update/",
      userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
      
    

    return response.data;
  } catch (error) {
    throw error;
  }
};
