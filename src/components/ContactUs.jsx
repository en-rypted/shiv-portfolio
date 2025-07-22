import React, { useContext, useState } from 'react'
import './contact.css'
import axios from 'axios'
import loderContext from '../context/loderContext'
import { useFormValidation } from '../hooks/useFormValidation';
import { useAlert } from '../context/AlertContext';

export const ContactUs = () => {
  const produrl = "https://portfolio-shiv-server.vercel.app/send-email";
  const devurl = "http://localhost:5000/send-email";
  const isloder = useContext(loderContext);
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const [response, setResponse] = useState("");
  const { errors, validate } = useFormValidation();
  const { showAlert } = useAlert();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const successMessages = [
    (name) => `Your message is flying through the internet tubes, ${name || "friend"}! 🚀`,
    (name) => `Mail sent! Carrier pigeon engaged for ${name || "you"}. 🕊️`,
    (name) => `Your words are on their way, ${name || "pal"}—hopefully with good WiFi! 📡`,
    (name) => `Message delivered! The electrons salute you, ${name || "hero"}. ⚡`,
    (name) => `Your message is now in the Matrix, ${name || "Neo"}! 🕶️`,
    (name) => `Mail sent! May the force be with your inbox, ${name || "Jedi"}! ✉️`,
    (name) => `Your message is off to see the wizard, ${name || "traveler"}! 🧙‍♂️`,
    (name) => `Sent! Now let's hope it doesn't end up in a black hole, ${name || "space explorer"}. 🕳️`,
    (name) => `Your message is doing the cha-cha to its destination, ${name || "dancer"}! 💃`,
    (name) => `Mail sent! The internet hamsters are running fast for you, ${name || "champ"}! 🐹`
  ];

  function getRandomSuccess(name) {
    const msgFn = successMessages[Math.floor(Math.random() * successMessages.length)];
    return msgFn(name);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, newErrors } = validate(formData);
    if (!isValid) {
      showAlert(Object.values(newErrors).join('\n'), "error");
      return;
    }
    try {
      isloder.update(true);
      const res = await axios.post(
        produrl,
        formData,
        { withCredentials: true }
      );
      isloder.update(false);
      showAlert(res.data.message, "info");
      showAlert(getRandomSuccess(formData.name));
      setResponse(res.data.message);
      setFormData({ name: "", email: "", contact: "", message: "" });
    } catch (error) {
      isloder.update(false);
      showAlert(error.response?.data?.message || "Failed to send message. Try again later.", "error");
      setResponse("Failed to send message. Try again later.");
    }
  };
  return (
    
    <div className="screen">
      <div className="screen-header">
        <div className="screen-header-left">
          <div className="screen-header-button close"></div>
          <div className="screen-header-button maximize"></div>
          <div className="screen-header-button minimize"></div>
        </div>
        <div className="screen-header-right">
          <div className="screen-header-ellipsis"></div>
          <div className="screen-header-ellipsis"></div>
          <div className="screen-header-ellipsis"></div>
        </div>
      </div>
      <div className="screen-body">
        <div className="screen-body-item left">
          <div className="app-title">
            <span>CONTACT</span>
            <span>ME</span>
          </div>
        </div>
        <div className="screen-body-item">
          <div className="app-form">
            <div className="app-form-group">
              <input className="app-form-control" placeholder="NAME" value={formData.name} name='name' onChange={handleChange}/>
            </div>
            <div className="app-form-group">
              <input className="app-form-control" placeholder="EMAIL" name='email' value={formData.email} onChange={handleChange}/>
            </div>
            <div className="app-form-group">
              <input className="app-form-control" placeholder="CONTACT NO" name='contact' value={formData.contact} onChange={handleChange}/>
            </div>
            <div className="app-form-group message">
              <input className="app-form-control" placeholder="MESSAGE" name='message' value={formData.message} onChange={handleChange}/>
            </div>
            <div className="app-form-group buttons">
              <button className="app-form-button">CANCEL</button>
              <button className="app-form-button" onClick={handleSubmit}>SEND</button>
            </div>
          </div>
        </div>
      </div>
    </div>
      )
}
