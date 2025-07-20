import React, { useContext, useEffect, useState } from "react";

import "./about.css";
import { ConsoleStructure } from "./ConsoleStructure";
import imag from "../assets/pfp.png";
import { motion } from "motion/react";
import { FloatingImage } from "./animatedComponents/FloatingImage";
import isMobileContext from "../context/isMobileContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { EditDb } from "./dbEdit/EditDb";
import authContext from "../context/authContext";

export const About = () => {
  const isMobile = useContext(isMobileContext)
   const aboutRef = collection(db , "about");
   const authuser = useContext(authContext);
   const skeltonDecData = [600, 580, 600, 450, 570,580, 600, 450, 570,580, 600, 450, 570,456];
   const skeltonDecDataMob = [300, 280, 250, 250, 270,280, 200, 250, 270,280, 300, 250, 270,256,300, 280, 250, 250, 270,280, 200, 250, 270,180,256,300, 280, ];
    const [isEditOn,setIsEditOn] = useState(false);
   const [about,setAbout] = useState({
    profile : "",
    description : ""
   });
    const [isLoding , setIsLoading] = useState(true);
   const [aboutId,setAboutId] = useState("");
   useEffect(()=> {
     const getAboutMe = async () =>{
           try {
             
             const data = await getDocs(aboutRef);
             const filterdData = data.docs[0].data();
             setAboutId(data.docs[0].id);
             setAbout(filterdData)
             setIsLoading(false)
           } catch (error) {
             console.error(error)
           }
       }
           getAboutMe();
           console.log(about)
       },[])
  return (
    <>
     {authuser.user != null && <button style={{position:'fixed',zIndex:9999}} onClick={()=>{setIsEditOn(true)}} >📝 Edit</button>}
     {isEditOn && <EditDb width={1500} height={600} jsonData={about} docId={aboutId} close={()=>{setIsEditOn(false)}} entityName={"about"} Preview={Preview} ></EditDb>}
    {isLoding ?  <motion.div
      className="about-container"
      initial={{ transform: "translateY(100px)", opacity: 0 }}
      animate={{ transform: "translateY(0px)", opacity: 1 }}
      transition={{ type: "spring" }}
    >
      <div className="about">
         <div className='img'>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton  width={isMobile ? 125 : "256px"} height={isMobile ? 150 : "306px"} />
            </SkeletonTheme>
            </div> 
        <div>
          <ConsoleStructure
            height={isMobile ? 600 :"400px"}
            width={isMobile ? 350 :700}
             margin={ isMobile ?'0px 50px 150px 0px' : undefined}
            content={
              <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <p>
                {isMobile ? skeltonDecDataMob.map((width, index) => (
                      <div key={index}>
                        <Skeleton width={width} borderRadius={10} />
                      </div>
                        )): skeltonDecData.map((width, index) => (
                      <div key={index}>
                        <Skeleton width={width} borderRadius={10} />
                      </div>
                        ))}
              </p>
              </SkeletonTheme>
            }
          />
        </div>
      </div>
    </motion.div> : 
    <motion.div
      className="about-container"
      initial={{ transform: "translateY(100px)", opacity: 0 }}
      animate={{ transform: "translateY(0px)", opacity: 1 }}
      transition={{ type: "spring" }}
    >
      <div className="about">
         <div className='img'>
            <FloatingImage image={about.profile} width={isMobile ? 125 : undefined} height={isMobile ? 150 : undefined}/>
            </div> 
        <div>
          <ConsoleStructure
            height={isMobile ? 600 :"400px"}
            width={isMobile ? 350 :700}
             margin={ isMobile ?'0px 50px 150px 0px' : undefined}
            content={
              <>
                <p>
                  {about.description}
                </p>
              </>
            }
          />
        </div>
      </div>
    </motion.div>
          }

          </>
  );
};

const Preview = ({json}) =>{
   const isMobile = useContext(isMobileContext)
return (
   <div className="about" style={{marginTop:100}}>
         <div className='img'>
            <FloatingImage image={json.profile} width={isMobile ? 125 : undefined} height={isMobile ? 150 : undefined}/>
            </div> 
        <div>
          <ConsoleStructure
            height={isMobile ? 600 :"400px"}
            width={isMobile ? 350 :700}
             margin={ isMobile ?'0px 50px 150px 0px' : undefined}
            content={
              <>
                <p>
                  {json.description}
                </p>
              </>
            }
          />
        </div>
      </div>
    
)
  }
