import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import {app} from "../firebase"
import {useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

function Oath() {
    const auth=getAuth(app);
    const dispatch=useDispatch();
   const navigate=useNavigate();


    const handleGoogleClick=async()=>{
        const provider= new GoogleAuthProvider();
        
  try {
       const resultFromGoogle=await signInWithPopup(auth,provider);
         console.log(resultFromGoogle);
        const res=await fetch('/api/auth/google',{
            method:"Post",
            headers:{"Content-Type":"application/json"} ,
            body:JSON.stringify({
                name:resultFromGoogle.user.displayName,
            email:resultFromGoogle.user.email,
           Photo:resultFromGoogle.user.photoURL,
            })


        })

        const data=await res.json();
        if(res.ok)
        {
           dispatch(signInSuccess(data));
           navigate('/')
        }
     
        
  } catch (error) {
     console.log(error);
  }

    }
  return (
      

    <Button onClick={handleGoogleClick} className='w-full' type='button' gradientDuoTone="pinkToOrange" outline>
      
      <div className='flex gap-1 uppercase items-center '>
      <AiFillGoogleCircle className='w-6 h-6'></AiFillGoogleCircle>
     <span>Continue with Google</span>
      </div>
     </Button>
  )
}

export default Oath