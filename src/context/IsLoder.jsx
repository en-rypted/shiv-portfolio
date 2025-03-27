import React, { useState } from 'react'
import loderContext from './loderContext';

export const IsLoder = (props) => {
    const [isLoder, setIsLoder] = useState(false);
    const update=(value) =>{
        setIsLoder(value);
    }
  return (
    <loderContext.Provider value={{isLoder,update}}>
        {props.children}
    </loderContext.Provider>
  )
}
