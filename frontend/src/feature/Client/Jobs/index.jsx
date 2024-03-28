import React from "react";

// Sample data of job listings
const jobListings = [];

function JobList() {
  return (
    <div className="font-bold">
      {jobListings.length > 0 ? (
        <>
          <h1 className="text-2xl font-semibold mb-4">List of Jobs</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobListings.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-700">{job.description}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
      <div className="flex items-center justify-center h-full">
          <div className="max-w-sm border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <div className="p-4">
              <p className="text-lg mb-4">No jobs posted yet.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobList;
