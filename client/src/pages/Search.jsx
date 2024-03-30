
import { Button, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
function Search() {
    const [sidebarData,setsidebardata]= useState({
        searchTerm:'',
        sort:'desc',
        category:'uncategorized',

    }) 
    console.log(sidebarData)
  
    const [posts,setposts]= useState([]);
    console.log(posts)
    const [loading,setloading] =useState(null)
  
   const location = useLocation();
   const navigate =useNavigate()
 useEffect(()=>{
    const URLParams= new URLSearchParams(location.search)
    const searchTermUrl= URLParams.get('searchTerm')
    const sortFromUrl = URLParams.get('sort')
    const categoryFromUrl = URLParams.get('category')
    
    if(searchTermUrl || sortFromUrl || categoryFromUrl)
    {
        setsidebardata({
            ...sidebarData,
            searchTerm:searchTermUrl,
            sort:sortFromUrl,
            category:categoryFromUrl
        })
    }
    const fetchPost =async()=>{
        setloading(true)
        const searchQuery = URLParams.toString();
        const res= await fetch(`/api/post/getposts?${searchQuery}`)
        if(!res.ok)
        {
            setloading(false)
            return ;
        }
        else{
            const data= await res.json()
            setposts(data.posts)
            setloading(false)
    
        }
        
     }
     fetchPost()

     
 } , [location.search]) 
  
 const handlesubmit = (e)=>{
    if(e.target.id === 'searchTerm')
    {
        setsidebardata({...sidebarData,searchTerm:e.target.value})
    }
    if(e.target.id === 'sort')
    {
        const order= e.target.value || 'desc'
        setsidebardata({...sidebarData,sort:order})
    }
    if(e.target.id === 'category')
    {
        const category= e.target.value || 'uncategorized'
        setsidebardata({...sidebarData,category})
    }


 }
 const handleformsubmit=(e)=>{
    
    e.preventDefault();
    const URlParams= new URLSearchParams(location.search)
    URlParams.set('searchTerm', sidebarData.searchTerm)
    URlParams.set('sort',sidebarData.sort)
    URlParams.set('category', sidebarData.category);
    const searchQuery = URlParams.toString();
     navigate(`/search?${searchQuery}`)
 }

  return (
    <div className=' flex flex-col  md:flex-row'>
        <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
            <form className='flex flex-col gap-8' onSubmit={handleformsubmit} >
                <div className='flex items-center gap-2 '> 
                    <label className='font-semibold'>Search Term :</label>
                    <TextInput type='text' placeholder='Search...' 
                    id='searchTerm'   value={sidebarData.searchTerm} onChange={handlesubmit}></TextInput>
                </div>

                <div className='flex items-center gap-2 '><label className='font-semibold'> Sort :</label>
                  <Select 
                  onChange={handlesubmit}
             
               value={sidebarData.sort}
                  id='sort'>

                    
                    <option value="desc">Latest</option>
                    <option value="asc">Oldest</option>
                  </Select>
                
                </div>

                <div className='flex items-center gap-2  '>
                    <label className='font-semibold'> Category :</label>
                  <Select
                   onChange={handlesubmit}
                 value={sidebarData.category}
                   id='category'>
                    <option value="uncategorized">Uncategorized</option>
                    <option value="reactjs">React.js</option>
                    <option value="nextjs">Next.js</option>
                    <option value="javascript">Javascript</option>
                    
                  </Select>
                
                </div>
            

            <Button className='uppercase' type='submit' outline gradientDuoTone="purpleToPink" >  search   </Button>
            </form>
        </div>

     <div className='w-full flex flex-col items-center gap-5  '>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 m-4'> Posts Result </h1>

     <div className=' flex flex-wrap justify-center  gap-4 '>
     {
        !loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'> No posts Found </p>
        ) 
     }

     {
        loading &&  (
             <p className='text-xl text-gray-500'> Loading... </p>
        )
     }  

  
    { 
        !loading && posts && posts.map((post)=> (
            <PostCard key={post._id} post={post}></PostCard>
        ))
    }
 
  </div>

     </div>

    </div>
  )
}

export default Search