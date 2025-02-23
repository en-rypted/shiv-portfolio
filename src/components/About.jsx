import React from "react";

import "./about.css";
import { ConsoleStructure } from "./ConsoleStructure";
import imag from "../assets/OIP.jpg";
import { motion } from "motion/react";
import { FloatingImage } from "./animatedComponents/FloatingImage";

export const About = () => {
  return (
    <motion.div
      className="about-container"
      initial={{ transform: "translateY(100px)", opacity: 0 }}
      animate={{ transform: "translateY(0px)", opacity: 1 }}
      transition={{ type: "spring" }}
    >
      <div className="about">
         <div className='img'>
            <FloatingImage image={imag}/>
            </div> 
   

        <div>
          <ConsoleStructure
            height={"400px"}
            width={600}
            content={
              <>
                <p>
                  Java was graciously welcomed by the software industry because
                  it made development effortless, eased distribution issues, and
                  eliminated the pain of continuously porting across platforms.
                  The language is dynamic and secure as it is object-oriented.
                  Java programmes are written in the bytecode language, which
                  allows them to run on any machine with a JVM installed. This
                  is a pragmatic and logical approach to software development.
                  Java objects encompass data and behaviour, enabling code to be
                  reused along with streamlining testing and debugging.
                </p>
              </>
            }
          />
        </div>
      </div>
    </motion.div>
  );
};
