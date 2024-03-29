import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CallToSection from '../components/CallToSection'
import PostCard from "../components/PostCard"



function Home() {

  const [posts,setposts] =useState([])
  console.log(posts)
useEffect(()=>{
  const fetchPosts =async()=>{
      try {
        const res= await fetch('/api/post/getposts')
      const data= await res.json();
    
      if(res.ok)
      {
        setposts(data.posts)
      }
      } catch (error) {
        console.log(error.message)
      }
  }
  fetchPosts()
} ,[])
  return (
    <div className=''>
      
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto  '>

        <h1 className=' text-4xl font-bold lg:text-6xl'>Welcome To my Blog </h1>
        <p className='text-gray-500 text-xs sm:text-sm'>Here you'll find a variety of articles and tutorials on topics such as webdevelopment , software enginnering and programming languages </p>
        <Link to={"/search"} className='text-xs sm:text-sm text-teal-500'> View all Posts</Link>

     
     
      </div>
    
    <div className='p-3 bg-amber-100 dark:bg-slate-700'> 
      <CallToSection></CallToSection>
    </div>
    
    <div className=' mx-auto p-3 flex flex-col gap-8 py-7'> 

    {
      posts && posts.length > 0 && 
        (
             <div className=' flex flex-col items-center gap-4 '>
               <h2 className='text-2xl font-bold  '>Recent Posts</h2>
                <div className='max-w-6xl md:flex flex-wrap gap-4'> 
              {
                  posts.map((post)=>(
            
                <PostCard key={post._id} post={post}></PostCard>
              ))}
              </div>

              <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center'> VIEW ALL POSTS </Link>
             </div>
        )
}
</div>
    </div>
  )
}

export default Home