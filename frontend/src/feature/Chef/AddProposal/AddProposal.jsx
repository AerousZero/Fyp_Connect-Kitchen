import React, { useState, useEffect } from "react";
import Navbar from "../../../components/NavBar";
import Loader from "../../../components/common/Loader";
import Footer from "../../../components/Footer";
import { useParams } from "react-router";
import { fetchJobById, saveProposalJob } from "../../../api/job";
import Cookies from "js-cookie";
import { notification } from "antd";
import { useForm } from "react-hook-form";

function AddProposal() {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(null);
  const [rateError, setRateError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  

  const saveJob = async (data) => {
    const token = Cookies.get("accessToken");
    data.job = id;
    await saveProposalJob({ data, token })
      .then((response) => {
        if (response.status === 201) {
          notification.success({ message: response.data.message });
          window.location.reload()
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          notification.error({ message: "Unauthorized. Please log in again." });
        } else if (error.response.status === 400) {
          notification.error({
            message: "Bad request. Please check your input.",
          });
        } else {
          notification.error({
            message: "An error occurred. Please try again later.",
          });
        }
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="container mx-auto mt-10 px-4">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Submit Proposal</h1>
            <div className="bg-white rounded-lg shadow-md border-2 border-black p-6">
              {jobDetails ? (
                <>
                  <h1 className="font-semibold">Job Details</h1>
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
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">Type:</span>
                        <span className="text-gray-800">
                          {jobDetails.hourly_rate === null
                            ? "Hourly"
                            : "Fixed Price"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">
                          Expertise Level:
                        </span>
                        <span className="text-gray-800">
                          {jobDetails.job.experience_level}
                        </span>
                      </div>
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
            <div className="bg-white rounded-lg shadow-md border-2 border-black p-6">
              <form onSubmit={handleSubmit(saveJob)}>
                <h1 className="font-semibold">
                  What is the rate you'd like to bid for this job?
                </h1>
                <div className="mb-6">
                  <label
                    htmlFor="rate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rate
                  </label>
                  <input
                    type="text"
                    id="rate"
                    name="rate"
                    className={`mt-1 border-2 border-black focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                      rateError ? "border-red-500" : ""
                    }`}
                    placeholder="Enter rate"
                    {...register("rate", { required: true })}
                    onChange={(e) => {
                      const value = e.target.value;
                      setRateError("");
                      if (value.trim() !== "") {
                        const maxRate =
                          jobDetails?.job?.fixed_budget !== null
                            ? jobDetails.job.fixed_budget
                            : jobDetails.job.hourly_rate;
                        if (parseFloat(value) > parseFloat(maxRate)) {
                          setRateError("Rate cannot exceed the maximum budget");
                        }
                      } else {
                        setRateError("Rate is required");
                      }
                      setValue("rate", value);
                    }}
                  />
                  {rateError && (
                    <span className="text-red-500">{rateError}</span>
                  )}
                </div>
                <hr className="my-6 border-gray-200" />
                <h1 className="font-semibold">Additional details</h1>
                <div className="mb-6">
                  <label
                    htmlFor="coverLetter"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows="3"
                    className={`mt-1 border-2 border-black focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                      errors.coverLetter ? "border-red-500" : ""
                    }`}
                    placeholder="Write your cover letter"
                    {...register("cover_letter", { required: true })}
                  ></textarea>
                  {errors.cover_letter && (
                    <span className="text-red-500">
                      Cover Letter is required
                    </span>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    className={`mt-1 border-2 border-black focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                      errors.description ? "border-red-500" : ""
                    }`}
                    placeholder="Write job description"
                    {...register("description", { required: true })}
                  ></textarea>
                  {errors.description && (
                    <span className="text-red-500">
                      Description is required
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white rounded-full w-[200px] hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded"
                >
                  Submit
                </button>

                <button className="bg-transparent text-green-500  font-bold py-2 px-4 mr-4 rounded-full w-48">
                  Cancel
                </button>
              </form>
            </div>
            <div></div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default AddProposal;
