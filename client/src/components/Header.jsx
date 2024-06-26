import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon,FaSun} from 'react-icons/fa'
import { SignoutSuccess } from '../redux/user/userSlice'
import { useLocation ,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeslice'

function Header() {
  const navigate= useNavigate()
    const path=useLocation().pathname;
    const dispatch=useDispatch();
    const {currentUser}= useSelector((state)=>state.user);
    const {theme}=useSelector((state)=>state.theme)
    const [searchTerm,setSearchTerm]= useState('')

    console.log(searchTerm)
    const location = useLocation()
    // console.log(theme)
    

    // console.log(currentUser);
   
    useEffect(()=>{

const URLParams= new URLSearchParams(location.search)
     const searchTermUrl= URLParams.get('searchTerm')
     if(searchTermUrl)
     {
      setSearchTerm(searchTermUrl)
     }
  
    } , [location.search]) 
    const handlesignout =async()=>{
      try {
        const  res= await fetch("/api/user/signout" , {
          method:"POST"
        });
        const data=await res.json();
        if(!res.ok)
        {
          console.log(data.message)
        }
        dispatch(SignoutSuccess())
  
      } catch (error) {
         console.log(error.message)
      }
  
    }

    const handlesubmit= (e)=>{
      e.preventDefault();
      const URlParams= new URLSearchParams(location.search)
      URlParams.set('searchTerm',searchTerm)
     const searchQuery= URlParams.toString();
     navigate(`/search?${searchQuery}`)

    }
  return (
    <Navbar>
        <Link to={'/'} className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-1 py-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg text-white mr-1 '> Sudhanshu's</span>
            Blog
        </Link> 

        <form onSubmit={handlesubmit} className='flex gap-2'>
            <TextInput 
            type='text' placeholder='Search...'
            className='hidden  sm:inline'
     defaultValue={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}>
            
            </TextInput>

      <Button type='submit' className='w-12 h-10 hidden sm:inline' color='gray' pill>
        <AiOutlineSearch/>
       </Button>
       
       </form>
        <Button className='w-12 h-10  sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
        {
       theme ==='light' ? (<FaMoon></FaMoon>) : (<FaSun></FaSun>)
        }
        </Button>
        <div className='flex gap-2 md:order-2'> 
      {
        currentUser ? (
          <Dropdown arrowIcon={false} inline label={
        <Avatar alt='user' img={currentUser.avatar}> </Avatar>
          }>
          
          <Dropdown.Header>
            <span className='block text-sm'> {currentUser.username}</span>
            <span className='block text-sm truncate'>@{currentUser.email}</span>
          </Dropdown.Header>

          <Link to={'/dashboard?tab=profile'}>
           <Dropdown.Item>Profile</Dropdown.Item>
           <Dropdown.Divider></Dropdown.Divider>
           <Dropdown.Item onClick={handlesignout}>Signout</Dropdown.Item>
          </Link>
          </Dropdown>
        ):( <Link to={'/sign-in'}>
        <Button gradientDuoTone='purpleToBlue' outline> Sign In</Button>
    </Link>)
      }

     <Navbar.Toggle/>
        </div>

        <Navbar.Collapse>

            <Navbar.Link  active={path ==='/'} as={'div'} >
                <Link to={'/'}>
                    Home
                </Link>
                 

            </Navbar.Link>

            <Navbar.Link active={path ==='/about'} as={'div'} >
                <Link to={'/about'}>
                      About
                </Link>
                 
            </Navbar.Link>
           
            <Navbar.Link active={path ==='/projects'} as={'div'} >
                <Link to={'/projects'}>
                      Projects
                </Link>
                 
            </Navbar.Link>
        </Navbar.Collapse>
    
       
      

    </Navbar>
  );
}

export default Header