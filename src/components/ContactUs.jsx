import React, { useContext, useState } from 'react'
import axios from 'axios'
import { FiGithub, FiLinkedin, FiInstagram, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import loderContext from '../context/loderContext'
import { useFormValidation } from '../hooks/useFormValidation';
import { useAlert } from '../context/AlertContext';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#34d399 1px, transparent 1px), linear-gradient(90deg, #34d399 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="w-full max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-200 mb-2 font-mono tracking-tighter">
            <span className="text-primary">$</span> send --message
          </h2>
          <div className="h-1 w-20 bg-primary mb-4"></div>
          <p className="text-slate-400 font-mono text-sm">// Let's connect and build something amazing</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative group"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-tertiary/20 rounded-lg blur-xl opacity-50 group-hover:opacity-75 transition duration-500" />

          {/* Terminal Window */}
          <div className="relative bg-light-navy/80 backdrop-blur-md border border-primary/30 rounded-lg overflow-hidden shadow-2xl">
            {/* Window Header */}
            <div className="bg-lightest-navy/50 px-4 py-3 flex items-center gap-2 border-b border-primary/20">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-xs text-slate-400 font-mono">contact.sh</span>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <form className="space-y-6 font-mono" onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-primary text-sm flex items-center gap-2">
                    <span className="text-slate-500">$</span> --name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-navy/50 border border-primary/30 rounded px-4 py-3 text-slate-300 font-mono text-sm focus:outline-none focus:border-primary transition-colors placeholder-slate-600"
                    placeholder="Enter your name..."
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-primary text-sm flex items-center gap-2">
                    <span className="text-slate-500">$</span> --email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-navy/50 border border-primary/30 rounded px-4 py-3 text-slate-300 font-mono text-sm focus:outline-none focus:border-primary transition-colors placeholder-slate-600"
                    placeholder="your.email@domain.com"
                    required
                  />
                </div>

                {/* Contact Input */}
                <div className="space-y-2">
                  <label className="text-primary text-sm flex items-center gap-2">
                    <span className="text-slate-500">$</span> --contact
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full bg-navy/50 border border-primary/30 rounded px-4 py-3 text-slate-300 font-mono text-sm focus:outline-none focus:border-primary transition-colors placeholder-slate-600"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label className="text-primary text-sm flex items-center gap-2">
                    <span className="text-slate-500">$</span> --message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full bg-navy/50 border border-primary/30 rounded px-4 py-3 text-slate-300 font-mono text-sm focus:outline-none focus:border-primary transition-colors placeholder-slate-600 resize-none"
                    placeholder="// Your message here..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="group/btn px-8 py-3 border-2 border-primary text-primary font-mono text-sm hover:bg-primary hover:text-navy transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {'> EXECUTE'}
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </span>
                    <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300" />
                  </button>
                </div>
              </form>
            </div>

            {/* Status Bar */}
            <div className="bg-lightest-navy/30 px-4 py-2 border-t border-primary/20 font-mono text-xs text-slate-400 flex justify-between">
              <span><span className="text-green-400">█</span> READY</span>
              <span className="text-primary/70">// awaiting input</span>
            </div>
          </div>
        </motion.div>

        {/* Social Links Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 relative group"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-tertiary/20 to-primary/20 rounded-lg blur-xl opacity-50 group-hover:opacity-75 transition duration-500" />

          <div className="relative bg-light-navy/80 backdrop-blur-md border border-primary/30 rounded-lg overflow-hidden shadow-2xl p-6">
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {[
                { name: 'GitHub', url: 'https://github.com/en-rypted', icon: 'FiGithub' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shivwakchaure', icon: 'FiLinkedin' },
                { name: 'Instagram', url: 'https://www.instagram.com/19hi22', icon: 'FiInstagram' },
                { name: 'WhatsApp', url: 'https://wa.me/qr/3IPR4EEH4C2SH1', icon: 'FaWhatsapp' },
                { name: 'Email', url: 'mailto:shivwakchaure19@gmail.com', icon: 'FiMail' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group/icon"
                >
                  <div className="w-12 h-12 rounded-full bg-navy/50 border border-primary/30 flex items-center justify-center text-slate-400 group-hover/icon:text-primary group-hover/icon:border-primary group-hover/icon:scale-110 transition-all duration-300">
                    <SocialIcon name={social.name} />
                  </div>
                  <span className="text-xs font-mono text-slate-500 group-hover/icon:text-primary transition-colors">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const SocialIcon = ({ name }) => {
  switch (name) {
    case 'GitHub': return <FiGithub size={20} />;
    case 'LinkedIn': return <FiLinkedin size={20} />;
    case 'Instagram': return <FiInstagram size={20} />;
    case 'WhatsApp': return <FaWhatsapp size={20} />;
    case 'Email': return <FiMail size={20} />;
    default: return null;
  }
};
