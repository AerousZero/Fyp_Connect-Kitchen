import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import {
  EnvironmentOutlined,
  DollarCircleOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import Cookies from "js-cookie";
import { whiteListJob } from "../../../api/job";
import { notification } from "antd";
import { Link } from "react-router-dom";

const Card = ({ jobList }) => {
  const { job, user, skills, isFavorite } = jobList;

  const [isLoading, setIsLoading] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(null);
  const [isFavorites, setIsFavorites] = useState(isFavorite);

  useEffect(() => {
    setIsLoading(false);
    if (job) {
      const postedTime = new Date(job.created_at);
      const currentTime = new Date();
      const elapsedTimeInMilliseconds = currentTime - postedTime;

      const millisecondsPerMinute = 1000 * 60;
      const millisecondsPerHour = millisecondsPerMinute * 60;
      const millisecondsPerDay = millisecondsPerHour * 24;

      const days = Math.floor(elapsedTimeInMilliseconds / millisecondsPerDay);
      const hours = Math.floor(
        (elapsedTimeInMilliseconds % millisecondsPerDay) / millisecondsPerHour
      );
      const minutes = Math.floor(
        (elapsedTimeInMilliseconds % millisecondsPerHour) /
          millisecondsPerMinute
      );

      let timeElapsedString = "";
      if (days > 0) {
        timeElapsedString += `${days}d `;
      }
      if (hours > 0) {
        timeElapsedString += `${hours}h `;
      }
      if (minutes > 0 || timeElapsedString === "") {
        timeElapsedString += `${minutes}m`;
      }

      setTimeElapsed(timeElapsedString);
    }
  }, [job]);

  const handleFavorite = async () => {
    try {
      const token = Cookies.get("accessToken");
      const response = await whiteListJob(job.id, token);
      if (response.status === 201) {
        setIsFavorites(true);
        notification.success({ message: response.data.message });
      } else if (response.status === 401) {
        notification.error({ message: response.data.message });
      }
    } catch (error) {
      notification.error({ message: "Something error occurred" });
    }
  };

  return (
    <div className="container mx-auto bg-white shadow-md rounded-lg border border-gray-300 overflow-hidden relative">
      {isLoading ? (
        <Loader />
      ) : job ? (
        <Link to={`/job/details/${job.id}`}>
          <div className="px-6 py-4">
            <div className="flex items-center mb-2">
              <p className="text-gray-700 text-xs font-semibold mr-1">
                Posted {timeElapsed} minutes ago
              </p>
              {user && (
                <HeartOutlined
                  className={
                    isFavorites
                      ? "text-green-500 text-bold absolute right-4 top-4"
                      : "text-black absolute right-4 top-4"
                  }
                  onClick={handleFavorite}
                />
              )}
            </div>
            <div className="flex items-center mb-2">
              <div className="font-bold text-green-500 text-xl mr-2">
                {job.title}
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="bg-gray-100 text-green-900 text-xs px-2 py-1 rounded-full font-semibold mr-2">
                {job.payment_type}
              </div>
              <div className="bg-blue-100 text-black text-xs px-2 py-1 rounded-full font-semibold mr-2">
                {job.experience_level}
              </div>
              <div className="bg-blue-100 text-black text-xs px-2 py-1 rounded-full font-semibold">
                ${job.fixed_budget}
              </div>
            </div>
            <div className="flex text-black text-xs mt-2 rounded-full font-semibold">
              <EnvironmentOutlined className="w-4 h-3 fill-current text-gray-500" />
              <p className="text-gray-700 text-sm">{job.location}</p>
            </div>
            <p className="text-gray-700 text-base mb-2">{job.description}</p>
            {user && (
              <div className="flex items-center mb-2">
                <p className="text-gray-700 text-sm font-semibold mr-1">
                  Posted by:
                </p>
                <p className="text-gray-700 text-sm">
                  {user.first_name} {user.last_name}
                </p>
              </div>
            )}

            {skills.length > 0 && (
              <div className="flex items-center mb-2">
                <p className="text-gray-700 text-sm font-semibold mr-1">
                  Skills:
                </p>
                <div>
                  {skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-1 mb-1"
                    >
                      {skill.skill_name}
                    </span>
                  ))}
                </div>
              </div>
            )}

           {job.is_hired ? <span className="text-red-500 font-bold text-xs">**Client already hired someone</span> : null}


            {user === undefined && (
              <Link to={`/client/job/proposal/${job.id}`}>
                <button className="bg-green-500 text-white rounded-full w-[200px] hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded">
                  View All Proposal
                </button>
              </Link>
            )}
          </div>
        </Link>
      ) : (
        <div className="flex justify-center items-center">
          <p>No data available</p>
        </div>
      )}
    </div>
  );
};

export default Card;
