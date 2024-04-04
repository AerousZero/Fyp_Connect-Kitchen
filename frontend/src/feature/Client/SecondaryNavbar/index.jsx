import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs } from "antd";
import Cookies from "js-cookie";
import Card from "../../../components/common/Card";
import { fetchJobByCreator } from "../../../api/job";

const { TabPane } = Tabs;

const ClientNavbar = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setIsLoading(true);
      fetchJobData(token);
    }
  }, []);

  const fetchJobData = async (token) => {
    try {
      const response = await fetchJobByCreator(token);
      setJobs(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching job data:", error);
      setIsLoading(false);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          {/* Left side */}
          <div className="flex items-center">
            <Link to="/" className="text-lg font-bold text-black mr-6">
              Your workspace
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center">
            <Link
              to="/client/create-job"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors mr-6"
            >
              Add Job
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultActiveKey="1" className="text-sm mt-5">
          <TabPane tab="All Jobs" key="1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {isLoading ? (
                <p>Loading...</p>
              ) : jobs.length === 0 ? (
                <p>No jobs found</p>
              ) : (
                jobs.map((job) => <Card key={job.id} jobList={job} />)
              )}
            </div>
          </TabPane>
          <TabPane tab="All Contracts" key="2">
            <Link
              to="/"
              className="font-bold text-green-500 hover:text-green-600 transition-colors"
            >
              All Contracts
            </Link>
          </TabPane>
        </Tabs>
      </div>
    </nav>
  );
};

export default ClientNavbar;
