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
  
  export const fetchJobById = async ({ id, token }) => {
    console.log(token, "id");
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/job/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      throw error; // Re-throw error for handling at calling location
    }
  };
  
  export const fetchJobByCreator = async (token) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/job/getJob/creator`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error; // Re-throw error for handling at calling location
    }
  }; 
  
  export const getJobProposalByUser = async (token) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/proposals/user/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  export const getJobProposalByJob = async ({ id, token }) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/proposals/job/${id}/`,
  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
 
  export const getJobProposalById = async ({ id, token }) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/proposals/${id}/`,
  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };  

  export const saveProposalJob = async ({ data, token }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/proposals/save/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };  
 
  export const approvedProposal = async ({ id, token, data }) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/proposal/approved/${id}/`, data,
  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
    

  export const hireProposal = async ({ id, token, data }) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/proposal/hire/${id}/`, data,
  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
  