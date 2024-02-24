import { Button, TextInput } from 'flowbite-react';
import React from 'react'
import { useSelector } from 'react-redux'

const DashProfile = () => {
    const {currentUser} =useSelector((state)=>state.user);
    console.log(currentUser)
  return (
    <div className='max-w-lg mx-auto w-full'>
        
        <h1 className=' text-center font-semibold text-3xl my-5'>Profile</h1>
        <form action="" className='flex flex-col gap-4'>

            <div className='w-32 h-32 self-center cursor-pointer '>
            <img src={currentUser.profilePic} alt="" className='rounded-full w-full h-full'/>
            </div> 

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