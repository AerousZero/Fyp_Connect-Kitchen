import React from 'react';

// Static array of messages
const messages = [
  { id: 1, text: 'Hello, how are you?' },
  { id: 2, text: 'I\'m good, thank you!' },
  { id: 3, text: 'Do you have any plans for the weekend?' },
  { id: 4, text: 'Not really, just relaxing at home.' },
  { id: 5, text: 'Sounds nice!' },
];

function MessageList() {
  return (
    <div className="max-w-xs mx-auto p-8 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <img src="profile.jpg" alt="Profile Picture" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h3 className="font-semibold">John Doe</h3>
            <p>How are you?</p>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <img src="group.jpg" alt="Group Picture" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h3 className="font-semibold">Group Chat</h3>
            <p>5 new messages</p>
          </div>
        </div>
        {/* More chat list items */}
      </div>
    </div>
  );
}

export default MessageList;
