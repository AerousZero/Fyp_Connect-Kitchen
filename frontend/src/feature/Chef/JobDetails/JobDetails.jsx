import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchJobById, getJobProposalByUser } from "../../../api/job";
import Navbar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import Cookies from "js-cookie";
import Loader from "../../../components/common/Loader";
import { Link } from "react-router-dom";

function JobDetails() {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(null);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    async function fetchJobDetail() {
      try {
        setIsLoading(true);
        const token = Cookies.get("accessToken");
        const response = await fetchJobById({ id, token });
        setJobDetails(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setIsLoading(false);
      }
    }

    fetchJobDetail();
  }, [id]);

  useEffect(() => {
    if (jobDetails?.job) {
      const postedTime = new Date(jobDetails.job.created_at);
      const currentTime = new Date();
      const elapsedTimeInMilliseconds = currentTime - postedTime;

      const millisecondsPerMinute = 1000 * 60;
      const millisecondsPerHour = millisecondsPerMinute * 60;

      const hours = Math.floor(elapsedTimeInMilliseconds / millisecondsPerHour);
      const minutes = Math.floor(
        (elapsedTimeInMilliseconds % millisecondsPerHour) /
          millisecondsPerMinute
      );

      let timeElapsedString = "";
      if (hours > 0) {
        timeElapsedString += `${hours}h `;
      }
      if (minutes > 0 || timeElapsedString === "") {
        timeElapsedString += `${minutes}m`;
      }

      setTimeElapsed(timeElapsedString);
    }
  }, [jobDetails]);

  useEffect(() => {
    async function checkIfApplied() {
      try {
        const token = Cookies.get("accessToken");
        const response = await getJobProposalByUser(token);
        const appliedProposals = response.data.data;
        const alreadyApplied = appliedProposals.some(
          (proposal) => proposal.job === jobDetails?.job.id
        );
        setIsApplied(alreadyApplied);
      } catch (error) {
        console.error("Error checking if user applied:", error);
      }
    }

    checkIfApplied();
  }, [jobDetails?.job.id]);

  const handleApply = () => {
    // Logic to handle job application
  };

  const handleSave = () => {
    // Logic to save the job
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="container mx-auto mt-10 px-4">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex">
            <div className="w-70 pr-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                {jobDetails ? (
                  <>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                      {jobDetails.job.title}
                    </h1>
                    <div className="flex justify-between text-gray-600">
                      <p>
                        Posted{" "}
                        <span className="font-semibold">{timeElapsed}</span> ago
                      </p>
                      <p>
                        Location{" "}
                        <span className="font-semibold">
                          {jobDetails.job.location}
                        </span>
                      </p>
                    </div>
                    <hr className="my-6 border-gray-200" />
                    <p className="text-gray-800 mb-6">
                      {jobDetails.job.description}
                    </p>

                    <hr className="my-6 border-gray-200" />
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-2 text-gray-800">
                        Details
                      </h2>
                      <div className="flex gap-40">
                        {/* Hourly or Fixed Rate */}
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">Type:</span>
                          <span className="text-gray-800">
                            {jobDetails.hourly_rate === null
                              ? "Hourly"
                              : "Fixed Price"}
                          </span>
                        </div>
                        {/* Expertise Level */}
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">
                            Expertise Level:
                          </span>
                          <span className="text-gray-800">
                            {jobDetails.job.experience_level}
                          </span>
                        </div>
                        {/* Budget */}
                        {/* Hourly Rate */}
                        {jobDetails.job.hourly_rate === null && (
                          <div className="flex items-center">
                            <span className="font-semibold mr-2">
                              Fixed Rate:
                            </span>
                            <span className="text-gray-800">
                              ${jobDetails.job.fixed_budget}
                            </span>
                          </div>
                        )}
                        {/* Fixed Budget */}
                        {jobDetails.job.fixed_budget === null && (
                          <div className="flex items-center">
                            <span className="font-semibold mr-2">
                              Hourly Rate:
                            </span>
                            <span className="text-gray-800">
                              ${jobDetails.job.hourly_rate}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <hr className="my-6 border-gray-200" />
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-2 text-gray-800">
                        Skills Required
                      </h2>
                      {jobDetails.skills.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {jobDetails.skills.map((skill, index) => (
                            <li key={skill.id} className="text-gray-800">
                              {skill.skill_name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span>No Skill required</span>
                      )}
                    </div>
                  </>
                ) : (
                  <p>No job details found.</p>
                )}
              </div>
            </div>
            <div className="w-30 h-full">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-6 flex flex-col gap-2">
                  {isApplied ? (
                    <button
                      className="bg-green-500 text-white rounded-full w-[200px] hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded"
                      onClick={handleApply}
                    >
                       Already Applied
                    </button>
                  ) : (
                    <button className="bg-green-500 text-white rounded-full w-[200px] hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded">
                     Apply
                    </button>
                  )}

                  <button
                    className="border-2 border-green-500 text-green-500 rounded-full w-[200px] font-bold py-2 px-4 rounded"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
                <div className="flex flex-col mt-10 justify-end">
                  <span className="text-xl font-semibold mb-2 text-black">
                    About Client
                  </span>
                  <div className="gap-3 text-md">
                    {jobDetails?.user ? (
                      <div className="rounded-lg space-y-2">
                        <p className="text-gray-800 text-sm">
                          {jobDetails.user.first_name}{" "}
                          {jobDetails.user.last_name}
                        </p>
                        <p className="text-gray-800 text-sm">
                          {jobDetails.user.email}
                        </p>

                        <p className="text-gray-800 text-sm">
                          <span className="font-semibold">
                            {jobDetails.user.total_jobs_posted}
                          </span>{" "}
                          Jobs Posted
                        </p>
                      </div>
                    ) : (
                      <p>No client details found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default JobDetails;
