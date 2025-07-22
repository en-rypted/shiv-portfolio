import React, { useContext, useEffect, useRef, useState } from 'react'
import { db } from '../../config/firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { Editor } from '@monaco-editor/react';
import "./editDb.css";
import loderContext from '../../context/loderContext';
import { useAlert } from '../../context/AlertContext';

export const EditDb = ({docId,entityName,Preview,close,jsonData,width,height,addFlag}) => {
  const {showAlert} = useAlert();
  const [jsonCode,setJsonCode] = useState(JSON.stringify(jsonData, null, 2))
const [isPrview ,setIsPrview] = useState(false);
const loader = useContext(loderContext);
 const editorRef = useRef(null);
const handleEditorChange = (value)=>{
  console.log(value);
   setJsonCode(value);
}


useEffect(()=>{
   setJsonCode(JSON.stringify(jsonData,null, 2));

},[jsonData])

 const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonCode);
      setJsonCode(JSON.stringify(parsed, null, 2));
    } catch (err) {
      showAlert("Invalid JSON!","error");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(jsonCode);
      setJsonCode(JSON.stringify(parsed));
    } catch (err) {
      showAlert("Invalid JSON!" + err.message,"error");
    }
  };

  const handleReset = () => {
    setJsonCode(JSON.stringify(jsonData, null, 2));
  };


  const updateSkill = async () => {
    try{
    loader.update(true)
    if(addFlag){
        const docRef = await addDoc(collection(db, entityName), JSON.parse(jsonCode) );
        showAlert(`Added doc with ID : ${docRef.id} in ${entityName} `)
         window.location.reload();
    }else{
     const docRef = doc(db, entityName, docId);
      await updateDoc(docRef, JSON.parse(jsonCode));

      showAlert("Update done");
      window.location.reload();
    }
     loader.update(false)
    }catch(err){
        loader.update(false)
        showAlert("Error : " + err.message,"error");

    }
 
};
  return(<>
      <div className="editor-wrapper" style={{width : width ? width : undefined,height: height ? height : undefined}}>
      <div className="editor-glass" style={{width : width ? width : undefined,height: height ? height : undefined}}>
          <button onClick={handleFormat}>🧹 Format</button>
          <button onClick={handleMinify}>🔻 Minify</button>
          <button onClick={handleReset}>♻️ Reset</button>
        <button onClick={()=>{close()}}>❌ Close</button>
         <button onClick={()=>{setIsPrview(!isPrview)}}>{isPrview?'📕 Edit':'👀 Prview'}</button>
          <button onClick={()=>{
            updateSkill();
            close();
          }}>✔️ Save</button>
     {isPrview?<Preview json={JSON.parse(jsonCode)}/>: 
   
     <Editor
     key={editorRef}
        height="100%"
        defaultLanguage="json"
        value={jsonCode}
        onChange={handleEditorChange}
        
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
           theme: 'vs-dark'
        }}
      />
      
      }
    </div>
    </div>
  </>)

}




