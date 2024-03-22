import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {app} from "../firebase"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
const CreatePost = () => {
  const [imageUploadProgress,setimageProgrss] =useState(null);
  const [imageUploadError,setimageuploaderror]=useState(null);
  const [formdata,setformdata]=useState({})
  // console.log(formdata)
  const [file,setfile]=useState(null);
  // console.log(imageUploadProgress)
  const handleuploadImage=async()=>{
    try {
          if(!file)
          {  
            setimageuploaderror("Please select an image")
            return ;
          }
          setimageuploaderror(null)

          const storage =getStorage(app);
          const fileName= new Date().getTime()+ '-'+ file.name;
          const storageRef= ref(storage,fileName);
          const uploadTask = uploadBytesResumable(storageRef,file)
          uploadTask.on('state_changed'
          , (snapshot)=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes) *100
            setimageProgrss(progress.toFixed(0));

          } , (error)=>
          {
             setimageuploaderror("Upload Failed");
             setimageProgrss(null)
          } , ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
              
              setimageuploaderror(null);
              setformdata({...formdata,image:downloadUrl})
            })
          
          })
    } catch (error) {
       setimageuploaderror("image upload failed");
       setimageProgrss(null)
    }
  }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'> Create Post </h1>
       <form className='flex flex-col gap-4'>

        <div className='flex flex-col gap-4 sm:flex-row justify-between '>
          <TextInput  className=" flex-1"  type='text' placeholder='Title' required id='titlea'></TextInput>

          <Select>
            <option value="uncategorized"> Select a  Category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>

        <div className='flex gap-4 items-center justify-between border-4 border-red-200 border-dotted p-3'>
       <FileInput type="file" accept='image/*' onChange={(e)=>setfile(e.target.files[0])}>
       </FileInput>
       <Button type='button' gradientDuoTone="tealToLime" size="sm" onClick={handleuploadImage} outline>
       {  
           imageUploadProgress ? ("Loading..."):("Upload image")



}  </Button>

</div>
{
  imageUploadError && <Alert color="failure" > {imageUploadError}</Alert>
}
 {
  formdata.image && (
    <img src={formdata.image} alt="upload" className='w-full h-72 object-cover' />
  ) 

  
 }

        <ReactQuill theme='snow' placeholder='Write-something' className='h-60'></ReactQuill>
        <Button type='submit' gradientDuoTone="purpleToPink">
           Publish  
        </Button>
       
       
        </form>


    </div>
  )
}

export default CreatePost