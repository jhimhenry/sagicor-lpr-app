
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
 
const baseStyle = {
  display: 'flex',
  color: 'black',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#EDD3C4',
  borderStyle: 'dashed',
  backgroundColor: '#f9f9f9',
  //color: '#bdbdbd',
  transition: 'border .3s ease-in-out'
};
 
const activeStyle = {
  borderColor: '#2196f3'
};
 
const acceptStyle = {
  borderColor: '#00e676'
};
 
const rejectStyle = {
  borderColor: '#ff1744'
};
 
function DropzoneComponent(props) {
  const [files, setFiles] = useState([]);
     
  const onDrop = useCallback(acceptedFiles => {
        //ADD WHAT HAPPENS HERE
    console.log(acceptedFiles);
  }, []);
 
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, video/avi, video/mp4'
  });
 
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);
 
  const thumbs = files.map(file => (
    <div key={file.name}>
      <img
        src={file.preview}
        alt={file.name}
      width="200" height="200"/>
    </div>
  ));
 
  // clean up
  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
   
  return (
    <section>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        
        <div>Upload a file or drag and drop up to 100 MB</div>
      </div>
      <aside>
        {thumbs}
      </aside>
    </section>
  )
}
 
export default DropzoneComponent;