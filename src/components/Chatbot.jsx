// import React, { useState, useEffect, useRef } from "react";
// import { FaComments, FaPaperPlane } from "react-icons/fa";
// import { useAlert } from "../context/AlertContext";

// const ChatBot = () => {
//   const [ws, setWs] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const msgEndRef = useRef(null);
//   const [isTyping, setIsTyping] = useState(false);
//     const prodUrl = "wss://personal-chatbot-hp83.onrender.com/ws/chat"
//     const devUrl = "ws://localhost:8000/ws/chat"
//       const { showAlert } = useAlert();
//   useEffect(() => {
    
//     const socket = new WebSocket(prodUrl);
//     socket.onmessage = (e) => {
//         setIsTyping(false);   // ✅ hide typing
//         setMessages((prev) => [...prev, { sender: "bot", text: e.data }]);
//         };    
//     setWs(socket);
//     return () => socket.close();
//   }, []);

//   const sendMsg = () => {
//     if (!input.trim()) return;
//     try {
//       ws.send(input);
//       setMessages((prev) => [...prev, { sender: "me", text: input }]);
//       setInput("");
//       setIsTyping(true);
//     } catch (error) {
//         showAlert("Connection error. Please try again later.", "error");
//     }
//   };

//   useEffect(() => {
//     msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <>
//       {/* Floating Chat Icon */}
//       {!open && (
//         <button
//           className="chat-icon"
//           onClick={() => setOpen(true)}
//           title="Chat with me!"
//         >
//           <FaComments size={28} />
//         </button>
//       )}

//       {/* Chat Window */}
//       {open && (
//         <div className="chat-container">
//           <div className="chat-header">
//             <span>Chat with Shiv</span>
//             <button onClick={() => setOpen(false)}>✖</button>
//           </div>

//           <div className="chat-body">
//             {messages.map((msg, i) => (
//               <div key={i} className={`msg ${msg.sender}`}>
//                 {msg.text}
//               </div>
//             ))}
//             {isTyping && (
//             <div className="msg bot typing">
//                 <span className="dot"></span>
//                 <span className="dot"></span>
//                 <span className="dot"></span>
//             </div>
//             )}
//             <div ref={msgEndRef} />
//           </div>

//           <div className="chat-input">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMsg()}
//               placeholder="Type a message..."
//             />
//             <button onClick={sendMsg}>
//               <FaPaperPlane />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Layout Styles */}
//       <style>{`
//         .chat-icon {
//           position: fixed;
//           bottom: 24px;
//           right: 24px;
//           background: #222;
//           color: white;
//           border-radius: 50%;
//           width: 52px;
//           height: 52px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           border: none;
//         }

//         .chat-container {
//           position: fixed;
//           bottom: 24px;
//           right: 24px;
//           width: 320px;
//           background: white;
//           border-radius: 12px;
//           box-shadow: 0px 0px 20px rgba(0,0,0,0.15);
//           display: flex;
//           flex-direction: column;
//           overflow: hidden;
//         }

//         .chat-header {
//           background: #222;
//           color: white;
//           padding: 10px;
//           font-size: 14px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .chat-body {
//           height: 400px;
//           overflow-y: auto;
//           padding: 10px;
//           background: #f5f5f5;
//         }

//         .msg {
//           margin: 6px 0;
//           max-width: 80%;
//           padding: 8px 12px;
//           border-radius: 10px;
//           line-height: 1.4;
//         }
//         .msg.me {
//           background: #ffb300ff;
//           color: white;
//           margin-left: auto;
//           border-bottom-right-radius: 0;
//         }
//         .msg.bot {
//           background: #252525ff;
//           border-bottom-left-radius: 0;
//         }

//         .chat-input {
//           display: flex;
//           border-top: 1px solid #ddd;
//         }
//         .chat-input input {
//           flex: 1;
//           padding: 10px;
//           border: none;
//           outline: none;
//         }
//         .chat-input button {
//           background: #222;
//           color: white;
//           width: 50px;
//           border: none;
//           cursor: pointer;
//         }
//           .msg.typing {
//             display: flex;
//             gap: 4px;
//             width: fit-content;
//             background: #252525ff;
//             color: white;
//             padding: 8px 12px;
//             border-radius: 10px;
//             opacity: 0.8;
//             }

//             .dot {
//             width: 6px;
//             height: 6px;
//             background: white;
//             border-radius: 50%;
//             animation: blink 1.4s infinite both;
//             }

//             .dot:nth-child(2) { animation-delay: 0.2s; }
//             .dot:nth-child(3) { animation-delay: 0.4s; }

//             @keyframes blink {
//             0% { opacity: .2; }
//             20% { opacity: 1; }
//             100% { opacity: .2; }
//             }

//       `}</style>
//     </>
//   );
// };

// export default ChatBot;



import React, { useState, useEffect, useRef } from "react";
import { FaComments, FaPaperPlane } from "react-icons/fa";
import { useAlert } from "../context/AlertContext";
import "./ChatBot.css"; // ⬅️ add this import

const ChatBot = () => {
  const [ws, setWs] = useState(null);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [connected, setConnected] = useState(false);
  const msgEndRef = useRef(null);
  const textareaRef = useRef(null);

  const { showAlert } = useAlert();

  // Auto switch URL: local vs prod
  const WS_URL =
    import.meta?.env?.DEV
      ? "ws://localhost:8000/ws/chat"
      : "wss://personal-chatbot-hp83.onrender.com/ws/chat";

  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      setConnected(true);
    };

    socket.onclose = () => {
      setConnected(false);
      setIsTyping(false);
    };

    socket.onerror = () => {
      setConnected(false);
      showAlert?.("WebSocket connection error.", "error");
    };

    socket.onmessage = (e) => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "bot", text: e.data }]);
    };

    setWs(socket);
    return () => socket.close();
  }, [WS_URL, showAlert]);

  const sendMsg = () => {
    if (!input.trim() || !ws || ws.readyState !== WebSocket.OPEN) return;
    try {
      ws.send(input);
      setMessages((prev) => [...prev, { sender: "me", text: input }]);
      setInput("");
      setIsTyping(true);
      // shrink textarea back after send
      if (textareaRef.current) {
        textareaRef.current.style.height = "44px";
      }
    } catch {
      showAlert?.("Connection error. Please try again later.", "error");
    }
  };

  // auto scroll to last message
  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, open]);

  // auto-resize textarea
  const onChangeInput = (e) => {
    setInput(e.target.value);
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "44px";
    el.style.height = Math.min(el.scrollHeight, 140) + "px"; // cap growth
  };

  // Enter to send, Shift+Enter for newline
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMsg();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!open && (
        <button
          className="chatx-button"
          onClick={() => setOpen(true)}
          title="Chat with me!"
          aria-label="Open chat"
        >
          <FaComments size={22} />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="chatx-panel">
          <div className="chatx-header">
            <div className="chatx-title">
              <span className="dot-online" aria-hidden />
              Shiv Assistant
            </div>
            <div className={`chatx-status ${connected ? "ok" : "down"}`}>
              {connected ? "Connected" : "Disconnected"}
            </div>
            <button className="chatx-close" onClick={() => setOpen(false)} aria-label="Close chat">
              ✖
            </button>
          </div>

          <div className="chatx-body">
            {messages.map((m, i) => (
              <div key={i} className={`chatx-bubble ${m.sender}`}>
                <div className="chatx-text">{m.text}</div>
              </div>
            ))}

            {isTyping && (
              <div className="chatx-bubble bot typing">
                <span className="tick" />
                <span className="tick" />
                <span className="tick" />
              </div>
            )}

            <div ref={msgEndRef} />
          </div>

          <div className="chatx-inputbar">
            <textarea
              ref={textareaRef}
              className="chatx-input"
              placeholder="Type a message…  (Enter to send • Shift+Enter = new line)"
              value={input}
              onChange={onChangeInput}
              onKeyDown={onKeyDown}
              rows={1}
            />
            <button
              className="chatx-send"
              onClick={sendMsg}
              disabled={!connected || !input.trim()}
              aria-label="Send message"
              title={!connected ? "Not connected" : "Send"}
            >
              <FaPaperPlane size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
