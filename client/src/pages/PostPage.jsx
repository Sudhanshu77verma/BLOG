// import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


import { Button, Spinner } from 'flowbite-react';
import CallToSection from '../components/CallToSection';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';


function PostPage() {

    const {postslug} =useParams();
    // console.log(postslug)
    const [recentPost ,setRecentPost]= useState(null)
    console.log(recentPost)
    const [loading , setloading] =useState(true);
    const [error,seterror]=useState(false)
    const[post,setpost]=useState(null);
    console.log(post)

    console.log(postslug)
    
    useEffect(()=>{
        try {
           const fetchrecentPost = async()=>{
            const res= await fetch(`/api/post/getposts?limit=3`);
            const data= await res.json();
            if(res.ok)
            {
                setRecentPost(data.posts);
    
            }
           };
           fetchrecentPost()
        } catch (error) {
             console.log(error)
        }
      
        },[])
    useEffect(()=>{
    const fetchpost= async()=>{
     
        try {
            setloading(true);
            const res=await fetch(`/api/post/getposts?slug=${postslug}`);
            const data= await res.json();
            console.log(data)

            if(!res.ok)
            {
                setloading(false);
                seterror(true);
                return;
            }
            if(res.ok) {
                setpost(data.posts[0]);
                setloading(false);
                seterror(false)
            }
        } catch (error) {
            seterror(true);
            setloading(false)
        }
    }
     fetchpost()
    } , [postslug] )

    if(loading)
    {
        return (
            <div className='flex justify-center items-center min-h-screen'>
     <Spinner size='xl'></Spinner>
            </div>
        )
    }
  


    return (

   
   <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
   <h1 className='text-3xl mt-10 p-3 font-serif max-w-2xl mx-auto lg:text-4xl'>
    { post && post.title} </h1>
    <Link   className='self-center mt-5' to={`/search/category${post && post.category}`} >
    <Button color='gray'>{post && post.category}</Button></Link>

    <img src={post && post.image} className='mt-10 p-3 max-h-[500px] w-full object-cover shadow-sm ' alt="" />
    
     <div className='flex justify-between p-3 border-b border-slate-300'>
        <span>{post && new Date( post.updatedAt).toLocaleDateString()}</span>
        <span>{post && (post.content.length /1000).toFixed(0)} mins read</span>
     </div>

     <div className='p-3 max-w-2xl mx-auto mt-4 w-full post-content' dangerouslySetInnerHTML={{__html:post && post.content}}> 

     </div>

     <div className='max-w-4xl mx-auto '>
        <CallToSection></CallToSection>
     </div>

 <div> <CommentSection postId={post._id}></CommentSection></div>


    <h1 className='text-center font-bold uppercase text-2xl  shadow-md m-36'>Recent Articles</h1>


<div className=' max-w-6xl mx-auto flex gap-3 flex-col md:flex-row'>
    {
        recentPost && 
        (
            recentPost.map((post)=>(
            <PostCard key={post._id} post={post}></PostCard>
            ))
        )
    }
</div>

     </main>
  )
}

export default PostPage