import { useContext, useEffect } from "react";
import './console.css'
import { ConsoleStructure } from "./ConsoleStructure";
import { motion } from "motion/react"
import isMobileContext from "../context/isMobileContext";
import ChatBot from "./Chatbot";


const Console = () => {

  const isMobile = useContext(isMobileContext)

    useEffect(()=>{
        loader()
    },[])
    function loader(event){
        // array with texts to type in typewriter
        let dataText = [ "Hi !", "I am shiv 😊", "I am a java developer."];
        
        // type one text in the typwriter
        // keeps calling itself until the text is finished
        function typeWriter(text, i, fnCallback) {
          // chekc if text isn't finished yet
          if (i < (text.length)) {
            // add next character to h1
           document.getElementById("text").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
      
            // wait for a while and call this function again for next character
            setTimeout(function() {
              typeWriter(text, i + 1, fnCallback)
            }, 100);
          }
          // text finished, call callback if there is a callback function
          else if (typeof fnCallback == 'function') {
            // call callback after timeout
            setTimeout(fnCallback, 1500);
          }
        }
        // start a typewriter animation for a text in the dataText array
         function StartTextAnimation(i) {
           if (typeof dataText[i] == 'undefined'){
              setTimeout(function() {
                StartTextAnimation(0);
              }, 20000);
           }
           // check if dataText[i] exists
          if (i < dataText[i].length) {
            // text exists! start typewriter animation
           typeWriter(dataText[i], 0, function(){
             // after callback (and whole text has been animated), start next text
             StartTextAnimation(i + 1);
           });
          }
        }
        // start the text animation
        StartTextAnimation(0);
      }

  return (
    <><motion.div className="console-container"
    initial={{ transform: "translateY(100px)" , opacity : 0 }}
    animate={{ transform: "translateY(0px)" , opacity : 1 }}
    transition={{ type: "spring" }}
    >

    
      <ConsoleStructure 
      height={isMobile ? 150 :120}
      width={isMobile ? 350 :700}
      content={
        <> <span>{">_"}</span>
        <br />
        <span style={{ color: "green",fontSize : isMobile ? 'x-large' : undefined}}>{isMobile ? 'C:19>' :"C:\\system32$ ~"}</span>{" "}
        <span id="text" style={{ fontSize : isMobile ? 'x-large' : undefined}}></span></>
      } />
      </motion.div>
     
    </>
  );
};


export default Console;
