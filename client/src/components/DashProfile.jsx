import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import { app } from '../firebase';
import {getDownloadURL,getStorage, ref, uploadBytesResumable} from "firebase/storage"

const DashProfile = () => {
    const {currentUser} =useSelector((state)=>state.user);
    const [imagefile,setFile]= useState(null) ;
    const fileRef=useRef();
    const [imageFileUploadError,setImageError] =useState(null);
   const [imgageFileuploading,setimageFileupload]=useState(0);
   console.log(imgageFileuploading)
    const [imageURL,setimageUrl] = useState(null);

    console.log(currentUser);
   console.log(imageURL)
    const handleimagechange=(e)=>{
       const file= e.target.files[0];
       if(file)
       {
        setFile(file);
       setimageUrl(URL.createObjectURL(file));
       }

    }
    // console.log(imageURL)
    console.log(imagefile)

    useEffect(()=>{
      if(imagefile)
      {
        handleimagefile(imagefile);
      }
    },[imagefile])

    const handleimagefile=async (imagefile)=>{
      // service firebase.storage {
      //   match /b/{bucket}/o {
      //     match /{allPaths=**} {
      //       allow read;
      //       allow write:if
      //       request.resource.size <2*1024*1024 && 
      //       request.resource.contentType.matches('image/.*')
      //     }
      //   }
      // }

      const storage= getStorage(app);
       const fileName= new Date().getTime()+ imagefile.name;
       const storageRef=ref(storage,fileName);
       const UploadTask= uploadBytesResumable(storageRef,imagefile);
       UploadTask.on('state_changed', (snapshot)=>
       {
        const progress = (snapshot.bytesTransferred/ snapshot.totalBytes)*100;
        setimageFileupload(progress.toFixed(0));

        console.log(`upload is ${progress}%  done`)
       },
       (error)=>{
          setImageError("Couldn't upload image file ")
       },
       ()=>{
        getDownloadURL(UploadTask.snapshot.ref).then((downloadURL)=>{
          setimageUrl(downloadURL)
        }
        )
       })
    }
  return (
    <div className='max-w-lg mx-auto w-full'>
        
        <h1 className=' text-center font-semibold text-3xl my-5'>Profile</h1>
        <form action="" className='flex flex-col gap-4'>
            
            <input type="file" accept='image/*' hidden onChange={handleimagechange} ref={fileRef}/>
            <div className='w-32 h-32 self-center cursor-pointer  ' onClick={()=>fileRef.current.click()}> 
            <img src={imageURL ? imageURL : currentUser.profilePic} alt="" className='rounded-full w-full h-full'/>
            </div> 
           {
            imageFileUploadError && (
              <Alert color='failure'>
                {imageFileUploadError}
              </Alert>
            )
           }
            <TextInput type="text" id="username" placeholder='username' defaultValue={currentUser.username} />
            <TextInput type="email" id="email" placeholder='email' defaultValue={currentUser.email} />
            <TextInput type="password" id="password" placeholder='password'   />

          <Button type="submit" gradientDuoTone='purpleToBlue' outline>
            Update

          </Button>


        </form>

        <div className='flex flex-row justify-between mt-4 text-red-500'>
            <span className='cursor-pointer'> Delete Account</span>
            
            <span className='cursor-pointer'> Sign out</span>
        </div>
    </div>
  )
}

export default DashProfile