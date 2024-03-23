import { Table, TableHead } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function Dashposts() {
 const {currentUser} = useSelector((state)=>state.user)
 const [userposts,setuserposts]=useState([]);
 const [showmore,setshowmore]= useState(true)

 console.log(userposts)
//  console.log(currentUser)

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
 [])
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100  scrollbar-thumb-slate-500'>
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
                  <Table.Cell className='font-semibold font-bold'>
                    {post.title}
                  </Table.Cell>
                 
                  <Table.Cell>
                   {post.category}
                  </Table.Cell>
                   <Table.Cell className='text-red-500 hover:underline cursor-pointer'> <span>
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
        ):(<p> You have no post to show </p>)
      }
    </div>
  )
}

export default Dashposts