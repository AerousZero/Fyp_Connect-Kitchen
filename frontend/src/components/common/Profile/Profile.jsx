import React from 'react';

function Profile({ user }) {
  const { first, title, location, hourlyRate, skills, bio } = user;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:h-full md:w-48" src="profile-picture.jpg" alt="Profile Picture" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{name}</div>
          <p className="block mt-1 text-lg leading-tight font-semibold text-gray-900">{title}</p>
          <p className="mt-2 text-gray-600">{location}</p>
          <p className="mt-2 text-gray-600">{hourlyRate}</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
            <ul className="mt-2 text-gray-600">
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900">Bio</h3>
            <p className="mt-2 text-gray-600">{bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
