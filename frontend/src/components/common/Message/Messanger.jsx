import React from 'react';

function Messenger() {
  return (
    <div className="max-w-2xl mx-auto p-8 border rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Chat with John Doe</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Close</button>
      </div>
      <div className="max-h-64 overflow-y-auto mb-4">
        <div className="bg-gray-100 p-4 rounded mb-2">
          <div className="font-semibold mb-1">John Doe</div>
          <div className="text-sm text-gray-600">10:00 AM</div>
          <div className="bg-blue-100 p-2 rounded">Hello! How are you?</div>
        </div>
        <div className="bg-gray-300 p-4 rounded mb-2 text-right">
          <div className="text-sm text-gray-600">10:05 AM</div>
          <div className="bg-blue-200 p-2 rounded inline-block">Hi John! I'm doing well, thank you.</div>
        </div>
        {/* More messages */}
      </div>
      <div className="flex">
        <input type="text" className="flex-1 px-4 py-2 border rounded" placeholder="Type your message..." />
        <button className="px-4 py-2 bg-blue-500 text-white rounded ml-2">Send</button>
      </div>
    </div>
  );
}

export default Messenger;
