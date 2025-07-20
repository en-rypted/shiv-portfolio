import React, { useContext, useEffect, useState } from 'react'
import './skills.css'
import { motion } from 'motion/react'
import { Hexagon, HexagonLoader } from './animatedComponents/Hexagon'
import { db } from '../config/firebase'
import { getDocs ,collection, updateDoc, doc } from 'firebase/firestore'
import Skeleton , { SkeletonTheme }from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {icons , inconsMobile} from '../assets/icons/icons'
import isMobileContext from '../context/isMobileContext'
import Editor from '@monaco-editor/react';
import authContext from '../context/authContext'
import { EditDb } from './dbEdit/EditDb'
export const Skills = () => {
    
    const [skills , setSkills] = useState({});
    const skillsRef = collection(db , "skills");
    const [isLoding , setIsLoading] = useState(true);
    const isMobile = useContext(isMobileContext)
    let fakeSkills = isMobile ? inconsMobile : icons;
    const authuser = useContext(authContext);
    const [isEditOn,setIsEditOn] = useState(false);
    const [skillsId,setSkillsId] = useState("");
    useEffect(()=>{
      const getSkills = async () =>{
        try {
          let index = isMobile ? 1 : 0;
          const data = await getDocs(skillsRef);
          const filterdData = data.docs[index].data();
          setSkillsId(data.docs[index].id);
          setSkills(filterdData)
          setIsLoading(false)
        } catch (error) {
          console.error(error)
        }
    }
        getSkills();
        console.log(skills)
    },[])
  return (
    <div>
      {authuser.user != null && <button style={{position:'fixed'}} onClick={()=>{setIsEditOn(true)}} >📝 Edit</button>}
    {isEditOn && <EditDb jsonData={skills} docId={skillsId} close={()=>{setIsEditOn(false)}} entityName={"Skills"} Preview={Preview} ></EditDb>}
    {isLoding ? 
       <motion.div className='hex-container'
       initial={{ transform: "translateY(100px)" , opacity : 0 }}
       animate={{ transform: "translateY(0px)" , opacity : 1 }}
       transition={{ type: "spring" }}
         >
           {Object.keys(fakeSkills).sort().map((ele)=>{
               return <div className='hex-row' key={ele}>
                   {fakeSkills[ele].map((ele2)=>{
               return <HexagonLoader  bg={ele2.bg ? ele2.bg : null} key={ele2.name} name={ele2.svg}/>
              })}
               </div>
           })}
       </motion.div>
      
      :
    <motion.div className='hex-container'
    initial={{ transform: "translateY(100px)" , opacity : 0 }}
    animate={{ transform: "translateY(0px)" , opacity : 1 }}
    transition={{ type: "spring" }}
      >
        {Object.keys(skills).sort().map((ele)=>{
            return <div className='hex-row' key={ele}>
                {skills[ele].map((ele2)=>{
            return <Hexagon bg={ele2.bg ? ele2.bg : null} key={ele2.name} name={ele2.svg}/>
           })}
            </div>
        })}
    </motion.div>
      }

</div>
  )
}

 const Preview = ({json}) =>{
return (
   <motion.div className='hex-container'
    initial={{ transform: "translateY(100px)" , opacity : 0 }}
    animate={{ transform: "translateY(0px)" , opacity : 1 }}
    transition={{ type: "spring" }}
      >
        {Object.keys(json).sort().map((ele)=>{
            return <div className='hex-row' key={ele}>
                {json[ele].map((ele2)=>{
            return <Hexagon bg={ele2.bg ? ele2.bg : null} key={ele2.name} name={ele2.svg}/>
           })}
            </div>
        })}
    </motion.div>
)
  }
