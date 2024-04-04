import React, { useState, useEffect } from "react";
import ClientLayout from "../Layout";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router";
import { fetchJobById, getJobProposalByJob } from "../../../api/job";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function FetchProposal() {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const ProposalItem = ({ proposal }) => {
    const renderShortlistedMessage = () => {
      if (proposal && proposal.is_shortlisted) {
        return (
          <div className="flex items-center justify-center">
            <h3 className="bg-blue-500 w-50 text-white px-2 py-1 rounded-full text-sm font-semibold">
              Shortlisted
            </h3>
          </div>
        );
      }
      return null;
    };
    const renderHiredMessage = () => {
      if (proposal && proposal.is_hired) {
        return (
          <div className="flex items-center justify-center">
            <h3 className="bg-blue-500 w-50 text-white px-2 py-1 rounded-full text-sm font-semibold">
              Hired
            </h3>
          </div>
        );
      }
      return null;
    };

    const renderMessageButton = () => {
      if (proposal.is_shortlisted) {
        return (
          <h3 className="bg-green-600 w-20 text-white px-2 py-1 rounded-full text-sm font-semibold">
            Message
          </h3>
        );
      }
      return null;
    };

    return (
      <li className="flex gap-2 border-b border-gray-200 pb-2 mb-2">
        <RightOutlined />
        <div className="flex items-center justify-between w-full">
          <div>
            <h3 className="flex-grow text-sm font-semibold">
              {proposal?.user.name}
            </h3>
          </div>

          <div>
            {proposal.is_hired
              ? renderHiredMessage() || renderShortlistedMessage() || ""
              : null}
          </div>

          <div className="flex gap-1">
            {renderMessageButton()}
            <Link to={`/client/job/proposal/details/${proposal.id}`}>
              <button className="bg-purple-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </li>
    );
  };

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

    async function fetchJobProposal() {
      try {
        setIsLoading(true);
        const token = Cookies.get("accessToken");
        const response = await getJobProposalByJob({ id, token });
        setProposals(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setIsLoading(false);
      }
    }

    fetchJobDetail();
    fetchJobProposal();
  }, [id]);

  return (
    <ClientLayout>
      {jobDetails && (
        <div>
          <h1 className="text-xl fonr-bold text-green-500 font-semibold">
            {jobDetails.job.title}
          </h1>
          <p className="text-gray-600">{jobDetails.job.description}</p>
        </div>
      )}
      <div className="mt-4">
        <span className="text-sm text-gray-500">
          List of Submitted Proposals by Chef for the {jobDetails?.job.title}{" "}
          job
        </span>

        <ul className="mt-2">
          {proposals.map((proposal) => (
            <ProposalItem key={proposal.id} proposal={proposal} />
          ))}
        </ul>
      </div>
    </ClientLayout>
  );
}

export default FetchProposal;
