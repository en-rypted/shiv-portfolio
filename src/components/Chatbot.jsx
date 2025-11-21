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
// import "./ChatBot.css"; 

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
          className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-primary text-navy rounded-full shadow-lg flex items-center justify-center hover:bg-primary/80 transition-all duration-300 hover:scale-110 animate-bounce-slow"
          onClick={() => setOpen(true)}
          title="Chat with me!"
          aria-label="Open chat"
        >
          <FaComments size={24} />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-[9999] w-80 sm:w-96 bg-navy/90 backdrop-blur-md border border-lightest-navy rounded-xl shadow-2xl flex flex-col overflow-hidden h-[500px] animate-fade-in-up">
          <div className="bg-light-navy/80 px-4 py-3 flex items-center justify-between border-b border-lightest-navy">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${connected ? "bg-green-500" : "bg-red-500"} animate-pulse`}></span>
              <span className="font-bold text-slate-200">Shiv Assistant</span>
            </div>
            <button
              className="text-slate-400 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ✖
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-lightest-navy scrollbar-track-transparent">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${m.sender === 'me'
                    ? 'bg-primary text-navy rounded-br-none'
                    : 'bg-light-navy text-slate-300 rounded-bl-none'
                  }`}>
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-light-navy p-3 rounded-lg rounded-bl-none flex gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}

            <div ref={msgEndRef} />
          </div>

          <div className="p-3 bg-light-navy/50 border-t border-lightest-navy flex gap-2 items-end">
            <textarea
              ref={textareaRef}
              className="flex-1 bg-navy/50 border border-lightest-navy rounded-lg p-2 text-sm text-slate-300 focus:outline-none focus:border-primary resize-none max-h-32 scrollbar-hide"
              placeholder="Type a message..."
              value={input}
              onChange={onChangeInput}
              onKeyDown={onKeyDown}
              rows={1}
            />
            <button
              className="p-2 bg-primary text-navy rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
