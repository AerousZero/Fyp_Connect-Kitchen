import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import Navbar from "../../NavBar";
import Footer from "../../Footer";

const ChatMessage = ({ text, sender }) => {
  console.log(text)
  return (
    <div className={`flex items-start ${sender ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`bg-${sender ? 'blue-500' : 'gray-200'} text-${sender ? 'white' : 'black'} rounded-lg p-2 max-w-xs`}>
        {text}
      </div>
    </div>
  );
};

const ChatWindow = ({ profile, socket }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      console.log(event.data, "data")
      const message= JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages,  message]);
    };

    return () => {
      socket.onmessage = null;
    };
  }, [socket]);

  const sendMessage = (messageContent) => {
    socket.send(JSON.stringify({ message: messageContent }));
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      sendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-white">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-2">
          <Avatar src="profile.jpg" />
          <div className="font-semibold">{profile.name}</div>
        </div>
        <div className="flex items-center"></div>
      </div>
      <div className="flex flex-col flex-grow px-4 py-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {/* Chat messages */}
        {messages.map((message, index) => (
          <ChatMessage key={index} text={message.message} sender={message.sender === profile.name} />
        ))}
      </div>
      <div className="flex justify-between items-center bg-gray-100 px-4 py-3 border-t border-gray-200">
        <input
          type="text"
          className="flex-grow px-3 py-2 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendMessage} className="ml-4 text-blue-500 hover:text-blue-700">
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="3" x2="21" y2="21"></line>
            <line x1="3" y1="21" x2="21" y2="3"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

const ChatList = ({ setProfile }) => {
  const [isActive, setIsActive] = useState(0); // Defaulting the first message as active
  
  const profiles = [
    { name: "John Doe", active: false },
    { name: "Jane Doe", active: false },
    { name: "Alice", active: false },
    { name: "Bob", active: false },
    { name: "Charlie", active: false }
  ];

  const handleProfileClick = (index) => {
    setIsActive(index);
    setProfile(profiles[index]);
  };

  return (
    <div className="w-80 m-4">
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        Messages
      </div>
      <div className="overflow-y-auto h-screen">
        {profiles.map((profile, index) => (
          <div 
            key={index} 
            className={`px-4 py-3 border-b border-gray-200 rounded mb-5 ${isActive === index ? 'bg-green-500' : 'bg-white'}`}
            onClick={() => handleProfileClick(index)} // Update active message on click
          >
            <div className="flex items-center">
              <Avatar src="profile.jpg" />
              <div className="flex flex-wrap ml-3">
                <div className="font-semibold">{profile.name}</div>
              </div>
            </div>
            <div className="text-sm text-gray-600 ml-10">How are you?</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserProfile = ({ profile }) => {
  return (
    <div className="flex items-center px-4 py-3 border-b border-gray-200">
      <Avatar src="profile.jpg" />
      <div>
        <div className="font-semibold">{profile.name}</div>
        <div className="text-sm text-gray-600">Active 5m ago</div>
      </div>
    </div>
  );
};

const MessengerPage = () => {
  const [profile, setProfile] = useState({ name: "John Doe" });
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/chat/");
    
    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <Navbar />
      <section className="flex  mt-5">
        <ChatList setProfile={setProfile} />
        <ChatWindow profile={profile} socket={socket} />
      </section>
      <Footer />
    </div>
  );
};

export default MessengerPage;
