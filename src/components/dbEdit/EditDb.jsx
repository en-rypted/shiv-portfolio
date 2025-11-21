import React, { useContext, useEffect, useRef, useState } from 'react'
import { db } from '../../config/firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { Editor } from '@monaco-editor/react';
// import "./editDb.css";
import loderContext from '../../context/loderContext';
import { useAlert } from '../../context/AlertContext';

export const EditDb = ({ docId, entityName, Preview, close, jsonData, width, height, addFlag }) => {
  const { showAlert } = useAlert();
  const [jsonCode, setJsonCode] = useState(JSON.stringify(jsonData, null, 2))
  const [isPrview, setIsPrview] = useState(false);
  const loader = useContext(loderContext);
  const editorRef = useRef(null);
  const handleEditorChange = (value) => {
    console.log(value);
    setJsonCode(value);
  }


  useEffect(() => {
    setJsonCode(JSON.stringify(jsonData, null, 2));

  }, [jsonData])

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonCode);
      setJsonCode(JSON.stringify(parsed, null, 2));
    } catch (err) {
      showAlert("Invalid JSON!", "error");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(jsonCode);
      setJsonCode(JSON.stringify(parsed));
    } catch (err) {
      showAlert("Invalid JSON!" + err.message, "error");
    }
  };

  const handleReset = () => {
    setJsonCode(JSON.stringify(jsonData, null, 2));
  };


  const updateSkill = async () => {
    try {
      loader.update(true)
      if (addFlag) {
        const docRef = await addDoc(collection(db, entityName), JSON.parse(jsonCode));
        showAlert(`Added doc with ID : ${docRef.id} in ${entityName} `)
        window.location.reload();
      } else {
        const docRef = doc(db, entityName, docId);
        await updateDoc(docRef, JSON.parse(jsonCode));

        showAlert("Update done");
        window.location.reload();
      }
      loader.update(false)
    } catch (err) {
      loader.update(false)
      showAlert("Error : " + err.message, "error");

    }

  };
  return (<>
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-8" style={{ width: width ? width : undefined, height: height ? height : undefined }}>
      <div className="w-[80%] max-w-[1500px] h-[600px] backdrop-blur-xl bg-white/5 shadow-2xl overflow-hidden rounded-xl border border-white/10 flex flex-col" style={{ width: width ? width : undefined, height: height ? height : undefined }}>
        <div className="flex gap-2 p-2 bg-black/20 border-b border-white/10">
          <button className="px-3 py-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 rounded text-sm transition-colors" onClick={handleFormat}>🧹 Format</button>
          <button className="px-3 py-1 bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/40 rounded text-sm transition-colors" onClick={handleMinify}>🔻 Minify</button>
          <button className="px-3 py-1 bg-red-600/20 text-red-400 hover:bg-red-600/40 rounded text-sm transition-colors" onClick={handleReset}>♻️ Reset</button>
          <div className="flex-1"></div>
          <button className="px-3 py-1 bg-purple-600/20 text-purple-400 hover:bg-purple-600/40 rounded text-sm transition-colors" onClick={() => { setIsPrview(!isPrview) }}>{isPrview ? '📕 Edit' : '👀 Prview'}</button>
          <button className="px-3 py-1 bg-green-600/20 text-green-400 hover:bg-green-600/40 rounded text-sm transition-colors" onClick={() => {
            updateSkill();
            close();
          }}>✔️ Save</button>
          <button className="px-3 py-1 bg-gray-600/20 text-gray-400 hover:bg-gray-600/40 rounded text-sm transition-colors" onClick={() => { close() }}>❌ Close</button>
        </div>

        {isPrview ? <div className="flex-1 overflow-auto p-4 bg-navy"><Preview json={JSON.parse(jsonCode)} /></div> :

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
            className="bg-transparent"
          />

        }
      </div>
    </div>
  </>)

}




