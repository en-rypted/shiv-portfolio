import React, { useContext, useState } from 'react'
import { ConsoleStructure } from './ConsoleStructure'
import './experience.css'
import isMobileContext from '../context/isMobileContext'
import { motion, spring } from "motion/react";

export const Experience = () => {
  const [index , setIndex] = useState(0);
  let experiences = [{
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
    <div className='exp-container'>
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
        <h4>Company Name : {experiences[index].companyName}</h4>
        <h6>{experiences[index].dureation}</h6>
        <label htmlFor="">#role : {experiences[index].role}</label>
        <label htmlFor="">#decription : </label>
        <p>{experiences[index].desc}</p>
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
    </div>
  )
}
