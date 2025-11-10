import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { useAlert } from "../context/AlertContext";
import "./ChatBotFull.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatBotFull = ({onClose}) => {
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

  // Auto switch ws url
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
  //     //showAlert?.("WebSocket connection error.", "error");
  //   };
  //   socket.onmessage = (e) => {
  //     setIsTyping(false);
  //     setMessages((prev) => [...prev, { role: "assistant", content: e.data }]);
  //   };

  //   setWs(socket);
  //   return () => socket.close();
  // }, [WS_URL, showAlert]);

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
    <div className="gptx-root">
      {/* Header */}
      <header className="gptx-header">
        <div className="gptx-title">
          
          <button className="back-btn" onClick={onClose}>
             <FaArrowLeft size={18} />
           </button>
           <span className={`gptx-dot ${connected ? "ok" : "down"}`} />
           <span>Shiv's Assistant</span>
        </div>
        {/* <div className={`gptx-status ${connected ? "ok" : "down"}`}>
          {connected ? "Connected" : "Disconnected"}
        </div> */}
        <div
  className={`gptx-status ${status}`}
>
  {status === "connected" && "🟢 Connected"}
  {status === "connecting" && "🕓 Connecting..."}
  {status === "reconnecting" && "⟳ Reconnecting..."}
  {status === "disconnected" && "🔴 Disconnected"}
</div>
      </header>

      {/* Messages area */}
      <main className="gptx-main">
        <div className="gptx-stream">
                {messages.length === 0 && !isTyping && (
      <div className="gptx-block bot">
        <div className="gptx-text">
          Hey there! I'm Shiv's AI assistant.  
          How can I help you today? 😊
        </div>
      </div>
    )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`gptx-block ${m.role === "user" ? "me" : "bot"}`}
            >
                { m.role === "user" ? <div className="gptx-text">{m.content}</div> :
                <div className="gptx-text">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {m.content}
                </ReactMarkdown>
                </div>}
            </div>
          ))}

          {isTyping && (
            <div className="gptx-block bot typing">
              <span className="tdot" />
              <span className="tdot" />
              <span className="tdot" />
            </div>
          )}

          <div ref={msgEndRef} />
        </div>
      </main>

      {/* Input bar */}
      <div className="gptx-inputbar">
        <div className="gptx-inputwrap">
          <textarea
            ref={textareaRef}
            className="gptx-input"
            placeholder="Type your message…  (Enter to send • Shift+Enter for new line)"
            rows={1}
            value={input}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          <button
            className="gptx-send"
            onClick={send}
            disabled={!connected || !input.trim()}
            aria-label="Send"
            title={!connected ? "Not connected" : "Send"}
          >
            <FaPaperPlane size={16} />
          </button>
        </div>
        {/* <div className="gptx-tip">
          Powered by <strong>FastAPI</strong> • Press <kbd>Enter</kbd> to send
        </div> */}
      </div>
    </div>
  );
};

export default ChatBotFull;
