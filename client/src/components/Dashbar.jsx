import { Sidebar } from 'flowbite-react'
import React from 'react'
import {HiArrowRight, HiUser} from "react-icons/hi"
import { useState,useEffect } from 'react'
import {  useDispatch } from 'react-redux'

import { SignoutSuccess } from '../redux/user/userSlice'
import { Link, useLocation } from 'react-router-dom'
const Dashbar = () => {
  const dispatch=useDispatch();
    const location= useLocation();
    const [tab,settab]=useState('');
    
  
    useEffect(()=>{
      const urlParams=new URLSearchParams(location.search);
      // console.log(urlParams)
      const tabfromUrl=urlParams.get('tab');
      // console.log(tabfromUrl);
      if(tabfromUrl)
      {
        settab(tabfromUrl)
      }
      
  
    },[location.search])

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
  return (
    <Sidebar className='w-full md:w-56'>
         <Sidebar.Items>
            <Sidebar.ItemGroup>
                   <Link to='/dashboard?tab=profile'>
                   <Sidebar.Item active={tab=='profile'} as={'div'} icon={HiUser} label={'User'} labelColor='dark'>
                    Profile
                  </Sidebar.Item>
                   </Link>
                  <Sidebar.Item  icon={HiArrowRight}  labelColor='dark' className='cursor-pointer' onClick={handlesignout}>
                    Sign Out
                  </Sidebar.Item>
            </Sidebar.ItemGroup>
         </Sidebar.Items>
        
        
        </Sidebar>
  )
}

export default Dashbar