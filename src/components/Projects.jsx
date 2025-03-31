import React, { useContext, useState } from 'react'
import './projects.css'
import { motion, spring } from 'motion/react'
import isMobileContext from '../context/isMobileContext'
import { ConsoleStructure } from './ConsoleStructure'
import interior from '../assets/image.png'
import shubraaj from '../assets/icons/shubhraaj.png'
export const Projects = () => {
  const [index , setIndex] = useState(0)
  const isMobile = useContext(isMobileContext)
  let arry = [{
    title: 'SHUBRAAJ',
    deiscription : `Shubraaj is a premier interior design firm specializing in creating elegant, functional, and timeless spaces. This project showcases my collaboration with Shubraaj to develop a visually captivating and user-friendly portfolio, reflecting their design philosophy and expertise.

From conceptualization to execution, the portfolio highlights Shubraaj’s signature projects, featuring high-end residential and commercial interiors. The design approach focuses on clean aesthetics, immersive storytelling, and seamless navigation to enhance user engagement.`,
    image : shubraaj,
    link : 'https://en-rypted.github.io/shubraaj/'
  },
  {
    title: 'SHUBRAAJ',
    deiscription : `Shubraaj is a premier interior design firm specializing in creating elegant, functional, and timeless spaces. This project showcases my collaboration with Shubraaj to develop a visually captivating and user-friendly portfolio, reflecting their design philosophy and expertise.

From conceptualization to execution, the portfolio highlights Shubraaj’s signature projects, featuring high-end residential and commercial interiors. The design approach focuses on clean aesthetics, immersive storytelling, and seamless navigation to enhance user engagement.`,
    image : shubraaj,
    link : 'https://en-rypted.github.io/shubraaj/'

  },
 
]
  return (
    <>
    {isMobile
      ?  <ProjectForMobile/>
      :
    <div className='project-container' key={index} onClick={()=>{
      index < arry.length -1 ? setIndex(index+1) : setIndex(0)
    }}>
      <div className='project-inner'>
      < motion.div className='title'  
        initial={{opacity :0 }}
          animate={{opacity : 1 }}
          transition={{type:spring, delay:0.2}} key={index}><h2>{arry[index].title}</h2></ motion.div>
        <motion.div className='discription'
         initial={{opacity :0 }}
         animate={{opacity : 1 }}
         transition={{type:spring, delay:0.2}} key={index}
        ><p>{arry[index].deiscription}</p></motion.div>
        <motion.div className='link' initial={{opacity :0 }}
         animate={{opacity : 1 }}
         transition={{type:spring, delay:0.2}} key={index}>
          <a href={arry[index].link}>#exploreProject</a>
        </motion.div>
      
      </div>
       
        <motion.div className='image'
          initial={{opacity :0 , translateX : 400}}
          animate={{opacity : 1 , translateX:0}}
          transition={{type:spring}}
          style={{background:arry[index].image}}
          key={index}
        >
          <img id='prj-img' src={arry[index].image} alt="" />
        </motion.div>
    </div>
  }
  </>
  )
}


let ProjectForMobile = () =>{
  
  let arry = [{
    title: 'SHUBRAAJ',
    deiscription : `Shubraaj is a premier interior design firm specializing in creating elegant, functional, and timeless spaces. This project showcases my collaboration with Shubraaj to develop a visually captivating and user-friendly portfolio, reflecting their design philosophy and expertise.

From conceptualization to execution, the portfolio highlights Shubraaj’s signature projects, featuring high-end residential and commercial interiors. The design approach focuses on clean aesthetics, immersive storytelling, and seamless navigation to enhance user engagement.`,
    image : shubraaj
  },
  {
    title: 'SHUBRAAJ',
    deiscription : `Shubraaj is a premier interior design firm specializing in creating elegant, functional, and timeless spaces. This project showcases my collaboration with Shubraaj to develop a visually captivating and user-friendly portfolio, reflecting their design philosophy and expertise.

From conceptualization to execution, the portfolio highlights Shubraaj’s signature projects, featuring high-end residential and commercial interiors. The design approach focuses on clean aesthetics, immersive storytelling, and seamless navigation to enhance user engagement.`,
    image : shubraaj
  },
 
]
   return (
     <div style={{display:'flex' , flexDirection:'column' , justifyContent:'space-between' , alignItems:'center' , paddingTop:'150px' , paddingBottom:'150px',scrollBehavior:'smooth'}}>
       {arry.map((ele)=>{
        return (
        <ConsoleStructure
          margin={'30px 0px 0px 0px'}
          width={300}
          height={400}
          content={<>
            <img id='img-project' src={interior}></img>
            <div id='pro-title'>{ele.title}</div>
            <p id='dec-project'>{ele.deiscription.substring(0,200)+'....'}</p>
          </>}
        />)
       })}
     </div>
   )
}
