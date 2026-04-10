

import { useState } from "react";
import NaavBaar from "./Header/NaavBaar";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
 
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Thank you, ${name}! Your message has been sent.`);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
    <NaavBaar/>
    <div style={styles.container}>
  
      <div style={styles.right}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Contact Us</h2>

          <input
            style={styles.input}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <textarea
            style={{ ...styles.input, height: "120px", resize: "none" }}
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <button type="submit" style={styles.button}>
            Send Message
          </button>
        </form>
      </div>
    </div>
    </>
  );
  
}

const styles = {
  container: {
    display: "flex",
    height: "80vh",
    fontFamily: "Arial, sans-serif",
    background: "#000",
  },

  left: {
    flex: 1,
    background: "linear-gradient(135deg, #000000, #1c1c1c)",
    color: "#00ffcc",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px",
  },

  brand: {
    fontSize: "52px",
    fontWeight: "bold",
    letterSpacing: "2px",
    color: "#00ffcc",
  },

  tagline: {
    fontSize: "16px",
    color: "#aaa",
    marginTop: "10px",
    maxWidth: "400px",
  },

  right: {
    flex: 1.2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0a0a0a",
  },

  form: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  title: {
    color: "#fff",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  input: {
    padding: "14px",
    borderRadius: "6px",
    border: "1px solid #222",
    background: "#111",
    color: "#fff",
    fontSize: "14px",
  },

  button: {
    padding: "14px",
    borderRadius: "6px",
    border: "none",
    background: "linear-gradient(135deg, #00ffcc, #00bfff)",
    color: "#000",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    letterSpacing: "1px",
  },
};

export default Contact;

