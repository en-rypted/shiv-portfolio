import React from 'react'
import './console.css'

export const ConsoleStructure = ({height,width,content,margin}) => {
  return (
    <div className="cmd-cont" style={{margin : margin }}>
        {/* <div className="header" style={{width:width}}>
          
          <div className="tool">
            { <i
              style={{ color: "red" }}
              className="fa-solid fa-circle-xmark"
            ></i>
            <i
              style={{ color: "orange" }}
              className="fa-solid fa-circle-minus"
            ></i>
            <i
              style={{ color: "green" }}
              className="fa-solid fa-circle-chevron-up"
            ></i>}
          </div>
        </div> */}
        <div className="screen-header" style={{width:width}}>
        <div className="screen-header-left">
          <div className="screen-header-button close"></div>
          <div className="screen-header-button maximize"></div>
          <div className="screen-header-button minimize"></div>
        </div>
        <div className="screen-header-right">
          <div className="screen-header-ellipsis"></div>
          <div className="screen-header-ellipsis"></div>
          <div className="screen-header-ellipsis"></div>
        </div>
      </div>
        <div style={{...type_wirter_box, height : height,  width: width }}>
          <code markup="tt">
            {content}
          </code>
        </div>
      </div>
  )
}

const type_wirter_box = {
    alignItem: "center",
    padding: "0px 0px 0px 10px",
    fontFamily: "JetBrains Mono",
    clear: "both",
    color: "#fff",
    background: "#1b1b1b",
    MozTabSize: 2,
    OTabSize: 2,
    TabSize: 2,
    MsWordBreak: "normal",
    wordBreak: "normal",
    WebkitHyphens: "none",
    MsHyphens: "none",
    hyphens: "none",
    position: "relative"
    , borderBottomLeftRadius: "8px" , borderBottomRightRadius : "8px",
    overflow: "hidden",
    fontSize: "xx-large",
  };
  
