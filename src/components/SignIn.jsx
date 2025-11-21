import React, { useState, useEffect, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';
import { useAlert } from "../context/AlertContext";
import loderContext from "../context/loderContext";
import { motion, AnimatePresence } from "framer-motion";

const SignIn = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { showAlert } = useAlert();
  const loder = useContext(loderContext);

  // Close popup on ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const welcomeMessages = [
    "Welcome back, superstar! 🌟",
    "You again? Awesome! 😎",
    "Ready to conquer the day? 🚀",
    "Back for more? Let's go! 💪",
    "The legend returns! 🏆",
    "You make this place better! ✨",
    "Look who's here! 👀",
    "High five, you're in! 🙌",
    "Welcome back, code ninja! 🥷",
    "Glad to see you again! 😊"
  ];

  const getRandomWelcome = () =>
    welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      loder.update(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in:", userCredential.user);
      loder.update(false);
      showAlert(getRandomWelcome(), "success");
      onClose(); // Close popup after successful login
    } catch (err) {
      loder.update(false);
      showAlert(err.message, "error");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex justify-center items-center z-[1000]"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-light-navy/90 border border-lightest-navy p-8 rounded-xl shadow-2xl w-full max-w-md relative"
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-slate-400 hover:text-primary transition-colors text-xl"
            onClick={onClose}
          >
            ✖
          </button>

          <h2 className="text-3xl font-bold text-slate-100 mb-6 text-center">Sign In</h2>

          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <div className="group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-navy/50 border border-lightest-navy rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-primary transition-colors placeholder-slate-500"
                required
              />
            </div>

            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-navy/50 border border-lightest-navy rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-primary transition-colors placeholder-slate-500 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button
              type="submit"
              className="mt-4 bg-primary text-navy font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignIn;
