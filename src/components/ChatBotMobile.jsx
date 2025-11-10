// import React, { useState, useEffect, useRef } from "react";
// import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

// const ChatBotMobile = ({ onClose }) => {
//   const [ws, setWs] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const msgEndRef = useRef(null);
//   const [isTyping, setIsTyping] = useState(false);

//   const prodUrl = "wss://personal-chatbot-hp83.onrender.com/ws/chat";

//   useEffect(() => {
//     const socket = new WebSocket(prodUrl);
//     socket.onmessage = (e) =>
//      socket.onmessage = (e) => {
//   setIsTyping(false);   // ✅ hide typing
//   setMessages((prev) => [...prev, { sender: "bot", text: e.data }]);
// };
//     setWs(socket);
//     return () => socket.close();
//   }, []);

// //   useEffect(() => {
// //   const handleFocus = () => {
// //     setTimeout(() => {
// //       msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //     }, 200);
// //   };
// //   const input = document.querySelector(".mobile-chat-input input");
// //   input?.addEventListener("focus", handleFocus);
// //   return () => input?.removeEventListener("focus", handleFocus);
// // }, []);

// // // ✅ Fix for mobile keyboard pushing input off-screen
// // useEffect(() => {
// //   const onResize = () => {
// //     const vh = window.visualViewport?.height;
// //     if (vh) {
// //       document.querySelector(".mobile-chat-wrapper").style.height = vh + "px";
// //     }
// //   };

// //   window.visualViewport?.addEventListener("resize", onResize);
// //   return () => window.visualViewport?.removeEventListener("resize", onResize);
// // }, []);

//   const sendMsg = () => {
//     if (!input.trim()) return;
//     ws.send(input);
//     setMessages((prev) => [...prev, { sender: "me", text: input }]);
//     setInput("");
//     setIsTyping(true);  
//   };

//   useEffect(() => {
//     msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="mobile-chat-wrapper">
//       <div className="mobile-chat-header">
//        <button className="back-btn" onClick={onClose}>
//     <FaArrowLeft size={18} />
//   </button>
//   <span>Shiv's Assistant</span>
//         </div>

//       <div className="mobile-chat-body">
//         {messages.map((msg, i) => (
//           <div key={i} className={`msg ${msg.sender}`}>
//             {msg.text}
//           </div>
//         ))}
//         {isTyping && (
//   <div className="msg bot typing">
//     <span className="dot"></span>
//     <span className="dot"></span>
//     <span className="dot"></span>
//   </div>
// )}
//         <div ref={msgEndRef} />
//       </div>

//       <div className="mobile-chat-input">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMsg()}
//           placeholder="Type a message..."
//         />
//         <button onClick={sendMsg}>
//           <FaPaperPlane />
//         </button>
//       </div>

//       <style>{`
//         .mobile-chat-wrapper {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100dvh; 
//   display: flex;
//   flex-direction: column;
//   background: #111;
//   z-index: 9999;
// }
//          .mobile-chat-header {
//     padding: 14px;
//     font-size: 18px;
//     font-weight: bold;
//     background: #222;
//     display: flex;
//     align-items: center;
//     border-bottom: 1px solid #333;
//   }
//   .mobile-chat-header span {
//     margin-left: 10px;
//   }
//   .back-btn {
//     background: none;
//     border: none;
//     color: white;
//     cursor: pointer;
//     padding: 4px;
//   }
//         .mobile-chat-body {
//           flex: 1;
//           padding: 12px;
//           overflow-y: auto;
//           background: #181818;
//            padding-bottom: 80px;
//         }
//         .msg {
//           margin: 6px 0;
//           max-width: 85%;
//           padding: 10px 14px;
//           border-radius: 12px;
//           font-size: 15px;
//         }
//         .msg.me {
//           background: #ffb300;
//           color: black;
//           margin-left: auto;
//           border-bottom-right-radius: 0;
//         }
//         .msg.bot {
//           background: #333;
//           color: white;
//           border-bottom-left-radius: 0;
//         }
//         .mobile-chat-input {
//           display: flex;
//           background: #222;
//           padding: 10px;
//         }
//         .mobile-chat-input input {
//           flex: 1;
//           padding: 10px;
//           border: none;
//           background: #111;
//           color: white;
//           outline: none;
//           border-radius: 6px;
//         }
//         .mobile-chat-input button {
//           background: #ffb300;
//           border: none;
//           padding: 0 14px;
//           margin-left: 8px;
//           border-radius: 6px;
//           color: black;
//         }
//           .msg.typing {
//   display: flex;
//   gap: 4px;
//   width: fit-content;
//   background: #252525ff;
//   color: white;
//   padding: 8px 12px;
//   border-radius: 10px;
//   opacity: 0.8;
// }

// .dot {
//   width: 6px;
//   height: 6px;
//   background: white;
//   border-radius: 50%;
//   animation: blink 1.4s infinite both;
// }

// .dot:nth-child(2) { animation-delay: 0.2s; }
// .dot:nth-child(3) { animation-delay: 0.4s; }

// @keyframes blink {
//   0% { opacity: .2; }
//   20% { opacity: 1; }
//   100% { opacity: .2; }
// }

//       `}</style>
//     </div>
//   );
// };

// export default ChatBotMobile;


import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { useAlert } from "../context/AlertContext";
import "./ChatBotMobile.css";

const ChatBotMobile = ({ onClose }) => {
  const [ws, setWs] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const msgEndRef = useRef(null);
  const textareaRef = useRef(null);
  const [status, setStatus] = useState("connecting"); 
// "connecting" | "connected" | "reconnecting" | "disconnected"
  const { showAlert } = useAlert?.() || { showAlert: () => {} };

    const WS_URL ="wss://personal-chatbot-hp83.onrender.com/ws/chat";

  // useEffect(() => {
  //   const socket = new WebSocket(WS_URL);

  //   socket.onopen = () => setConnected(true);
  //   socket.onclose = () => {
  //     setConnected(false);
  //     setIsTyping(false);
  //   };
  //   socket.onerror = () => {
  //     setConnected(false);
  //   };
  //   socket.onmessage = (e) => {
  //     setIsTyping(false);
  //     setMessages((prev) => [...prev, { role: "assistant", content: e.data }]);
  //   };

  //   setWs(socket);
  //   return () => socket.close();
  // }, [WS_URL]);

   useEffect(() => {
    let socket;
    let reconnectTimer;
  
    const connect = () => {
      setStatus(prev => (prev === "connected" ? prev : "connecting"));
      socket = new WebSocket(WS_URL);
  
      socket.onopen = () => {
        setConnected(true);
        setStatus("connected");
        setIsTyping(false);
      };
  
      socket.onmessage = (e) => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { role: "assistant", content: e.data }]);
      };
  
      socket.onerror = () => {
        console.log("WebSocket error — reconnecting soon...");
        socket.close();
      };
  
      // socket.onclose = () => {
      //   setConnected(false);
      //   setIsTyping(false);
      //   setStatus("reconnecting");
  
      //   // 🔁 Try reconnecting every 5 seconds
      //   reconnectTimer = setTimeout(connect, 5000);
      // };
  
      socket.onclose = () => {
    setTimeout(() => {
      setStatus("reconnecting");
    }, 1000);
    reconnectTimer = setTimeout(connect, 5000);
  };
    };
  
    connect(); // first connect attempt
  
    return () => {
      clearTimeout(reconnectTimer);
      socket && socket.close();
    };
  }, [WS_URL]);

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const onChange = (e) => {
    setInput(e.target.value);
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "48px";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const send = () => {
    if (!input.trim() || !ws || ws.readyState !== WebSocket.OPEN) return;
    try {
      ws.send(input);
      setMessages((prev) => [...prev, { role: "user", content: input }]);
      setInput("");
      setIsTyping(true);
      if (textareaRef.current) textareaRef.current.style.height = "48px";
    } catch {
      showAlert?.("Failed to send. Please try again.", "error");
    }
  };

  return (
    <div className="mobile-root">
      
      {/* Header */}
      <header className="mobile-header">
        <button className="back-btn" onClick={onClose}>
          <FaArrowLeft size={18} />
        </button>
        <span className="title">Shiv's Assistant</span>
        {/* <span className={`status ${connected ? "ok" : "down"}`}>
          {connected ? "● Online" : "● Offline"}
        </span> */}
               <div
  className={`gptx-status ${status}`}
>
  {status === "connected" && "🟢 Connected"}
  {status === "connecting" && "Connecting..."}
  {status === "reconnecting" && "Reconnecting..."}
  {status === "disconnected" && "🔴 Disconnected"}
</div>
      </header>

      {/* Chat area */}
      <main className="mobile-main">
        <div className="stream">

          {/* Default welcome message */}
          {messages.length === 0 && !isTyping && (
            <div className="bubble bot">
              Hey there! I'm Shiv's AI assistant.<br />
              How can I help you today? 😊
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.role}`}>
              {m.content}
            </div>
          ))}

          {isTyping && (
            <div className="bubble bot typing">
              <span className="tdot" /><span className="tdot" /><span className="tdot" />
            </div>
          )}

          <div ref={msgEndRef} />
        </div>
      </main>

      {/* Input */}
      <div className="mobile-inputbar">
        <textarea
          ref={textareaRef}
          className="mobile-input"
          placeholder="Type a message…"
          rows={1}
          value={input}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <button
          className="send-btn"
          onClick={send}
          disabled={!connected || !input.trim()}
        >
          <FaPaperPlane size={16} />
        </button>
      </div>

    </div>
  );
};

export default ChatBotMobile;
