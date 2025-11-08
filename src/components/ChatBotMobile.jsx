import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

const ChatBotMobile = ({ onClose }) => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const msgEndRef = useRef(null);

  const prodUrl = "wss://personal-chatbot-hp83.onrender.com/ws/chat";

  useEffect(() => {
    const socket = new WebSocket(prodUrl);
    socket.onmessage = (e) =>
      setMessages((prev) => [...prev, { sender: "bot", text: e.data }]);
    setWs(socket);
    return () => socket.close();
  }, []);

//   useEffect(() => {
//   const handleFocus = () => {
//     setTimeout(() => {
//       msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 200);
//   };
//   const input = document.querySelector(".mobile-chat-input input");
//   input?.addEventListener("focus", handleFocus);
//   return () => input?.removeEventListener("focus", handleFocus);
// }, []);

// // ✅ Fix for mobile keyboard pushing input off-screen
// useEffect(() => {
//   const onResize = () => {
//     const vh = window.visualViewport?.height;
//     if (vh) {
//       document.querySelector(".mobile-chat-wrapper").style.height = vh + "px";
//     }
//   };

//   window.visualViewport?.addEventListener("resize", onResize);
//   return () => window.visualViewport?.removeEventListener("resize", onResize);
// }, []);

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
    <div className="mobile-chat-wrapper">
      <div className="mobile-chat-header">
       <button className="back-btn" onClick={onClose}>
    <FaArrowLeft size={18} />
  </button>
  <span>Shiv's Assistant</span>
        </div>

      <div className="mobile-chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={msgEndRef} />
      </div>

      <div className="mobile-chat-input">
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

      <style>{`
        .mobile-chat-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh; 
  display: flex;
  flex-direction: column;
  background: #111;
  z-index: 9999;
}
         .mobile-chat-header {
    padding: 14px;
    font-size: 18px;
    font-weight: bold;
    background: #222;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #333;
  }
  .mobile-chat-header span {
    margin-left: 10px;
  }
  .back-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
  }
        .mobile-chat-body {
          flex: 1;
          padding: 12px;
          overflow-y: auto;
          background: #181818;
           padding-bottom: 80px;
        }
        .msg {
          margin: 6px 0;
          max-width: 85%;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 15px;
        }
        .msg.me {
          background: #ffb300;
          color: black;
          margin-left: auto;
          border-bottom-right-radius: 0;
        }
        .msg.bot {
          background: #333;
          color: white;
          border-bottom-left-radius: 0;
        }
        .mobile-chat-input {
          display: flex;
          background: #222;
          padding: 10px;
        }
        .mobile-chat-input input {
          flex: 1;
          padding: 10px;
          border: none;
          background: #111;
          color: white;
          outline: none;
          border-radius: 6px;
        }
        .mobile-chat-input button {
          background: #ffb300;
          border: none;
          padding: 0 14px;
          margin-left: 8px;
          border-radius: 6px;
          color: black;
        }
      `}</style>
    </div>
  );
};

export default ChatBotMobile;
