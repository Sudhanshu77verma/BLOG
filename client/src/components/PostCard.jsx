import React from 'react'
import { Link } from 'react-router-dom'
function PostCard({post}) {
    console.log(post)
  return (
    <div className='group relative w-full h-[400px] border overflow-hidden rounded-lg sm:w-[430px] ' >
        <Link to={`/post/${post.slug}`}>
            

            <img src={post.image} alt="" className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20  ' />
        </Link>

        <div className='p-3 flex flex-col gap-2 '>
            <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='text-sm italic'>{post.category}</span> 
        
        <Link to={`/post/${post.slug}`} className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-blue-300 hover:bg-teal-500 hover:text-white transition duration-300 text-center py-2  '>

           Read Article
         
        </Link>


        </div>


    </div>
  )
}

export default PostCard