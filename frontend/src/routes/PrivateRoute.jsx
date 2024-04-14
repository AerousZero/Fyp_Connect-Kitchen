import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../page/NotFound";
import ChefHomePage from "../page/Chef/HomePage";
import ClientHomepage from "../page/Client/Homepage";
import CreateJob from "../feature/Client/Jobs/CreateJob";
import ClientProfile from "../page/Client/Profile";
import JobDetails from "../feature/Chef/JobDetails/JobDetails";
import AddProposal from "../feature/Chef/AddProposal/AddProposal";
import Details from "../feature/Client/Jobs/Details";
import FetchProposal from "../feature/Client/Proposal/FetchProposal";
import ProposalDetails from "../feature/Client/Proposal/ProposalDetail";

export const PrivateRoutes = () => {
  return (
    <Routes>s
      <Route path="/chef/home" element={<ChefHomePage />} />
      <Route path="/client/home" element={<ClientHomepage />} />
      
       <Route path="/client/create-job" element={<CreateJob />} />
       <Route path="/job/details/:id" element={<JobDetails/>} />
       <Route path="client/job/details/:id" element={<Details/>} />
       <Route path="/client/job/proposal/:id" element={<FetchProposal/>} />
       <Route path="/client/job/proposal/details/:id" element={<ProposalDetails/>} />
       <Route path="/job/details/:id/apply" element={<AddProposal/>} />

      {/* <Route path="/admin/home" element={<Admin />} /> */}
      <Route path="/client/profile" element={<ClientProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
