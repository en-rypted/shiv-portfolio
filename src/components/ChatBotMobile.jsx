import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { useAlert } from "../context/AlertContext";

const ChatBotMobile = ({ onClose }) => {
  const [ws, setWs] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const msgEndRef = useRef(null);
  const textareaRef = useRef(null);
  const [status, setStatus] = useState("connecting");

  // Safe useAlert usage
  const alertContext = useAlert();
  const showAlert = alertContext ? alertContext.showAlert : () => { };

  const WS_URL = "wss://personal-chatbot-hp83.onrender.com/ws/chat";

  useEffect(() => {
    console.log("ChatBotMobile mounted");
    let socket;
    let reconnectTimer;

    const connect = () => {
      setStatus(prev => (prev === "connected" ? prev : "connecting"));
      socket = new WebSocket(WS_URL);
      setWs(socket); // Update state with new socket

      socket.onopen = () => {
        setConnected(true);
        setStatus("connected");
        setIsTyping(false);
      };

      socket.onmessage = (e) => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { role: "assistant", content: e.data }]);
      };

      socket.onerror = (err) => {
        console.error("WebSocket error:", err);
        socket.close();
      };

      socket.onclose = () => {
        console.log("WebSocket closed");
        setConnected(false);
        setStatus("reconnecting");
        reconnectTimer = setTimeout(connect, 5000);
      };
    };

    connect();

    return () => {
      console.log("ChatBotMobile unmounting");
      clearTimeout(reconnectTimer);
      if (socket) socket.close();
    };
  }, []);

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
      showAlert("Failed to send. Please try again.", "error");
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{
        zIndex: 999999,
        backgroundColor: '#020c09', // Force navy color
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >

      {/* Header */}
      <header className="bg-light-navy px-4 py-3 flex items-center justify-between border-b border-lightest-navy shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <button className="text-slate-300 hover:text-white p-2 -ml-2" onClick={onClose}>
            <FaArrowLeft size={20} />
          </button>
          <span className="font-bold text-lg text-slate-200">Shiv's Assistant</span>
        </div>

        <div className={`text-xs px-2 py-1 rounded-full ${status === "connected" ? "bg-green-500/20 text-green-400" :
          status === "connecting" ? "bg-yellow-500/20 text-yellow-400" :
            "bg-red-500/20 text-red-400"
          }`}>
          {status === "connected" && "● Connected"}
          {status === "connecting" && "● Connecting..."}
          {status === "reconnecting" && "● Reconnecting..."}
          {status === "disconnected" && "● Disconnected"}
        </div>
      </header>

      {/* Chat area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-navy overscroll-contain">
        <div className="flex flex-col gap-4 pb-20">

          {/* Default welcome message */}
          {messages.length === 0 && !isTyping && (
            <div className="bg-light-navy p-4 rounded-xl rounded-bl-none max-w-[85%] text-slate-300 self-start shadow-md">
              Hey there! I'm Shiv's AI assistant.<br />
              How can I help you today? 😊
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`max-w-[85%] p-3 rounded-xl text-sm shadow-md ${m.role === 'user'
              ? 'bg-primary text-navy self-end rounded-br-none'
              : 'bg-light-navy text-slate-300 self-start rounded-bl-none'
              }`}>
              {m.content}
            </div>
          ))}

          {isTyping && (
            <div className="bg-light-navy p-3 rounded-xl rounded-bl-none self-start flex gap-1 shadow-md w-fit">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
            </div>
          )}

          <div ref={msgEndRef} />
        </div>
      </main>

      {/* Input */}
      <div className="bg-light-navy p-3 border-t border-lightest-navy flex gap-2 items-end pb-safe shrink-0">
        <textarea
          ref={textareaRef}
          className="flex-1 bg-navy border border-lightest-navy rounded-xl p-3 text-base text-slate-300 focus:outline-none focus:border-primary resize-none max-h-32"
          placeholder="Type a message…"
          rows={1}
          value={input}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <button
          className="p-3 bg-primary text-navy rounded-xl hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          onClick={send}
          disabled={!connected || !input.trim()}
        >
          <FaPaperPlane size={20} />
        </button>
      </div>

    </div>
  );
};

export default ChatBotMobile;
