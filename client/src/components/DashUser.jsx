import { Button, Modal, Table, TableHead } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {FaCheck, FaTimes} from "react-icons/fa"
function DashUser() {
 const {currentUser} = useSelector((state)=>state.user)
 const [user,setusers]=useState([]);
 const [showmore,setshowmore]= useState(true)
const [showmodal,setshowmodal] =useState(false)
const[postidtodelete,setpostiddelete]=useState('')
 console.log(user)
//  console.log(currentUser)

const handleshowmore = async()=>{
    const startindex= user.length;
    try{
   const result=await fetch(`/api/user/getusers?startindex=${startindex}`)
   const data= await result.json();
  
   if(result.ok)
   {
    
    setusers((prev)=>[...prev, ...data.users])
    if(data.posts.length<9)
    {
      setshowmore(false)
    }
   }
    }catch(error)
    {
       console.log(error.message)
    }

}
const handleDeletePerson= async()=>{

}
 useEffect(()=>{
    const fetchposts =async()=>{
        try{
            const res=await fetch(`/api/user/getusers`)
            const data=await res.json();
            // console.log(data)
        if(res.ok)
        {
            setusers(data.users)
            if(data.users.length<9)
            {
              setshowmore(false)
            }
        }
        }catch(error){
       console.log(error.message)
        }
    }

   if(currentUser.isAdmin)
   {
    fetchposts()
   }
 } ,
 [currentUser._id])
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100  scrollbar-thumb-slate-500'>
      {
        currentUser.isAdmin && user.length>0 ? (
          <div>
            <Table>
              <TableHead >
              <Table.HeadCell> Date Created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>

              <Table.HeadCell> Username</Table.HeadCell>
              <Table.HeadCell> Email</Table.HeadCell>
              <Table.HeadCell> Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
           
              </TableHead>

              {
                user.map((person,index)=>(
                  
                  <Table.Body key={index}>
                 <Table.Row>
                  <Table.Cell>
                    {new Date(person.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>

                      <img src={person.avatar} alt="" className='w-20 object-cover bg-gray-200 rounded-full' />
                  
                  </Table.Cell>
                  <Table.Cell className=' font-bold'>
                    {person.username}
                  </Table.Cell>
                 
                  <Table.Cell>
                   {person.email}
                  </Table.Cell>

                  <Table.Cell>
                    {person.isAdmin ? (<FaCheck className='text-green-500'></FaCheck>):(<FaTimes className='text-red-500'></FaTimes>)}
                  </Table.Cell>
                   <Table.Cell className='text-red-500 hover:underline cursor-pointer'> <span onClick={()=>
                   {
                    setshowmodal(true);
                    setpostiddelete(person._id)
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
        ):(<p> You have no post to show </p>)
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
              <Button color="failure" onClick={handleDeletePerson} > Yes , I'm sure</Button>
              <Button color="gray" onClick={()=>setshowmodal(false)}> No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
        </Modal.Header>
      </Modal>
    </div>
  )
}

export default DashUser