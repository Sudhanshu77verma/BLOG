import React from 'react'
import CallToSection from '../components/CallToSection'
function Projects() {
  return (
    <div  className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
        <h1 className='text-3xl font-semibold'>Projects</h1>
        <p className='text-md text-gray-500'>Build fun and engaging while learning HTML,CSS and JavaScript</p>
       
       <CallToSection></CallToSection>

    </div>
  )
}

export default Projects