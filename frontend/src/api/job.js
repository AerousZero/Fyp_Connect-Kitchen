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

export const fetchJob = async (token) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/job/getJob/",
  
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response;
    } catch (error) {
      throw error; // Re-throw error for handling at calling location
    }
  };
  
  export const fetchSavedJob = async (token) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/job/saved/",
  
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response;
    } catch (error) {
      throw error; // Re-throw error for handling at calling location
    }
  };
  
  export const whiteListJob = async (job, token) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/job/save/",
        { job },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response;
    } catch (error) {
      throw error; // Re-throw error for handling at calling location
    }
  };
  