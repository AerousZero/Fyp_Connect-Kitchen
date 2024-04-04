import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { updateUser } from "../../../api/auth";
import { notification } from "antd";

// Profile component for clients
function ClientProfile({ user }) {
  const { firstName, lastName, location, bio, email } = user;

  // State variables for edited values and edit mode
  const [editedFirstName, setEditedFirstName] = useState(firstName);
  const [editedLastName, setEditedLastName] = useState(lastName);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedLocation, setEditedLocation] = useState(location);
  const [editedBio, setEditedBio] = useState(bio);

  // Functions to handle saving changes
  const handleSaveName = () => {
    const userData = { firstName: editedFirstName, lastName: editedLastName };
    updateUser(userData)
      .then((response) => {
        notification.success({ message: response.message });
      })
      .catch((error) => {
        notification.error({ message: error.response.data.message });
      });
  };

  const handleSaveEmail = () => {
    const userData = { email: editedEmail };
    updateUser(userData)
      .then((response) => {
        notification.success({ message: response.message });
      })
      .catch((error) => {
        notification.error({ message: error.response.data.message });
      });
  };

  const handleSaveLocation = () => {
    const userData = { email: editedLocation };
    updateUser(userData)
      .then((response) => {
        notification.success({ message: response.message });
      })
      .catch((error) => {
        notification.error({ message: error.response.data.message });
      });
  };

  // Render JSX
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">
          Profile
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 relative">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              <input
                type="text"
                value={editedFirstName}
                onChange={(e) => setEditedFirstName(e.target.value)}
              />
              <input
                type="text"
                value={editedLastName}
                onChange={(e) => setEditedLastName(e.target.value)}
              />
              <button
                className="text-indigo-600 hover:text-indigo-900 ml-2"
                onClick={handleSaveName}
              >
                Save
              </button>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 relative">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
              <button
                className="text-indigo-600 hover:text-indigo-900 ml-2"
                onClick={handleSaveEmail}
              >
                Save
              </button>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 relative">
            <dt className="text-sm font-medium text-gray-500">Location</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              <input
                type="text"
                value={editedLocation}
                onChange={(e) => setEditedLocation(e.target.value)}
              />
              <button
                className="text-indigo-600 hover:text-indigo-900 ml-2"
                onClick={handleSaveLocation}
              >
                Save
              </button>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 relative">
            <dt className="text-sm font-medium text-gray-500">Bio</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              <textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
              />
              <button
                className="text-indigo-600 hover:text-indigo-900 ml-2"
                onClick={handleSaveBio}
              >
                Save
              </button>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function ChefProfile({ user }) {
  const {
    firstName,
    lastName,
    email,
    location,
    hourlyRate,
    experience,
    skills,
  } = user;
  const [editingName, setEditingName] = useState(false);
  const [editedName, setEditedName] = useState(firstName + " " + lastName);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editingLocation, setEditingLocation] = useState(false);
  const [editedLocation, setEditedLocation] = useState(location);
  const [editingHourlyRate, setEditingHourlyRate] = useState(false);
  const [editedHourlyRate, setEditedHourlyRate] = useState(hourlyRate);
  const [editingExperience, setEditingExperience] = useState(false);
  const [editedExperience, setEditedExperience] = useState(experience);
  const [editingSkills, setEditingSkills] = useState(false);
  const [editedSkills, setEditedSkills] = useState(skills);

  const handleSaveName = () => {
    const [newFirstName, newLastName] = editedName.split(" ");
    const userData = { first_name: newFirstName, last_name: newLastName };
    updateUser(userData)
      .then((response) => {
        notification.success({ message: response.message });
        setEditingName(false);
      })
      .catch((error) => {
        notification.success({ message: error.response.message });
      });
  };

  const handleSaveEmail = () => {
    const userData = { email: editedEmail };
    updateUser(userData)
      .then((response) => {
        notification.success({ message: response.message });
        console.log(response.data.message);
        setEditingEmail(false);
      })
      .catch((error) => {
        notification.success({ message: error.response.message });
      });
  };

  const handleSaveLocation = () => {
    const userData = { location: editedLocation };
    updateUser(userData)
      .then((response) => {
        notification.success({ message: response.message });
        console.log(response.data.message);
        setEditingLocation(false);
      })
      .catch((error) => {
        notification.success({ message: error.response.message });
      });
  };

  const handleSaveHourlyRate = () => {
    const userData = { hourlyRate: editedHourlyRate };
    updateUser(userData)
      .then((response) => {
        notification.success({ message: response.message });
        console.log(response.data.message);
        setEditingHourlyRate(false);
      })
      .catch((error) => {
        notification.success({ message: error.response.message });
      });
  };

  const handleSaveExperience = () => {
    const userData = { experience: editedExperience };
    updateUser(userData)
      .then((response) => {
        notification.success({ message: response.message });
        console.log(response.data.message);
        setEditingExperience(false);
      })
      .catch((error) => {
        notification.success({ message: error.response.message });
      });
  };

  const handleSaveSkills = () => {
    const userData = { skills:  editedSkills.split(',').map(skill => skill.trim()) };
    updateUser(userData)
      .then((response) => {
        notification.success({ message: response.message });
        setEditingSkills(false);
      })
      .catch((error) => {
        notification.success({ message: error.response.message });
      });
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">
          Profile
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 relative">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              {editingName ? (
                <>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                  <button
                    className="text-indigo-600 hover:text-indigo-900 ml-2"
                    onClick={handleSaveName}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {firstName} {lastName}
                  <button
                    className="text-indigo-600 hover:text-indigo-900 ml-2"
                    aria-label="Edit Name"
                    onClick={() => setEditingName(true)}
                  >
                    <FaEdit />
                  </button>
                </>
              )}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 relative">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              {editingEmail ? (
                <>
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                  <button
                    className="text-indigo-600 hover:text-indigo-900 ml-2"
                    onClick={handleSaveEmail}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {email}
                  <button
                    className="text-indigo-600 hover:text-indigo-900 ml-2"
                    aria-label="Edit Email"
                    onClick={() => setEditingEmail(true)}
                  >
                    <FaEdit />
                  </button>
                </>
              )}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 relative">
            <dt className="text-sm font-medium text-gray-500">Location</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              {editingLocation ? (
                <>
                  <input
                    type="text"
                    value={editedLocation}
                    onChange={(e) => setEditedLocation(e.target.value)}
                  />
                  <button
                    className="text-indigo-600 hover:text-indigo-900 ml-2"
                    onClick={handleSaveLocation}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {location}
                  <button
                    className="text-indigo-600 hover:text-indigo-900 ml-2"
                    aria-label="Edit Location"
                    onClick={() => setEditingLocation(true)}
                  >
                    <FaEdit />
                  </button>
                </>
              )}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 relative">
            <dt className="text-sm font-medium text-gray-500">Hourly Rate</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              {editingHourlyRate ? (
                <>
                  <input
                    type="number"
                    value={editedHourlyRate}
                    onChange={(e) => setEditedHourlyRate(e.target.value)}
                  />
                  <button
                    className="text-indigo-600 hover:text-indigo-900 ml-2"
                    onClick={handleSaveHourlyRate}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {hourlyRate}
                  <button
                    className="text-indigo-600 hover:text-indigo-900 ml-2"
                    aria-label="Edit Hourly Rate"
                    onClick={() => setEditingHourlyRate(true)}
                  >
                    <FaEdit />
                  </button>
                </>
              )}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 relative">
            <dt className="text-sm font-medium text-gray-500">
              Years of Experience
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              {editingExperience ? (
                <>
                  <input
                    type="number"
                    value={editedExperience}
                    onChange={(e) => setEditedExperience(e.target.value)}
                  />
                  <button
                    className="text-indigo-600 hover:text-indigo-900 ml-2"
                    onClick={handleSaveExperience}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {experience}
                  <button
                    className="text-indigo-600 hover:text-indigo-900 ml-2"
                    aria-label="Edit Experience"
                    onClick={() => setEditingExperience(true)}
                  >
                    <FaEdit />
                  </button>
                </>
              )}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 relative">
  <dt className="text-sm font-medium text-gray-500">Skills</dt>
  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
    {editingSkills ? (
      <>
        <input
          type="text"
          value={editedSkills}
          onChange={(e) => setEditedSkills(e.target.value)}
        />
        <button
          className="text-indigo-600 hover:text-indigo-900 ml-2"
          onClick={handleSaveSkills}
        >
          Save
        </button>
      </>
    ) : (
      <>
        {skills && skills.length > 0 ? (
          <>
            {skills.map((skill, index) => (
              <span key={index}>
                {skill}
                {index !== skills.length - 1 && ', '} {/* Add comma after each skill except the last one */}
              </span>
            ))}
          </>
        ) : (
          <span>No skills</span>
        )}
        <button
          className="text-indigo-600 hover:text-indigo-900 ml-2"
          aria-label="Edit Skills"
          onClick={() => setEditingSkills(true)}
        >
          <FaEdit />
        </button>
      </>
    )}
  </dd>
</div>


        </dl>
      </div>
    </div>
  );
}

// Profile component with conditional rendering based on user type
function Profile({ user }) {
  const isChef = user.role?.name === "chef";
  return isChef ? <ChefProfile user={user} /> : <ClientProfile user={user} />;
}

export default Profile;
