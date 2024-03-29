import { Button, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function DashboardComp() {

 const {currentUser} = useSelector(state=>state.user) 
 console.log(currentUser)  
const [user,setuser] = useState([])

const [comments,setcomments] =useState([])
const [posts,setpost]= useState([])
console.log(posts)
const [totalUsers,setTotaluser]= useState(0)
// console.log(totalUsers)
const [totalpost,settotalPost] =useState(0)
const [totalcomments,settotalcomments] =useState(0)
const [lastmonthuser,setlastmonthuser] =useState(0)
// console.log(lastmonthuser)
const [lastmonthpost,setlastmonthpost] = useState(0)
const [lastmontcomment,setlastmonthcomment]=useState(0)

 useEffect(()=>{
    const fetchuser = async()=>{
    try {
       const res= await fetch(`/api/user/getusers?limit=5`) 
       const data= await res.json()
       if(res.ok)
       {
        setuser(data.users) 
        setTotaluser(data.totalUser)
        setlastmonthuser(data.lastmonthUser)
       }
    } catch (error) {
        console.log(error.message)
    }
    }
    const fetchposts= async()=>{
     try {
        const res= await fetch("/api/post/getposts?limit=5")
        const data=await  res.json()
        if(res.ok)
        {
          setpost(data.posts)
          settotalPost(data.totalposts)
          setlastmonthpost(data.lastMonthPosts)
        }
     } catch (error) {
         console.log(error.message)
     }

    }
    const fetchComments= async()=>{
    try {
          const res= await fetch("/api/comment/getcomments?limit=5")
          const data= await res.json()
          if(res.ok)
          {
            setcomments(data.comments)
            settotalcomments(data.TotalComments)
            setlastmonthcomment(data.LastMonthComment)
          }
    } catch (error) {
         console.log(error.message)
    }
    }
    if(currentUser.isAdmin){
        fetchuser()
        fetchComments()
        fetchposts()
    }
    fetchuser()
    fetchposts()
    fetchComments()
 }
  ,[])
   







  return (
    <div className=' sm:mx-auto overflow-y-hidden '>
        <div className=' flex flex-col sm:flex-row mx-auto'>

        <div className=' m-4 p-3 flex flex-col dark:bg-slate-800 gap-4   md:w-72 rounded-md shadow-md '>
            <div className='flex justify-between'> 
                <div > <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
                <p className='text-2xl'> {totalUsers}</p></div>
                <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg'> </HiOutlineUserGroup>

            </div>

            <div className='flex gap-2 text-sm'> 
                <span className='text-green-500 flex items-center'> 
                    <HiArrowNarrowUp></HiArrowNarrowUp>
                    {lastmonthuser}
                </span>
                <div className='text-gray-400'>Last Month</div>
            </div>
        </div>
   
        <div className=' m-4 p-3 flex flex-col dark:bg-slate-800 gap-4 md:w-72  rounded-md shadow-md '>
            <div className='flex justify-between'> 
                <div > <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
                <p className='text-2xl'> {totalcomments}</p></div>
                <HiAnnotation className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg'> </HiAnnotation>

            </div>

            <div className='flex gap-2 text-sm'> 
                <span > 
                    <HiArrowNarrowUp className='text-purple-500 flex items-center'></HiArrowNarrowUp>
                    {lastmontcomment}
                </span>
                <div className='text-gray-400'>Last Month</div>
            </div>
        </div>


      <div className=' m-4 p-3 flex flex-col dark:bg-slate-800 gap-4   md:w-80 rounded-md shadow-md '>
            <div className='flex justify-between'> 
                <div > <h3 className='text-gray-500 text-md uppercase'>Total post</h3>
                <p className='text-2xl'> {totalpost}</p></div>
                <HiDocumentText className='bg-green-600 text-white rounded-full text-5xl p-3 shadow-lg'> </HiDocumentText>

            </div>

            <div className='flex gap-2 text-sm'> 
                <span className='text-green-500 flex items-center'> 
                    <HiArrowNarrowUp></HiArrowNarrowUp>
                    {totalpost}
                </span>
                <div className='text-gray-400'>Last Month</div>
            </div>
        </div> 
        </div>


     <div>
     <div className='flex flex-col shadow-md w-full sm:rounded-md p-4 '>
            
     
            <div> 
    


<Table hoverable className='mt-4 dark:bg-slate-800 rounded-md'>
        <Table.Head>
            <Table.HeadCell>User Image </Table.HeadCell>
            <Table.HeadCell> Username</Table.HeadCell>
        </Table.Head>
        {
            user && user.map((use)=>(
                <Table.Body key={use._id} className='divide-y'>
              
              <Table.Row className=' dark:border-gray-700'>
             
             <Table.Cell>
                <img  className="w-10 h-10 rounded-full bg-gray-500" src={use.avatar} alt="" />
             </Table.Cell>

             <Table.Cell>
           <p> {use.username}</p>
             </Table.Cell>
             
           



              </Table.Row>

                

                </Table.Body>
            ))
        }
     </Table>
     

     <Table hoverable className='mt-4 dark:bg-slate-800 rounded-md'>
        <Table.Head>
            <Table.HeadCell> Comment content </Table.HeadCell>
            <Table.HeadCell> Likes</Table.HeadCell>
        </Table.Head>
        {
            comments && comments.map((comment)=>(
                <Table.Body key={comment._id} className='divide-y'>
              
              <Table.Row className=' dark:border-gray-700'>
             
             <Table.Cell>
              <p>{comment.content}</p>
                </Table.Cell>

             <Table.Cell>
                 <p>{comment.numberOfLikes}</p>
             </Table.Cell>
             
           



              </Table.Row>

                

                </Table.Body>
            ))
        }
     </Table>
      


     <Table hoverable className='mt-4 dark:bg-slate-800 rounded-md'>
        <Table.Head>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell> Post Title</Table.HeadCell>
            <Table.HeadCell>Category </Table.HeadCell>
        </Table.Head>
        {
            posts && posts.map((post)=>(
                <Table.Body key={post._id} className='divide-y'>
              
              <Table.Row className=' dark:border-gray-700'>
             
             <Table.Cell>
                <img  className="w-10 h-10 rounded-full bg-gray-500" src={post.image} alt="" />
             </Table.Cell>
              

             <Table.Cell>
                 <p>{post.title}</p>
                    </Table.Cell>
             
             <Table.Cell>
                 <p>{post.category}</p>
                    </Table.Cell>
             
           



              </Table.Row>

                

                </Table.Body>
            ))
        }
     </Table>



</div>

        </div>
     </div>

    </div>
  )
}

export default DashboardComp