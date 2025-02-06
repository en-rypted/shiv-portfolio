import React from "react";
import "./contactMenu.css";
import { motion } from "motion/react";

export const ContatctMenu = () => {
  let array = [
    {
      name: "fa-brands fa-github",
      color: "#000000",
    },
    {
      name: "fa-brands fa-instagram",
      color: "#DD2A7B",
    },
    {
      name: "fa-regular fa-envelope",
      color: "#007BFF",
    },
    {
      name: "fa-brands fa-linkedin",
      color: "#0077B5",
    },
    {
      name: "fa-brands fa-whatsapp",
      color: "#25D366",
    },
    {
      name: "fa-brands fa-discord",
      color: "#7289DA",
    },
  ];
  return (
    <motion.div className="contact-container"
      initial={{opacity:0.2}}
      whileHover={{ opacity:1 }}
    >
      {array.map((ele, index) => {
        return (
          <motion.div
            initial={{opacity:0.2}}
            whileHover={{ scale: 1.2, translateY: -20 ,color: ele.color, opacity:1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring" }}
            key={index}
          >
            {" "}
            <i className={ele.name}></i>
          </motion.div>
        );
      })}
      {/* <i className='fa-brands fa-instagram'></i>
        <i className='fa-regular fa-envelope'></i>
        <i className='fa-brands fa-linkedin'></i>
        <i className='fa-brands fa-whatsapp'></i>
        <i className='fa-brands fa-discord'></i> */}
    </motion.div>
  );
};
