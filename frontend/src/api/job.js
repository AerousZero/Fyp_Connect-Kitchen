import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

export const addJob = async (data, token) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/job/addJob/",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    throw error; // Re-throw error for handling at calling location
  }
};