import { Button, Modal, Table, TableHead } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function Dashposts() {
 const {currentUser} = useSelector((state)=>state.user)
 const [userposts,setuserposts]=useState([]);
 const [showmore,setshowmore]= useState(true)
const [showmodal,setshowmodal] =useState(false)
const[postidtodelete,setpostiddelete]=useState('')
 console.log(userposts)
//  console.log(currentUser)
const deletehandler=async()=>{
  setshowmodal(false)
  try {
  const res= await fetch(`/api/post/deletepost/${postidtodelete}/${currentUser._id}`,{
    method:'DELETE'
  })
  const data= await res.json();
  if(!res.ok)
  {
    console.log(data.message)
  }
  else{
    setuserposts((prev)=> prev.filter((post)=>post._id !== postidtodelete))
  }
  } catch (error) {
    console.log(error.message)
  }
}
const handleshowmore = async()=>{
    const startindex= userposts.length;
    try{
   const result=await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startindex}`)
   const data= await result.json();
  
   if(result.ok)
   {
    
    setuserposts((prev)=>[...prev, ...data.posts])
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
 useEffect(()=>{
    const fetchposts =async()=>{
        try{
            const res=await fetch(`/api/post/getposts?userId=${currentUser._id}`)
            const data=await res.json();
            // console.log(data)
        if(res.ok)
        {
            setuserposts(data.posts)
            if(data.posts.length<9)
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
    <div className='table-auto overflow-x-scroll md:mx-auto md:overflow-x-hidden md:pt-8 md:pr-32 '>
      {
        currentUser.isAdmin && userposts.length>0 ? (
          <div>
            <Table>
              <TableHead>
              <Table.HeadCell> Date Updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell> Post Title</Table.HeadCell>
              <Table.HeadCell> Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
              </TableHead>

              {
                userposts.map((post)=>(
                  
                  <Table.Body key={post._id}>
                 <Table.Row>
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img src={post.image} alt="" className='w-20 object-cover bg-gray-200' />
                    </Link>
                  </Table.Cell>
                  
              
                  <Table.Cell className=' font-bold'>
                    {post.title}
                  </Table.Cell>
                 
                 
                  <Table.Cell>
                   {post.category}
                  </Table.Cell>
                   <Table.Cell className='text-red-500 hover:underline cursor-pointer'> <span onClick={()=>
                   {
                    setshowmodal(true);
                    setpostiddelete(post._id)
                   }
                     }>
                      Delete
                    </span></Table.Cell>

                    <Table.Cell>
                   <Link className='text-teal-500 hover:underline cursor-pointer ' to={`/update-post/${post._id}`}>
                    Edit
                   </Link>
                    </Table.Cell>
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
        ):(<p className='text-center pl-0 md:text-slate-500 text-2xl'> You have no post to show </p>)
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
              <Button color="failure" onClick={deletehandler}> Yes , I'm sure</Button>
              <Button color="gray" onClick={()=>setshowmodal(false)}> No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
        </Modal.Header>
      </Modal>
    </div>
  )
}

export default Dashposts