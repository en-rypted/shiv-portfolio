import React, { useContext, useEffect, useState } from 'react'
import './projects.css'
import { motion, spring } from 'motion/react'
import isMobileContext from '../context/isMobileContext'
import { ConsoleStructure } from './ConsoleStructure'
import interior from '../assets/image.png'
import shubraaj from '../assets/icons/shubhraaj.png'
import jarExplorer from '../assets/icons/JarExploere.svg'
import { EditDb } from './dbEdit/EditDb'
import authContext from '../context/authContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
let arry = [{
    title: 'Jar Explorer',
    deiscription : `Jar Explorer is a Visual Studio Code extension that allows developers to explore and decompile .jar files directly within the editor. It provides an intuitive tree view of the JAR file structure, making it easy to browse through all contained files, including .class files and other resources. The extension uses a custom JAR-based decompiler, such as CFR, to convert bytecode into readable Java source code with syntax highlighting. It features a clean and modern WebView interface, supports opening multiple JAR files simultaneously, and displays loading states during decompilation. Users can also configure JDK and decompiler paths, and optionally enable cancellation or timeouts during long decompiling operations. This tool is especially useful for Java developers who frequently need to inspect the contents of third-party libraries or debug compiled code without leaving the comfort of VS Code.`,
    image : jarExplorer,
    link : 'https://marketplace.visualstudio.com/items?itemName=shivwakchaure.jar-explorer'
  },
  {
    title: 'SHUBRAAJ',
    deiscription : `Shubraaj is a premier interior design firm specializing in creating elegant, functional, and timeless spaces. This project showcases my collaboration with Shubraaj to develop a visually captivating and user-friendly portfolio, reflecting their design philosophy and expertise.From conceptualization to execution, the portfolio highlights Shubraaj’s signature projects, featuring high-end residential and commercial interiors. The design approach focuses on clean aesthetics, immersive storytelling, and seamless navigation to enhance user engagement.`,
    image : shubraaj,
    link : 'https://en-rypted.github.io/shubraaj/'

  },
 
]

export const Projects = () => {
  const [index , setIndex] = useState(0)
  const isMobile = useContext(isMobileContext)
   const [isLoding , setIsLoading] = useState(true);
    const authuser = useContext(authContext);
    const [isEditOn,setIsEditOn] = useState(false);
    const [isAddOn,setIsAddOn] = useState(false);
  const projectsRef = collection(db , "projects");
  const data = [700, 580, 600, 450, 570,580, 600, 450, 570,580, 600, 450, 570,456];
    const [projects,setProjects] = useState([{id:"",data:{title:"",description:"",image:"",link:""}}]);
    let projectTemplate = {title :'add project title here',
      description : "Add project description here",
      image : "Add image link here",
      link : "add project link here",
      order : 0
    }
    
    useEffect(()=>{
          const getProjects = async () =>{
            try {
            
              const data = await getDocs(projectsRef);
              const filterdData = data.docs.map(e=>{return {id:e.id,data:e.data()}});
              const sortedData = filterdData.sort((a,b)=>a.data.order-b.data.order);
              //setSkillsId(data.docs[index].id);
              setProjects(sortedData)
              setIsLoading(false)
            } catch (error) {
              console.error(error)
              
            }
        }
            getProjects();
            console.log(projects)
        },[])

  return (
    <>
     {(authuser.user != null && !isMobile )&& <button style={{position:'fixed',zIndex:9999}} onClick={()=>{setIsEditOn(true)}} >📝 Edit</button>}
       {(authuser.user != null && !isMobile )&& <button style={{position:'fixed',marginTop:40,zIndex:9999}} onClick={()=>{setIsAddOn(true)}} >➕ Add</button>}
      {isEditOn && <EditDb jsonData={projects[index].data} docId={projects[index].id} close={()=>{setIsEditOn(false)}} entityName={"projects"} Preview={Preview}  ></EditDb>}
       {isAddOn && <EditDb addFlag={true}  jsonData={projectTemplate}  close={()=>{setIsAddOn(false)}} entityName={"projects"} Preview={Preview}  ></EditDb>}
    {
    
    isMobile 
      ?  <ProjectForMobile projects={projects} isLoding ={isLoding}/>
      :
    <div className='project-container' key={index} onClick={()=>{
      index < projects.length -1 ? setIndex(index+1) : setIndex(0)
    }}>
      <div className='project-inner'>
      < motion.div className='title'  
        initial={{opacity :0 }}
          animate={{opacity : 1 }}
          transition={{type:spring, delay:0.2}} key={index}><h2>{isLoding?<SkeletonTheme baseColor="#202020" highlightColor="#444">
                          <p>
                          <Skeleton  count={1} width={300} />
                        </p>
                        </SkeletonTheme>:projects[index].data.title}</h2></ motion.div>
        <motion.div className='discription'
         initial={{opacity :0 }}
         animate={{opacity : 1 }}
         transition={{type:spring, delay:0.2}} key={index}
        ><p>{isLoding?
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                      <p>
                        {data.map((width, index) => (
                      <div key={index}>
                        <Skeleton width={width} borderRadius={10} />
                      </div>
                        ))}
                      </p>
                      </SkeletonTheme>
        :projects[index].data.description}</p></motion.div>
        <motion.div className='link' initial={{opacity :0 }}
         animate={{opacity : 1 }}
         transition={{type:spring, delay:0.2}} key={index}>
          <a href={isLoding?"":projects[index].data.link} aria-disabled={isLoding}>{'</exploreProject>'}</a>
        </motion.div>
      
      </div>
       
        <motion.div className='image'
          initial={{opacity :0 , translateX : 400}}
          animate={{opacity : 1 , translateX:0}}
          transition={{type:spring}}
          style={{background:projects[index].data.image}}
          key={index}
        >
          {isLoding? <SkeletonTheme baseColor="#202020" highlightColor="#444">
                      <Skeleton  width={ "400px"} height={"400px"} />
                      </SkeletonTheme>:<img id='prj-img' src={projects[index].data.image} alt="" />}
        </motion.div>
    </div>
  }
  </>
  )
}


let ProjectForMobile = ({projects,isLoding}) =>{
  const [isMore,setIsMore] = useState(false);
  const decSkWidths = [200,190,170,180,130]
  const [data,setData] = useState({
    title:"",
    image:"",
    link:"",
    description:""
  })
   return (<>
    {isMore?<ProjectViewForMobile title={data.title} image={data.image} description={data.description} link={data.link} back={()=>{
      setIsMore(false);
    }}/> :
     <div style={{display:'flex' , flexDirection:'column' , justifyContent:'space-between' , alignItems:'center' , paddingTop:'150px' , paddingBottom:'150px',scrollBehavior:'smooth'}}>
       {projects.map((ele)=>{
        return (
        <ConsoleStructure key={ele.id}
          margin={'30px 0px 0px 0px'}
          width={300}
          height={450}
          content={<>
            {isLoding? 
            <div style={{marginLeft:"15px",marginTop:"20px"}}>
            <SkeletonTheme  baseColor="#202020" highlightColor="#444" >
                      <Skeleton  width={ "250px"} height={"150px"} />
                      </SkeletonTheme>
                </div>:<img id='img-project' src={ele.data.image}></img>}
            <div id='pro-title'>{isLoding?<SkeletonTheme baseColor="#202020" highlightColor="#444">
                          <p>
                          <Skeleton width={200} count={1} />
                        </p>
                        </SkeletonTheme>:ele.data.title}</div>
            <p id='dec-project'>{isLoding?<SkeletonTheme baseColor="#202020" highlightColor="#444">
                      <p>
                       {decSkWidths.map((width, index) => (
                      <div key={index}>
                        <Skeleton width={width} borderRadius={10} />
                      </div>
                        ))}
                      </p>
                      </SkeletonTheme>:ele.data.description.substring(0,200)+'....'}</p>
            <button id='more' onClick={(e)=>{
              e.preventDefault();
              setData({
                title:ele.data.title,
                image:ele.data.image,
                description:ele.data.description,
                link:ele.data.link
              })
              setIsMore(true)
            }}>{'</more>'}</button>
            <button id='exploreProject'> <a href={isLoding?"":ele.data.link}>{'</exploreProject>'}</a></button>
             
          </>}
        />)
       })}
     </div>
     }
     </>
   )
}

let ProjectViewForMobile = ({title,image,description,link,back}) => {
  
  return(<>
      <div style={mbcontainer}>
        <div style={titleMb}>{title}</div>
         <img style={{margin:'30px',height:'200px'}} src={image}></img>
           <p id='dec-project'>{description}</p>
           <div style={{display:'flex',marginTop:'20px'}}>
 <button style={exploreButMb}> <a href={link} style={linkMb}>{'</exploreProject>'}</a></button>
           <button style={exploreButMb} onClick={(e)=>{
              e.preventDefault();
              back();
           }}> {'</back>'}</button>
           </div>
          
      </div>
  </>)
}

const mbcontainer ={
  display : 'flex',
  flexDirection : 'column',
  margin : "100px 20px 200px 20px",
  overflow:"auto"
}

const titleMb = {fontSize:'25px',margin:'20px'}

const exploreButMb = {
  float:"right",
    backgroundColor: 'transparent',
  border: 'none',
  marginBottom: "10px",
  marginLeft: "0px",
  cursor: "pointer",
  width:'200px',
   color: "rgb(0, 255, 110)",
  
}

const linkMb = {
 
    color: "rgb(0, 255, 110)",
    textDecoration: "none",
  
}


const Preview = ({json}) =>{
  
return (
<div className='project-container'  >
      <div className='project-inner'>
      < motion.div className='title'  
        initial={{opacity :0 }}
          animate={{opacity : 1 }}
          transition={{type:spring, delay:0.2}} key={json}><h2>{json.title}</h2></ motion.div>
        <motion.div className='discription'
         initial={{opacity :0 }}
         animate={{opacity : 1 }}
         transition={{type:spring, delay:0.2}} key={json}
        ><p>{json.description}</p></motion.div>
        <motion.div className='link' initial={{opacity :0 }}
         animate={{opacity : 1 }}
         transition={{type:spring, delay:0.2}} key={json}>
          <a href={json.link}>{'</exploreProject>'}</a>
        </motion.div>
      
      </div>
       
        <motion.div className='image'
          initial={{opacity :0 , translateX : 400}}
          animate={{opacity : 1 , translateX:0}}
          transition={{type:spring}}
          style={{background:json.image}}
          key={json}
        >
          <img id='prj-img' src={json.image} alt="" />
        </motion.div>
    </div>
    
)
  }