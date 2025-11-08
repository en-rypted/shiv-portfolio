import React, { useState, useEffect, useRef } from "react";
import { FaComments, FaPaperPlane } from "react-icons/fa";

const ChatBot = () => {
  const [ws, setWs] = useState(null);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const msgEndRef = useRef(null);
    const prodUrl = "wss://personal-chatbot-hp83.onrender.com/ws/chat"
    const devUrl = "ws://localhost:8000/ws/chat"
  useEffect(() => {
    
    const socket = new WebSocket(prodUrl);
    socket.onmessage = (e) =>
      setMessages((prev) => [...prev, { sender: "bot", text: e.data }]);
    setWs(socket);
    return () => socket.close();
  }, []);

  const sendMsg = () => {
    if (!input.trim()) return;
    ws.send(input);
    setMessages((prev) => [...prev, { sender: "me", text: input }]);
    setInput("");
  };

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Chat Icon */}
      {!open && (
        <button
          className="chat-icon"
          onClick={() => setOpen(true)}
          title="Chat with me!"
        >
          <FaComments size={28} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="chat-container">
          <div className="chat-header">
            <span>Chat with Shiv</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={msgEndRef} />
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMsg()}
              placeholder="Type a message..."
            />
            <button onClick={sendMsg}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}

      {/* Layout Styles */}
      <style>{`
        .chat-icon {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #222;
          color: white;
          border-radius: 50%;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
        }

        .chat-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 320px;
          background: white;
          border-radius: 12px;
          box-shadow: 0px 0px 20px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chat-header {
          background: #222;
          color: white;
          padding: 10px;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-body {
          height: 400px;
          overflow-y: auto;
          padding: 10px;
          background: #f5f5f5;
        }

        .msg {
          margin: 6px 0;
          max-width: 80%;
          padding: 8px 12px;
          border-radius: 10px;
          line-height: 1.4;
        }
        .msg.me {
          background: #ffb300ff;
          color: white;
          margin-left: auto;
          border-bottom-right-radius: 0;
        }
        .msg.bot {
          background: #252525ff;
          border-bottom-left-radius: 0;
        }

        .chat-input {
          display: flex;
          border-top: 1px solid #ddd;
        }
        .chat-input input {
          flex: 1;
          padding: 10px;
          border: none;
          outline: none;
        }
        .chat-input button {
          background: #222;
          color: white;
          width: 50px;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default ChatBot;