import React, { useState } from 'react'
import loderContext from './loderContext';
import { Loader } from '../components/animatedComponents/Loader';

export const IsLoder = (props) => {
    const [isLoder, setIsLoder] = useState(false);
    const update=(value) =>{
        setIsLoder(value);
    }
  return (
    <loderContext.Provider value={{isLoder,update}}>
        {props.children}
         {isLoder ? <Loader/> : ''}
    </loderContext.Provider>
  )
}
