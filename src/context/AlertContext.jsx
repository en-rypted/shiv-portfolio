import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = useCallback((message, type = "info", timeout = 5000) => {
    const id = Date.now() + Math.random();
    setAlerts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, timeout);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}>
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 0.4,
              }}
              style={{
                minWidth: 200,
                padding: "12px 20px",
                borderRadius: 6,
                background: alert.type === "error" ? "#ff4d4f" : "#1890ff",
                color: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                fontWeight: 500,
                opacity: 0.95,
              }}
            >
              {alert.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AlertContext.Provider>
  );
};