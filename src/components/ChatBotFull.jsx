import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { useAlert } from "../context/AlertContext";
// import "./ChatBotFull.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatBotFull = ({ onClose }) => {
  const [ws, setWs] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const msgEndRef = useRef(null);
  const textareaRef = useRef(null);
  const [status, setStatus] = useState("connecting");
  // "connecting" | "connected" | "reconnecting" | "disconnected"

  const { showAlert } = useAlert?.() || { showAlert: () => { } };

  // Auto switch ws url
  const WS_URL = "wss://personal-chatbot-hp83.onrender.com/ws/chat";

  useEffect(() => {
    let socket;
    let reconnectTimer;

    const connect = () => {
      setStatus((prev) => (prev === "connected" ? prev : "connecting"));
      socket = new WebSocket(WS_URL);

      socket.onopen = () => {
        setConnected(true);
        setStatus("connected");
        setIsTyping(false);
      };

      socket.onmessage = (e) => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: e.data },
        ]);
      };

      socket.onerror = () => {
        console.log("WebSocket error — reconnecting soon...");
        socket.close();
      };

      socket.onclose = () => {
        setTimeout(() => {
          setStatus("reconnecting");
        }, 1000);
        reconnectTimer = setTimeout(connect, 5000);
      };
    };

    connect(); // first connect attempt
    setWs(socket);
    return () => {
      clearTimeout(reconnectTimer);
      socket && socket.close();
    };
  }, [WS_URL]);

  // auto scroll on new content
  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // input autoresize
  const onChange = (e) => {
    setInput(e.target.value);
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "48px";
    el.style.height = Math.min(el.scrollHeight, 180) + "px";
  };

  // enter to send, shift+enter for newline
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const send = () => {
    console.log(ws.readyState);

    if (!input.trim() || !ws || ws.readyState !== WebSocket.OPEN) return;
    try {
      ws.send(input);
      console.log("Sending message:", input);
      setMessages((prev) => [...prev, { role: "user", content: input }]);
      setInput("");
      setIsTyping(true);
      if (textareaRef.current) textareaRef.current.style.height = "48px";
    } catch {
      showAlert?.("Failed to send. Please try again.", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-navy z-[9999] flex flex-col">
      {/* Header */}
      <header className="bg-light-navy px-6 py-4 flex items-center justify-between border-b border-lightest-navy shadow-md">
        <div className="flex items-center gap-4">
          <button className="text-slate-300 hover:text-white transition-colors" onClick={onClose}>
            <FaArrowLeft size={24} />
          </button>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-slate-200">Shiv's Assistant</span>
            <span className={`text-xs flex items-center gap-1 ${status === "connected" ? "text-green-400" :
                status === "connecting" ? "text-yellow-400" :
                  "text-red-400"
              }`}>
              <span className={`w-2 h-2 rounded-full ${status === "connected" ? "bg-green-500" :
                  status === "connecting" ? "bg-yellow-500" :
                    "bg-red-500"
                }`}></span>
              {status === "connected" && "Connected"}
              {status === "connecting" && "Connecting..."}
              {status === "reconnecting" && "Reconnecting..."}
              {status === "disconnected" && "Disconnected"}
            </span>
          </div>
        </div>
      </header>

      {/* Messages area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-navy">
        <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-20">
          {messages.length === 0 && !isTyping && (
            <div className="bg-light-navy p-6 rounded-xl rounded-bl-none max-w-[80%] text-slate-300 self-start shadow-lg border border-lightest-navy">
              <div className="text-lg">
                Hey there! I'm Shiv's AI assistant. How can I help you today? 😊
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] md:max-w-[70%] p-4 rounded-xl text-base shadow-lg border ${m.role === "user"
                  ? "bg-primary text-navy self-end rounded-br-none border-primary"
                  : "bg-light-navy text-slate-300 self-start rounded-bl-none border-lightest-navy"
                }`}
            >
              {m.role === "user" ? (
                <div>{m.content}</div>
              ) : (
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {m.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="bg-light-navy p-4 rounded-xl rounded-bl-none self-start flex gap-2 shadow-lg w-fit border border-lightest-navy">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
            </div>
          )}

          <div ref={msgEndRef} />
        </div>
      </main>

      {/* Input bar */}
      <div className="bg-light-navy p-4 border-t border-lightest-navy flex justify-center pb-safe">
        <div className="w-full max-w-4xl flex gap-4 items-end">
          <textarea
            ref={textareaRef}
            className="flex-1 bg-navy border border-lightest-navy rounded-xl p-4 text-lg text-slate-300 focus:outline-none focus:border-primary resize-none max-h-48 shadow-inner"
            placeholder="Type your message…  (Enter to send • Shift+Enter for new line)"
            rows={1}
            value={input}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          <button
            className="p-4 bg-primary text-navy rounded-xl hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg h-[60px] w-[60px] flex items-center justify-center"
            onClick={send}
            disabled={!connected || !input.trim()}
            aria-label="Send"
            title={!connected ? "Not connected" : "Send"}
          >
            <FaPaperPlane size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotFull;
