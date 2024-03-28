import React, { useState } from "react";
import ClientLayout from "../Layout";
import { useForm } from "react-hook-form";

function CreateJob() {
     const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobDuration, setJobDuration] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [budgetType, setBudgetType] = useState("fixed");
  const [budget, setBudget] = useState("");
  const [hourlyRateFrom, setHourlyRateFrom] = useState("");
  const [hourlyRateTo, setHourlyRateTo] = useState("");
  const [contractToHire, setContractToHire] = useState(false);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [leftText, setLeftText] = useState({
    heading: "Let's start with a strong title.",
    description:
      "This helps your job post stand out to the right candidates. It’s the first thing they’ll see, so make it count!",
  });
  const [nextDisabled, setNextDisabled] = useState(true);

  const handleJobTitleChange = (event) => {
    const title = event.target.value;
    setJobTitle(title);
    setNextDisabled(title === "");
  };

  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  };

  const handleJobDurationChange = (event) => {
    setJobDuration(event.target.value);
  };

  const handleJobExperienceChange = (event) => {
    setJobExperience(event.target.value);
  };

  const handleBudgetTypeChange = (event) => {
    setBudgetType(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleHourlyRateFromChange = (event) => {
    setHourlyRateFrom(event.target.value);
  };

  const handleHourlyRateToChange = (event) => {
    setHourlyRateTo(event.target.value);
  };

  const handleContractToHireChange = (event) => {
    setContractToHire(event.target.checked);
  };

  const handleNext = (event) => {
    event.preventDefault();
    if (step === 1) {
      setStep(2);
      setLeftText({
        heading: "What are the main skills required for your work?",
        description: "",
      });
      setProgress(25);
    } else if (step === 2) {
      setStep(3);
      setLeftText({
        heading: "What's the scope of your project?",
        description: "Consider the time",
      });
      setProgress(50);
    } else if (step === 3) {
      setStep(4);
      setLeftText({
        heading: "Set your budget",
        description: "Choose the appropriate budget type",
      });
      setProgress(75);
    } else if (step === 4) {
      setStep(5);
      setLeftText({
        heading: "Enter job details",
        description: "",
      });
      setProgress(100);
    } else if (step === 5) {
      // Handle form submission
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setLeftText({
        heading: "Let's start with a strong title.",
        description:
          "This helps your job post stand out to the right candidates. It’s the first thing they’ll see, so make it count!",
      });
      setProgress(0);
    } else if (step === 3) {
      setStep(2);
      setLeftText({
        heading: "What are the main skills required for your work?",
        description: "",
      });
      setProgress(25);
    } else if (step === 4) {
      setStep(3);
      setLeftText({
        heading: "What's the scope of your project?",
        description: "Consider the time",
      });
      setProgress(50);
    } else if (step === 5) {
      setStep(4);
      setLeftText({
        heading: "Set your budget",
        description: "Choose the appropriate budget type",
      });
      setProgress(100);
    }
  };

  const onSubmit = (data) => {
    // Handle form submission with data
    console.log(data);
  };

  return (
    <ClientLayout>
      <div className="flex flex-col h-full">
        {/* Content */}
        <div className="flex-grow flex items-center justify-center">
          <div className="w-1/2 flex items-center justify-center flex-col">
            <div className="p-8">
              <span className="text-sm">{`${step}/5 Job post`}</span>
              <h1 className="text-2xl font-semibold mb-4">
                {leftText.heading}
              </h1>
              <span className="text-xs">{leftText.description}</span>
            </div>
          </div>

          <div className="w-1/2  flex items-center justify-center">
            <div className="max-w-md">
              <form onSubmit={handleNext} className="p-8">
                {step === 1 && (
                  <div className="mb-4">
                    <label
                      htmlFor="jobTitle"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Write a title for your job post
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      className="h-10 w-full rounded-md border border-black px-4 py-2"
                      value={jobTitle}
                      onChange={handleJobTitleChange}
                      placeholder="Enter job title"
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="mb-4">
                    <label
                      htmlFor="jobDescription"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Job Skills
                    </label>
                    <textarea
                      id="jobDescription"
                      className="h-20 w-full rounded-md border border-black px-4 py-2"
                      value={jobDescription}
                      onChange={handleJobDescriptionChange}
                      placeholder="Enter job description"
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="mb-4">
                    <label
                      htmlFor="jobDuration"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Job Duration
                    </label>
                    <input
                      type="text"
                      id="jobDuration"
                      className="h-10 w-full rounded-md border border-black px-4 py-2"
                      value={jobDuration}
                      onChange={handleJobDurationChange}
                      placeholder="Enter job duration"
                    />
                    <label
                      htmlFor="jobExperience"
                      className="block text-gray-700 font-bold mb-2 mt-4"
                    >
                      Job Experience
                    </label>
                    <input
                      type="text"
                      id="jobExperience"
                      className="h-10 w-full rounded-md border border-black px-4 py-2"
                      value={jobExperience}
                      onChange={handleJobExperienceChange}
                      placeholder="Enter job experience"
                    />
                  </div>
                )}

                {step === 4 && (
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Budget Type
                    </label>
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        id="budgetTypeFixed"
                        className="h-4 w-4 text-green-500 mr-2"
                        value="fixed"
                        checked={budgetType === "fixed"}
                        onChange={handleBudgetTypeChange}
                      />
                      <label htmlFor="budgetTypeFixed" className="mr-4">
                        Fixed Rate
                      </label>
                      <input
                        type="radio"
                        id="budgetTypeHourly"
                        className="h-4 w-4 text-green-500 mr-2"
                        value="hourly"
                        checked={budgetType === "hourly"}
                        onChange={handleBudgetTypeChange}
                      />
                      <label htmlFor="budgetTypeHourly">Hourly Rate</label>
                    </div>

                    {budgetType === "fixed" && (
                      <div className="mb-4">
                        <label
                          htmlFor="budget"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Budget
                        </label>
                        <input
                          type="text"
                          id="budget"
                          className="h-10 w-full rounded-md border border-black px-4 py-2"
                          value={budget}
                          onChange={handleBudgetChange}
                          placeholder="Enter budget"
                        />
                      </div>
                    )}

                    {budgetType === "hourly" && (
                      <div className="mb-4">
                        <label
                          htmlFor="hourlyRateFrom"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Hourly Rate Range (From)
                        </label>
                        <input
                          type="text"
                          id="hourlyRateFrom"
                          className="h-10 w-full rounded-md border border-black px-4 py-2"
                          value={hourlyRateFrom}
                          onChange={handleHourlyRateFromChange}
                          placeholder="Enter hourly rate from"
                        />{" "}
                        <span className="ml-2">/hr</span>
                        <label
                          htmlFor="hourlyRateTo"
                          className="block text-gray-700 font-bold mb-2 mt-4"
                        >
                          Hourly Rate Range (To)
                        </label>
                        <input
                          type="text"
                          id="hourlyRateTo"
                          className="h-10 w-full rounded-md border border-black px-4 py-2"
                          value={hourlyRateTo}
                          onChange={handleHourlyRateToChange}
                          placeholder="Enter hourly rate to"
                        />{" "}
                        <span className="ml-2">/hr</span>
                      </div>
                    )}
                  </div>
                )}

                {step === 5 && (
                  <div className="mb-4">
                    <label
                      htmlFor="jobDetails"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Job Details
                    </label>
                    <textarea
                      id="jobDetails"
                      className="h-20 w-full rounded-md border border-black px-4 py-2"
                      value={jobDescription} // Or whatever state variable you want to use for job details
                      onChange={handleJobDescriptionChange}
                      placeholder="Enter job details"
                    />
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="bg-gray-200 h-2">
          <div
            className="bg-blue-500 h-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            className={`bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 ${
              step === 1 ? "hidden" : ""
            }`}
          >
            Back
          </button>
          <button
            type="submit"
            onClick={handleNext}
            className={`bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 ${
              nextDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={nextDisabled}
          >
            {step === 5 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </ClientLayout>
  );
}

export default CreateJob;
