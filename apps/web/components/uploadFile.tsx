// "use client"
// import Image from 'next/image'
// import React, {useCallback, useState} from 'react'
// import {FileRejection, useDropzone} from 'react-dropzone'
// import { Button } from './ui/button'
// import JSZip from"jszip"
// import axios from "axios"
// import { Upload } from "lucide-react"
// import { BACKEN_URL } from '@/lib/config'
// export default function MyDropzone() {
//     const [files,setFiles]=useState<File[]>([ ])
//     const [rejected, setRejected] = useState<FileRejection[]>([])
//     const removeFile=(name:string)=>{
//    setFiles(files.filter(file=>file.name!==name))
//   }

//    const removeRejected=(name:string)=>{
//     setRejected(rejected.filter(file=>file.file.name!==name))
//    }
//   const remoeAll=()=>{
//     setFiles([]),
//     setRejected([])
//   }
//   const onDrop = useCallback((acceptedFiles:File[] ,rejectedFiles:FileRejection[]) => {
//    if(acceptedFiles?.length){
//      setFiles(prevsFiles=>[
//         ...prevsFiles,
//         ...acceptedFiles.map(file=>Object.assign(file,{preview:URL.createObjectURL(file)}))
//      ])
  
//    }
//    if(rejectedFiles.length){
//     setRejected(prevsFile=>[
//         ...prevsFile,
//         ...rejectedFiles
//     ])
//    }
//   }, [])


// const handleFormSubmit= async(e: React.FormEvent<EventTarget>)=>{
//     e.preventDefault()
//     const formData=new FormData()
//     const zip = new JSZip();
//     const res= await axios.get(`${BACKEN_URL}/presign_url`);
//     const preSignedurl=res.data.url;
//     const key=res.data.key
//     console.log(preSignedurl);
//     files.forEach(file=>{
//       const content=file.arrayBuffer();
//       zip.file(file.name,content);
//     });
//    const content= await zip.generateAsync({type:"blob"})
//    formData.append("file",content)
//    formData.append("key",preSignedurl)
//    const resFromR2= await axios.put(preSignedurl,formData)
//    console.log(resFromR2);
// }

//   const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: {
//     'image/*': [] 
//   },
//   maxSize :1024 *1000
// })

//   return (


//     <form onSubmit={handleFormSubmit} >
//     <div {...getRootProps({
//         className:" m-10 p-16   border-dashed border-3 border-neutral-200  relative flex justify-center items-center  "
//     }
//     )}>
      
//       <input {...getInputProps()} />
  


//     {isDragActive ? (
//               <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
//                 <div className="rounded-full border border-dashed p-3">
//                   <Upload
//                     className="size-7 text-muted-foreground"
//                     aria-hidden="true"
//                   />
//                 </div>
//                 <p className="font-medium text-muted-foreground">
//                   Drop the files here
//                 </p>
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
//                 <div className="rounded-full border border-dashed p-3">
//                   <Upload
//                     className="size-7 text-muted-foreground"
//                     aria-hidden="true"
//                   />
//                 </div>
//                 <div className="flex flex-col gap-px">
//                   <p className="font-medium text-muted-foreground">
//                     Drag {`'n'`} drop files here, or click to select files
//                   </p>
//                   <p className="text-sm text-center text-muted-foreground/70">
//                      upload 4 files (up to 1MB each)`
              
//                   </p>
//                 </div>
//               </div>
//             )}
//     </div>
//     <div className='  mx-10 flex justify-center '>
//     <Button type='submit'>Submit</Button>   
//     </div>
//     <div className='flex items-center'>
//     <h3 className='title m-10  text-lg font-semibold text-neutral-600 mt-10 border-b pb-3'>
//           Preview Files
//     </h3>
//     <div className=''>
//     <Button  variant={"secondary"} onClick={remoeAll}>Remove All Files</Button>   
//     </div>
//     </div>
//      {/* Accepted files */}
//      <h3 className='title m-10  text-lg font-semibold text-neutral-600 mt-10 border-b pb-3'>
//           Accepted Files
//     </h3>
//     <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10 border-dashed border-3 p-10 '  >
//     {files.map(file => (


//             <li key={file.name} className=' relative size-60 space-x-4  rounded-md shadow-lg  m-10'>
//               <Image
//                 src={file.preview}
//                 alt={file.name}
//                 width={200}
//                 height={200}
//                 onLoad={() => {
//                   URL.revokeObjectURL(file.preview)
//                 }}
//                 className='h-full w-full object-contain rounded-md'
//               />
//               <Button
//                 type='button'
//                 variant={"destructive"}
//                 className='w-7 h-7 border rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-red-200 transition-colors'
//                 onClick={() => removeFile(file.name)}
//               >
                
//                 <svg className='w-5 h-5 fill-white hover:fill-secondary-400 transition-colors' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
//                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
//                  </svg>

//               </Button>
//               <p className='mt-2 text-neutral-500 text-[12px] font-medium'>
//                 {/* {file.name} */}
//               </p>
//             </li>
//           ))}
//     </ul>

//      {/* Rejected Files */}
//     <h3 className='title text-lg font-semibold text-neutral-600 mt-10 border-b p-10'>
//           Rejected Files
//     </h3>
//     <ul className='  mt-6 flex flex-col border-dashed border-3 p-3'>
//     {rejected.map(({ file, errors},index) => (
//             <li key={index} className='flex items-start justify-between '>
//               <div className=' flex flex-col gap-2'>
//                 <p className='mt-2 text-neutral-500 text-sm font-medium'>
//                   {file.name}
//                 </p>
//                 <ul className='text-[16px] text-red-400'>
//                   {errors.map(error => (
//                     <li key={error.code}>{error.message}</li>
//                   ))}
//                 </ul>
//               </div>
//               <Button
//                 type='button'
//                 variant={"destructive"}
//                 className='mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-black-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors'
//                 onClick={() => removeRejected(file.name)}
//               >
//                 remove
//               </Button>
//             </li>
//           ))}
//     </ul>
//     </form>
//   )
// }