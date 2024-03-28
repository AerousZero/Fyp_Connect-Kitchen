import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

export const login = async ({username, password}) => {
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
export const register = async (data) => {
  try {
    const response = await axios.post(getApiUrl("/register"), data);
    return response.data; // Assuming data is in response
  } catch (error) {
    throw error; // Re-throw error for handling at calling location
  }
};

export const getUser = async (token) => {

  console.log(token, "in api service")
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/profile/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(response, "profile response")
    return response; // Assuming data is in response
  } catch (error) {
    throw error; // Re-throw error for handling at calling location
  }
};
