import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';

const SignIn = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in:", userCredential.user);
      onClose(); // Close popup after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2 style={styles.title}>Sign In</h2>
        <form onSubmit={handleSignIn} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
         <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...styles.input, paddingRight: "70px" }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              style={styles.toggleButton}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Sign In</button>
          <button type="button" style={styles.closeButton} onClick={onClose}>✖</button>
        </form>
      </div>
    </div>
  );
};



const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#1e1e1e",
    color: "white",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
    minWidth: "320px",
    position: "relative",
  },
  title: {
    marginBottom: "1rem",
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #555",
    backgroundColor: "#2a2a2a",
    color: "#fff"
  },
  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#007acc",
    color: "#fff",
    cursor: "pointer"
  },
  closeButton: {
    position: "absolute",
    top: "8px",
    right: "10px",
    background: "transparent",
    border: "none",
    color: "#aaa",
    fontSize: "18px",
    cursor: "pointer"
  },
  error: {
    color: "red",
    fontSize: "14px",
    textAlign: "center"
  },
  passwordWrapper: {
  position: "relative",
},

toggleButton: {
  position: "absolute",
  right: "0px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "transparent",
  border: "none",
  color: "#ccc",
  fontSize: "18px",
  cursor: "pointer",
  
}
};

export default SignIn;
