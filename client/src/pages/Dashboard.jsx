import React, { useEffect, useState } from 'react'
import { useLoaderData, useLocation } from 'react-router-dom'
import Dashbar from '../components/Dashbar';
import DashProfile from '../components/DashProfile';
function Dashboard() {
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
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      
      <div className='md:w-56'>
        {/* side bar */}
        <Dashbar></Dashbar>
      </div>

      <div>
        {/* profile */}
        {
          tab=='profile' && <DashProfile></DashProfile>
        }
      </div>
    </div>
  )
}

export default Dashboard