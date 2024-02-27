import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import {app} from "../firebase"
import {useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

const OAuth = () => {


  const dispatch=useDispatch();
const navigate =useNavigate();
const handleGoogleClick = async(res)=>{
    try{
        const provider=new GoogleAuthProvider()
        const auth=getAuth(app);
        const result =await signInWithPopup(auth,provider);
        const res=await fetch('/api/auth/google',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})
        })

        const data=await res.json();
    dispatch(signInSuccess(data));
navigate('/')
  console.log(result);
    }  catch(error)
  
    {
     console.log("could not signin with google",error);
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

export default OAuth