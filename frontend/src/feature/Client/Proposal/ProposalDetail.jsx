import React, { useState, useEffect } from "react";
import ClientLayout from "../Layout";
import Cookies from "js-cookie";
import { useParams } from "react-router";
import {
  approvedProposal,
  fetchJobById,
  getJobProposalById,
  hireProposal,
} from "../../../api/job";
import { Modal, notification } from "antd";

function ProposalDetails() {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [proposal, setProposal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    async function fetchJobDetails() {
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

    async function fetchProposalDetails() {
      try {
        setIsLoading(true);
        const token = Cookies.get("accessToken");
        const response = await getJobProposalById({ id, token });
        setProposal(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching proposal details:", error);
        setIsLoading(false);
      }
    }

    fetchJobDetails();
    fetchProposalDetails();
  }, [id]);

  const handleAcceptanceToggle = async () => {
    try {
      setIsLoading(true);
      const token = Cookies.get("accessToken");
      const updatedProposal = {
        ...proposal,
        is_shortlisted: !proposal.is_shortlisted,
      };
      const response = await approvedProposal({
        id: proposal.id,
        token,
        data: updatedProposal,
      });
      if (response.status === 200) {
        notification.success({ message: response.data.message });
        window.location.reload();
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating proposal:", error);
      setIsLoading(false);
    }
  };

  const handleHireConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleConfirmHire = async () => {
    try {
      setIsLoading(true);
      const token = Cookies.get("accessToken");
      const updatedProposal = {
        ...proposal,
        is_hired: true,
      };
      const response = await hireProposal({
        id: proposal.id,
        token,
        data: updatedProposal,
      });
      if (response.status === 200) {
        notification.success({ message: response.data.message });
        window.location.reload();
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error hiring proposal:", error);
      setIsLoading(false);
    }
    setShowConfirmation(false);
  };

  const handleCancelHire = () => {
    setShowConfirmation(false);
  };

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

  return (
    <ClientLayout>
      {jobDetails && (
        <div>
          <h1 className="text-xl font-bold text-green-500">
            {jobDetails.job.title}
          </h1>
          <p className="text-gray-600">{jobDetails.job.description}</p>
        </div>
      )}
      <div className="mt-4">
        <span className="flex text-sm text-gray-500">
          Proposal Details for {jobDetails?.job.title} job by{" "}
          {proposal?.user.name}
        </span>
        <hr className="my-6 border-gray-200" />
        <div className="flex flex-col gap-2 border-b border-gray-200 pb-2 mb-2">
          <div className="flex flex-col justify-between w-full">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="text-sm font-bold text-gray-500">
                  Personal Details
                </span>
                <span className="flex-end">
                  {proposal?.is_hired
                    ? renderHiredMessage() || renderShortlistedMessage() || ""
                    : null}
                </span>
              </div>
              <div className="flex gap-6">
                <p className="text-xs font-semibold text-gray-500">
                  Full Name: {proposal?.user.name}
                </p>
                <p className="text-xs font-semibold text-gray-500">
                  Email: {proposal?.user.email}
                </p>
                <p className="text-xs font-semibold text-gray-500">
                  Cover Letter: {proposal?.cover_letter}
                </p>
                <p className="text-xs font-semibold text-gray-500">
                  Description: {proposal?.description}
                </p>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200" />
          <div className="flex flex-col gap-4">
            <span className="text-sm font-bold text-gray-500">
              {proposal?.user.name} Rate
            </span>
            <div className="gap-4">
              <p className="text-xs font-semibold text-gray-500">
                {proposal?.rate}
              </p>
            </div>
          </div>
          <hr className="my-6 border-gray-200" />
          <div className="flex flex-col gap-4">
            <span className="text-sm font-bold text-gray-500">
              {proposal?.user.name} Cover Letter
            </span>
            <div className="gap-4">
              <p className="text-xs font-semibold text-gray-500">
                {proposal?.cover_letter}
              </p>
            </div>
          </div>
          <hr className="my-6 border-gray-200" />
          <div className="flex flex-col gap-4">
            <span className="text-sm font-bold text-gray-500">
              {proposal?.user.name} Description
            </span>
            <div className="gap-4">
              <p className="text-xs font-semibold text-gray-500">
                {proposal?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-1">
        <div className="flex gap-1">
          {proposal && proposal.is_shortlisted ? (
            <button
              className="bg-green-500 text-white w-50 px-2 py-1 rounded-full text-xs font-semibold"
              onClick={proposal.is_hired ? null : handleHireConfirmation}
              disabled={proposal.is_hired}
            >
              {proposal.is_hired ? "Already Hired" : "Hire"}
            </button>
          ) : (
            <button
              className="bg-green-500 text-white w-50 px-2 py-1 rounded-full text-xs font-semibold"
              onClick={handleAcceptanceToggle}
            >
              Accept
            </button>
          )}
        </div>
      </div>
      <Modal
        title="Confirmation"
        visible={showConfirmation}
        onOk={handleConfirmHire}
        Hire
        onCancel={handleCancelHire}
        okText="Hire"
        okButtonProps={{ className: "bg-green-500 font-bold text-white" }}
      >
        <p>
          Do you want to hire{" "}
          <span className="font-bold text-black">{proposal?.user.name}</span>{" "}
          for this job?
        </p>
      </Modal>
    </ClientLayout>
  );
}

export default ProposalDetails;
