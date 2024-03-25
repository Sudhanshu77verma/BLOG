import { Button } from 'flowbite-react'
import React from 'react'

function CallToSection() {
  return (
    <div  className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center'>
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-2xl'> Want to Learn about javascript ? </h2>
            <p>Checkout these resources with Javascript Projects</p>
            <Button gradientDuoTone="purpleToPink p-3">
                <a href='https://www.100jsprojects.com'>100 Javascript Js</a>
            </Button>
        </div>
        <div className='p-3 flex-1'>
            <img src="https://www.shutterstock.com/image-vector/javascript-programming-language-script-code-260nw-1062509657.jpg" alt="" />
        </div>
    </div>
  )
}

export default CallToSection