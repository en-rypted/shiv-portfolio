import React, { useContext, useState } from 'react'
import './contact.css'
import axios from 'axios'
import loderContext from '../context/loderContext'


export const ContactUs = () => {
  const isloder = useContext(loderContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      isloder.update(true);
      const res = await axios.post("https://portfolio-shiv-server.vercel.app/send-email", formData);
      isloder.update(false);
      setTimeout(() => {
        alert(res.data.message)
      }, 200);
     
      setResponse(res.data.message);
      setFormData({ name: "", email: "", contact: "", message: "" });
    } catch (error) {
      isloder.update(false);
      setResponse("Failed to send message. Try again later.");
      alert("Failed to send message. Try again later.")
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
