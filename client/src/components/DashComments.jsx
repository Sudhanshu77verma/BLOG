import { Button, Modal, Table, TableHead } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {FaCheck, FaTimes} from "react-icons/fa"
function DashComments() {
 const {currentUser} = useSelector((state)=>state.user)
 const [comments,setcomments]=useState([]);
 console.log(comments)
 const [showmore,setshowmore]= useState(false)
const [showmodal,setshowmodal] =useState(false)
const[commentIdtoDelete,seCommentIdtoDelete]=useState('')

//  console.log(currentUser)

const handleshowmore = async()=>{
    const startindex= comments.length;
    try{
   const result=await fetch(`/api/comment/getcomments?startindex=${startindex}`)
   const data= await result.json();
  
   if(result.ok)
   {
    
    setcomments((prev)=>[...prev, ...data.comments])
    if(data.comments.length<9)
    {
      setshowmore(false)
    }
   }
    }catch(error)
    {
       console.log(error.message)
    }

}
const handleDeleteComment= async()=>{
    setshowmodal(false)
   try {
       const res= await fetch(`/api/comment/deleteComment/${commentIdtoDelete}`, 
        {
            method:'DELETE'
        })
        const data=res.json();
        if(res.ok)
        {
            setcomments((prev)=> prev.filter((person)=> person._id !== commentIdtoDelete))
            setshowmodal(false)
        }
        else {
            console.log(data.message)
        }
   } catch (error) {
     console.log(error.message)
   }
}
 useEffect(()=>{
    const fetchComments =async()=>{
        try{
            const res=await fetch(`/api/comment/getcomments`)
            const data=await res.json();
            // console.log(data)
        if(res.ok)
        {
            setcomments(data.comments)
            if(data.comments.length<9)
            {
              setcomments(data.comments)
            }
        }
        }catch(error){
       console.log(error.message)
        }
    }

   if(currentUser.isAdmin)
   {
    fetchComments()
   }
 } ,
 [currentUser._id])
  return (
    <div className='table-auto overflow-x-scroll md:overflow-x-hidden  md:mx-auto md:pt-4 pr-20'>
      {
        currentUser.isAdmin && comments.length>0 ? (
          <div>
            <Table>
              <TableHead >
              <Table.HeadCell> Date Created</Table.HeadCell>
              <Table.HeadCell>Comment Content</Table.HeadCell>

              <Table.HeadCell> Number Of Likes</Table.HeadCell>
              <Table.HeadCell> PostId</Table.HeadCell>
              <Table.HeadCell> UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
           
              </TableHead>

              {
                comments.map((comment,index)=>(
                  
                  <Table.Body key={index}>
                 <Table.Row>
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                   {
                    comment.content
                   }
                  
                  </Table.Cell>
                  <Table.Cell className=' font-bold'>
                    {comment.numberOfLikes}
                  </Table.Cell>
                 
                  <Table.Cell>
                   {comment.postId}
                  </Table.Cell>

                  <Table.Cell>
                    {comment.isAdmin ? (<FaCheck className='text-green-500'></FaCheck>):(<FaTimes className='text-red-500'></FaTimes>)}
                  </Table.Cell>
                   <Table.Cell className='text-red-500 hover:underline cursor-pointer'> <span onClick={()=>
                   {
                    setshowmodal(true);
                seCommentIdtoDelete(comment._id)
                   }
                     }>
                      Delete
                    </span></Table.Cell>

                   
                  
                 </Table.Row>
                  </Table.Body>
                )

              )
              }
            </Table>
            { 
              showmore && (
                <button onClick={handleshowmore} className='w-full text-teal-500 self-center text-sm py-7'> Show More</button>
              )
            }
            </div>
        ):(<p className='text-2xl text-gray-500 text-center '> You have no Comment to show </p>)
      }
       <Modal
        show={showmodal}
        onClose={() => setshowmodal(false)}
        popup
        size="md"
      >
        <Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-32 text-gray-400 dark:text-gray-200 mb-4 mx-auto"></HiOutlineExclamationCircle>
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this post </h3>
            <div className="flex justify-between">
              <Button color="failure" onClick={handleDeleteComment} > Yes , I'm sure</Button>
              <Button color="gray" onClick={()=>setshowmodal(false)}> No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
        </Modal.Header>
      </Modal>
    </div>
  )
}

export default DashComments