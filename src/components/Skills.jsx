import React from 'react'
import './skills.css'
import { motion } from 'motion/react'
import { Hexagon } from './animatedComponents/Hexagon'
//import java from '../assets/icons/java.svg'
import {icons} from '../assets/icons/icons'
export const Skills = () => {
    Object.keys(icons).map((ele)=>{console.log(ele)})
  return (
    <div className='hex-container'>
        {Object.keys(icons).map((ele)=>{
            return <div className='hex-row' key={ele}>
                {icons[ele].map((ele2)=>{
            return <Hexagon key={ele2.name} name={ele2.svg}/>
           })}
            </div>
        })}
    </div>
  )
}
