import isMobileContext from "./isMobileContext";

import React, { useEffect, useState } from 'react'

export const IsMobile = (props) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
    
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 600);
        };
        
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
  return (
    <isMobileContext.Provider value={isMobile}>

{props.children}
    </isMobileContext.Provider>
  )
}
