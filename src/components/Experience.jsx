import React, { useContext, useEffect, useState } from 'react'
import { ConsoleStructure } from './ConsoleStructure'
import './experience.css'
import isMobileContext from '../context/isMobileContext'
import { motion, spring } from "motion/react";
import authContext from '../context/authContext';
import { collection, getDocs } from 'firebase/firestore';
import { EditDb } from './dbEdit/EditDb';
import { db } from '../config/firebase';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const Experience = () => {
  const [index , setIndex] = useState(0);

   const [isLoding , setIsLoading] = useState(true);
    const authuser = useContext(authContext);
    const [isEditOn,setIsEditOn] = useState(false);
    const [isAddOn,setIsAddOn] = useState(false);
  const experiencesRef = collection(db , "experiences");
  const skeltonDecData = [700, 580, 600, 450, 570,580, 600, 450,];
  const skeltonDecDataMob = [300, 280, 250, 250, 270,280, 200, 250, 270,280, 300, 250, 270,256,300, 280, 250, 250, 270,280, 200, 250, 270,180,256,300, 280, ];
    const [experiences,setexperiences] = useState([{id:"",data:{companyName:"",duration:"",role:"",desc:"",order:0}}]);
    let experienceTemplate = {companyName :'add project title here',
      desc : "Add project description here",
      duration:"Add duration in here 2022-2023/present",
      role : "Add role here",
      order : 0
    }
    
    useEffect(()=>{
          const getExeriences = async () =>{
            try {
            
              const data = await getDocs(experiencesRef);
              if(data.docs.length == 0){
                return;
              }
              const filterdData = data.docs.map(e=>{return {id:e.id,data:e.data()}});
              const sortedData = filterdData.sort((a,b)=>a.data.order-b.data.order);
              //setSkillsId(data.docs[index].id);
              setexperiences(sortedData)
              setIsLoading(false)
            } catch (error) {
              console.error(error)
              
            }
        }
            getExeriences();
            console.log(experiences)
        },[])
  let experiencess = [{
    companyName : 'TCS',
    dureation : '2022 - current',
    role : 'Java Developer',
    desc:`Tata Consultancy Services is an IT services, consulting and business solutions organization that has been partnering with many of the world’s largest businesses in their transformation journeys for over 56 years. Its consulting-led, cognitive powered, portfolio of business, technology and engineering services and solutions is delivered through its unique Location Independent Agile™ delivery model, recognized as a benchmark of excellence in software development.

A part of the Tata group, India's largest multinational business group, TCS has over 601,000 of the world’s best-trained consultants in 55 countries. The company generated consolidated revenues of US $29 billion in the fiscal year ended March 31, 2024, and is listed on the BSE and the NSE in India. TCS' proactive stance on climate change and award-winning work with communities across the world have earned it a place in leading sustainability indices such as the MSCI Global Sustainability Index and the FTSE4Good Emerging Index
`
  },
  {
    companyName : 'TCS',
    dureation : '2022 - current',
    role : 'Java Developer',
    desc:`Tata Consultancy Services is an IT services, consulting and business solutions organization that has been partnering with many of the world’s largest businesses in their transformation journeys for over 56 years. Its consulting-led, cognitive powered, portfolio of business, technology and engineering services and solutions is delivered through its unique Location Independent Agile™ delivery model, recognized as a benchmark of excellence in software development.

A part of the Tata group, India's largest multinational business group, TCS has over 601,000 of the world’s best-trained consultants in 55 countries. The company generated consolidated revenues of US $29 billion in the fiscal year ended March 31, 2024, and is listed on the BSE and the NSE in India. TCS' proactive stance on climate change and award-winning work with communities across the world have earned it a place in leading sustainability indices such as the MSCI Global Sustainability Index and the FTSE4Good Emerging Index
`
  }
]
  const isMobile = useContext(isMobileContext)
  return (
    <>
     {(authuser.user != null && !isMobile )&& <button style={{position:'fixed',zIndex:9999}} onClick={()=>{setIsEditOn(true)}} >📝 Edit</button>}
       {(authuser.user != null && !isMobile )&& <button style={{position:'fixed',marginTop:40,zIndex:9999}} onClick={()=>{setIsAddOn(true)}} >➕ Add</button>}
      {isEditOn && <EditDb height={600} width={1500} jsonData={experiences[index].data} docId={experiences[index].id} close={()=>{setIsEditOn(false)}} entityName={"experiences"} Preview={Preview}  ></EditDb>}
       {isAddOn && <EditDb height={600} width={1500} addFlag={true}  jsonData={experienceTemplate}  close={()=>{setIsAddOn(false)}} entityName={"experiences"} Preview={Preview}  ></EditDb>}
    <motion.div className='exp-container'
    initial={{ transform: "translateY(100px)", opacity: 0 }}
    animate={{ transform: "translateY(0px)", opacity: 1 }}
    transition={{ type: "spring" }}
    >
      <div>

    <ConsoleStructure width={isMobile ? 375 : 1000}  
    content={
    <>
    
    <motion.div className='content-ex'
    initial = {{opacity:0}}
    animate = {{opacity:1}}
    transition={{type:spring , delay:0.2}}
    key={index}
    >
        <h4>Company Name : {isLoding?<SkeletonTheme baseColor="#202020" highlightColor="#444">
                                  
                                  <Skeleton  count={1} width={300} />
                               
                                </SkeletonTheme>:experiences[index].data.companyName}</h4>
        <h6>{isLoding?<SkeletonTheme baseColor="#202020" highlightColor="#444">
                                  <p>
                                  <Skeleton  count={1} width={200} />
                                </p>
                                </SkeletonTheme>:experiences[index].data.duration}</h6>
        <label htmlFor="">#role : {isLoding?<SkeletonTheme baseColor="#202020" highlightColor="#444">
                                 
                                  <Skeleton  count={1} width={100} />
                               
                                </SkeletonTheme>:experiences[index].data.role}</label>
        <label htmlFor="">#decription : </label>
        <p>{isLoding?<SkeletonTheme baseColor="#202020" highlightColor="#444">
                             
                                {isMobile?skeltonDecDataMob.map((width, index) => (
                              <div key={index}>
                                <Skeleton width={width} borderRadius={10} />
                              </div>
                                )):skeltonDecData.map((width, index) => (
                              <div key={index}>
                                <Skeleton width={width} borderRadius={10} />
                              </div>
                                ))}
                             
                              </SkeletonTheme>:experiences[index].data.desc}</p>
    </motion.div>
    <div id='btns'>
    <button id='prev' onClick={(e)=>{e.preventDefault(); 
          
          index == 0 ? setIndex(experiences.length-1) : setIndex(index-1)}}>{'</prev>'}</button>
    <button id='next' onClick={(e)=>{e.preventDefault(); 
        
        index == experiences.length-1 ? setIndex(0) : setIndex(index+1)}}>{'</next>'}</button>
       
        
    </div>
    
    </>
    }/>
    </div>
    </motion.div>
    </>
  )
}


const Preview = ({json}) =>{
  
return (
<motion.div className='exp-container'
style={{marginTop:20,marginLeft:0}}
    initial={{ transform: "translateY(100px)", opacity: 0 }}
    animate={{ transform: "translateY(0px)", opacity: 1 }}
    transition={{ type: "spring" }}
    >
      <div>

    <ConsoleStructure width={1000}  
    content={
    <>
    
    <motion.div className='content-ex'
    initial = {{opacity:0}}
    animate = {{opacity:1}}
    transition={{type:spring , delay:0.2}}
    key={json}
    >
        <h4>Company Name : {json.companyName}</h4>
        <h6>{json.duration}</h6>
        <label htmlFor="">#role : {json.role}</label>
        <label htmlFor="">#decription : </label>
        <p>{json.desc}</p>
    </motion.div>
    <div id='btns'>
    <button id='prev' >{'</prev>'}</button>
    <button id='next' >{'</next>'}</button>
  
    </div>
    
    </>
    }/>
    </div>
    </motion.div>
   
)
  }
