import React, { useState, useEffect, useRef, useContext } from "react";
import { FaComments, FaPaperPlane, FaArrowLeft, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAlert } from "../context/AlertContext";
import isMobileContext from "../context/isMobileContext";

const UnifiedChatBot = () => {
    const isMobile = useContext(isMobileContext);
    const [isOpen, setIsOpen] = useState(false);
    const [ws, setWs] = useState(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [status, setStatus] = useState("connecting");

    const msgEndRef = useRef(null);
    const textareaRef = useRef(null);

    // Safe useAlert usage
    const alertContext = useAlert();
    const showAlert = alertContext ? alertContext.showAlert : () => { };

    const WS_URL = "wss://personal-chatbot-hp83.onrender.com/ws/chat";

    // WebSocket Connection Logic
    useEffect(() => {
        let socket;
        let reconnectTimer;

        const connect = () => {
            setStatus(prev => (prev === "connected" ? prev : "connecting"));
            socket = new WebSocket(WS_URL);
            setWs(socket);

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
                setConnected(false);
                setStatus("reconnecting");
                reconnectTimer = setTimeout(connect, 5000);
            };
        };

        if (isOpen) {
            connect();
        }

        return () => {
            clearTimeout(reconnectTimer);
            if (socket) socket.close();
        };
    }, [isOpen]);

    // Auto-scroll
    useEffect(() => {
        msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping, isOpen]);

    // Input handling
    const onChange = (e) => {
        setInput(e.target.value);
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "44px";
        el.style.height = Math.min(el.scrollHeight, 140) + "px";
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
            if (textareaRef.current) textareaRef.current.style.height = "44px";
        } catch {
            showAlert("Failed to send. Please try again.", "error");
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9,
            y: 20,
            transition: { duration: 0.2 }
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 25 }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: 20,
            transition: { duration: 0.2 }
        }
    };

    const mobileVariants = {
        hidden: { y: "100%", opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 300 } },
        exit: { y: "100%", opacity: 0, transition: { duration: 0.2 } }
    };

    return (
        <>
            {/* Floating Action Button (Visible when closed) */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className={`fixed z-[9990] flex items-center justify-center shadow-lg bg-primary text-navy rounded-full
              ${isMobile ? "bottom-24 right-6 w-14 h-14" : "bottom-10 right-10 w-16 h-16"}
            `}
                    >
                        <FaComments size={isMobile ? 24 : 28} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={isMobile ? mobileVariants : containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`fixed z-[9999] flex flex-col bg-navy border border-lightest-navy shadow-2xl overflow-hidden
              ${isMobile
                                ? "inset-0 rounded-none"
                                : "bottom-24 right-10 w-[400px] h-[600px] rounded-2xl"
                            }
            `}
                        style={isMobile ? { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 } : {}}
                    >
                        {/* Header */}
                        <div className="bg-light-navy/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-lightest-navy shrink-0">
                            <div className="flex items-center gap-3">
                                {isMobile && (
                                    <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                                        <FaArrowLeft size={20} />
                                    </button>
                                )}
                                <div className="flex flex-col">
                                    <span className="font-bold text-slate-200 text-lg">Shiv's Assistant</span>
                                    <div className="flex items-center gap-1.5">
                                        <span className={`w-2 h-2 rounded-full ${status === "connected" ? "bg-green-500" : status === "connecting" ? "bg-yellow-500" : "bg-red-500"}`}></span>
                                        <span className="text-xs text-slate-400 capitalize">{status}</span>
                                    </div>
                                </div>
                            </div>

                            {!isMobile && (
                                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10">
                                    <FaTimes size={20} />
                                </button>
                            )}
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-navy scrollbar-thin scrollbar-thumb-lightest-navy scrollbar-track-transparent">
                            {messages.length === 0 && !isTyping && (
                                <div className="bg-light-navy p-4 rounded-xl rounded-bl-none max-w-[85%] text-slate-300 self-start shadow-md border border-lightest-navy/50">
                                    <p>👋 Hi there! I'm Shiv's AI assistant.</p>
                                    <p className="mt-2">I can tell you about his projects, skills, and experience. How can I help?</p>
                                </div>
                            )}

                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-xl text-sm shadow-md ${m.role === 'user'
                                            ? 'bg-primary text-navy rounded-br-none font-medium'
                                            : 'bg-light-navy text-slate-300 rounded-bl-none border border-lightest-navy/50'
                                        }`}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-light-navy p-3 rounded-xl rounded-bl-none flex gap-1 shadow-md border border-lightest-navy/50">
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={msgEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-light-navy/50 border-t border-lightest-navy flex gap-2 items-end shrink-0 backdrop-blur-sm">
                            <textarea
                                ref={textareaRef}
                                className="flex-1 bg-navy/50 border border-lightest-navy rounded-xl p-3 text-sm text-slate-300 focus:outline-none focus:border-primary resize-none max-h-32 placeholder:text-slate-500"
                                placeholder="Type a message..."
                                rows={1}
                                value={input}
                                onChange={onChange}
                                onKeyDown={onKeyDown}
                            />
                            <button
                                className="p-3 bg-primary text-navy rounded-xl hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-95 transform duration-100"
                                onClick={send}
                                disabled={!connected || !input.trim()}
                            >
                                <FaPaperPlane size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default UnifiedChatBot;
