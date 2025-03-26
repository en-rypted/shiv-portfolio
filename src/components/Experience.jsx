import React, { useContext } from 'react'
import { ConsoleStructure } from './ConsoleStructure'
import './experience.css'
import isMobileContext from '../context/isMobileContext'

export const Experience = () => {
  const isMobile = useContext(isMobileContext)
  return (
    <div className='exp-container'>

    <ConsoleStructure width={isMobile ? 375 : 1000} height={isMobile ? 700 : undefined} margin={isMobile ? '0px 0px 0px 0px' : 0} content={<div className='content-ex'>
        <h4>Company Name : TCS</h4>
        <h6>2022 - current</h6>
        <label htmlFor="">#role : Java Developer</label>
        <label htmlFor="">#decription : </label>
        <p>Tata Consultancy Services is an IT services, consulting and business solutions organization that has been partnering with many of the world’s largest businesses in their transformation journeys for over 56 years. Its consulting-led, cognitive powered, portfolio of business, technology and engineering services and solutions is delivered through its unique Location Independent Agile™ delivery model, recognized as a benchmark of excellence in software development.

A part of the Tata group, India's largest multinational business group, TCS has over 601,000 of the world’s best-trained consultants in 55 countries. The company generated consolidated revenues of US $29 billion in the fiscal year ended March 31, 2024, and is listed on the BSE and the NSE in India. TCS' proactive stance on climate change and award-winning work with communities across the world have earned it a place in leading sustainability indices such as the MSCI Global Sustainability Index and the FTSE4Good Emerging Index</p>

    </div>}/>
    </div>
  )
}
