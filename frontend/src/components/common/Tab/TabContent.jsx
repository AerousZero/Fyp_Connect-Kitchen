import React, { useState, useEffect } from "react";
import Card from "../Card/index";
import { fetchJob, fetchSavedJob } from "../../../api/job"; 
import Cookies from "js-cookie";

const TabContent = ({ label }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        const token = Cookies.get("accessToken"); 
        if (label === "Saved") {
         
          response = await fetchSavedJob(token);
        } else {
          response = await fetchJob(token);
        }
        setJobs(response.data.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchData();
  }, [label]); 

  return (
    <div className="flex flex-wrap gap-4">
      {jobs.map((job) => (
        <Card key={job.id} label={label} jobList={job} />
      ))}
    </div>
  );
};

export default TabContent;
