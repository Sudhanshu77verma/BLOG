import React, { useEffect, useState } from 'react'
import moment from "moment"
function Singlecomment({singlecomment}) {
    console.log(singlecomment)
 const [user,setuser] =useState({});
 console.log(user)
    useEffect(()=>{
         const getuser= async()=>{
            try {
                const res=await fetch(`/api/user/${singlecomment.userId}`);
            const data=await res.json();
           if(res.ok)
           {
            setuser(data);
           }
            } catch (error) {
                console.log(error.message)
            }
         }
         getuser()
    },[singlecomment])
  return (
    <div className='flex p-4 border-b dark:border-gray-500 text-sm'>
        <div >
            <img className='w-10 h-10 rounded-full bg-gray-200' src={user.avatar} alt={user.username} />
        </div>

        <div>
            <div className='flex items-center mb-1 gap-4'> 
                <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}` : ("Anonymous User")}</span>
                <span>{moment(singlecomment.createdAt).fromNow()}</span>
            </div>

        <p className='text-gray-500 pb-2'>{singlecomment.content} </p>
        </div>

    </div>
  )
}

export default Singlecomment