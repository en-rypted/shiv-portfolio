import React, { useContext } from "react";

import "./about.css";
import { ConsoleStructure } from "./ConsoleStructure";
import imag from "../assets/pfp.png";
import { motion } from "motion/react";
import { FloatingImage } from "./animatedComponents/FloatingImage";
import isMobileContext from "../context/isMobileContext";

export const About = () => {
  const isMobile = useContext(isMobileContext)
  let aboutMe = {
    img : imag,
    desc : `Hi, I'm Shiv, a Java Web Developer & Full-Stack Enthusiast with 2 years of experience in building scalable and secure web applications.

I specialize in Spring Boot, REST APIs, React, and authentication mechanisms like OAuth and JWT. My expertise includes secure data transmission using encryption, decryption, and digital signatures, ensuring high standards of data protection.

Currently, I’m working on web service integration using REST, SOAP, and Apache Camel, enabling seamless communication between applications. I have hands-on experience in designing and developing backend architectures, optimizing API performance, and integrating third-party services.

I enjoy solving complex problems, writing clean and maintainable code, and continuously learning new technologies. Whether it's building robust backend systems, securing APIs, or creating interactive web applications, I strive for efficiency and scalability in every project.

Looking forward to contributing to innovative solutions, collaborating with like-minded developers, and growing as a technology enthusiast!`
  }
  return (
    <motion.div
      className="about-container"
      initial={{ transform: "translateY(100px)", opacity: 0 }}
      animate={{ transform: "translateY(0px)", opacity: 1 }}
      transition={{ type: "spring" }}
    >
      <div className="about">
         <div className='img'>
            <FloatingImage image={aboutMe.img} width={isMobile ? 125 : undefined} height={isMobile ? 150 : undefined}/>
            </div> 
   

        <div>
          <ConsoleStructure
            height={isMobile ? 600 :"400px"}
            width={isMobile ? 350 :700}
             margin={ isMobile ?'0px 50px 150px 0px' : undefined}
            content={
              <>
                <p>
                  {aboutMe.desc}
                </p>
              </>
            }
          />
        </div>
      </div>
    </motion.div>
  );
};
