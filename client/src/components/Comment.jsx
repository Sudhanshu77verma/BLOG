
import { Alert, Button, TextInput, Textarea } from 'flowbite-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function Comment( {postId}) {
    const{currentUser}= useSelector(state=>state.user);
     const [comment,setcomment]=useState('')
     const [error,setcommentError]=useState(null)
    // console.log(currentUser)

    const handlesubmit= async(e)=>
    {
        e.preventDefault();
        if(comment.length>200)
        {
            return ;
        }
        try { 
        
            const res= await fetch('/api/comment/create', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({content:comment,postId,userId:currentUser._id}  )
              })
              const data= await res.json();
               if(res.ok)
               {
                setcomment('');
                 setcommentError(null)
               }
            
        } catch (error) {
          setcommentError(error.message)
        }
       
    
    }
  return (
    <div>
        
        {
            currentUser ? (
                <div className='flex flex-row items-center gap-3 my-5 text-gray-600'> 
                    <p>Signed in as:</p>
                    <img className='h-5 w-5 object-cover rounded-lg' src={currentUser.avatar} alt="" />
                    <Link to={`/dashboard?tab=profile`} className='text-blue-500 hover:underline'>
                        @{currentUser.username}
                    </Link>
                </div>
            )
        :
        (<div className='text-sm text-teal-500 my-5'>
              You must be signed in to comment on any post 
             <Link className='text-blue-500 hover:underline p-4'  to={'/sign-in'}>
                Signin 
             </Link>
         </div>)}
        {
            currentUser && (
                <form  onSubmit={handlesubmit} className='border border-teal-500 p-3 flex flex-col gap-4'>
                    <Textarea placeholder='Add a comment...'
                    rows='3'
                    maxLength='200'
                    onChange={(e)=>setcomment(e.target.value)}
                    ></Textarea>

                    <div> 
                        <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining </p>
                        <Button className='mt-3' outline gradientDuoTone="purpleToBlue" type='submit'> Submit</Button>
                    </div>

                   { error && (
               <Alert color="failure">  {error}</Alert>
                   )
     
                   } 
                </form>

           
            )
        }

    </div>
  )
}

export default Comment