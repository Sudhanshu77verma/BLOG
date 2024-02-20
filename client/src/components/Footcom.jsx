import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import {BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter} from 'react-icons/bs'
function Footcom() {
  return (
    <Footer className='border border-t-4  border-teal-500'>
        <div className=''>
            <div className='mt-3'>
              <div>   <Link to={'/'} className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white '>
            <span className='px-1 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white  '> Sudhanshu's</span>
            Blog
        </Link>
        
         </div>
         <div className='grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3'>
          
       <div>
       <Footer.Title title='About'></Footer.Title>
       <Footer.LinkGroup col>
        <Footer.Link href='https://www.100jsprojects.com' >
             100 JS Projects
        </Footer.Link>
        <Footer.Link href='/about' >
           Sudhanshu Blog
        </Footer.Link>

       </Footer.LinkGroup>
       </div>

       <div>
       <Footer.Title title='About'></Footer.Title>
       <Footer.LinkGroup col>
        <Footer.Link href='https://www.100jsprojects.com' >
           GitHub
        </Footer.Link>
        <Footer.Link href='/about' >
        Discord
        </Footer.Link>

       </Footer.LinkGroup>
       </div>

       <div>
       <Footer.Title title='About'></Footer.Title>
       <Footer.LinkGroup col>
        <Footer.Link href='https://www.100jsprojects.com' >
           Privacy Policy
        </Footer.Link>
        <Footer.Link href='/about' >
        Discord
        </Footer.Link>

       </Footer.LinkGroup>
       </div>
         </div>
            </div>
        </div>
        <Footer.Divider></Footer.Divider>

        <div className='w-full sm:flex sm:items-center sm:justify-center'>
            <Footer.Copyright href='#' by="Sudhanshu's Blog " year={new Date().getFullYear()}></Footer.Copyright>

        </div>

        <div className='flex gap-3 sm:mt--0 mt-4 sm:justify-center'>
        <Footer.Icon href='#' icon={BsFacebook} />
        <Footer.Icon href='#' icon={BsInstagram} />
        <Footer.Icon href='#' icon={BsTwitter} />
        <Footer.Icon href='#' icon={BsGithub} />
        <Footer.Icon href='#' icon={BsDribbble} />
        </div>
    </Footer>
  )
}

export default Footcom