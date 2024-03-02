import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'> Create Post </h1>
       <form className='flex flex-col gap-4'>

        <div className='flex flex-col gap-4 sm:flex-row justify-between '>
          <TextInput  className=" flex-1"  type='text' placeholder='Title' required id='titlea'></TextInput>

          <Select>
            <option value="uncategorized"> Select a  Category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>

        <div className='flex gap-4 items-center justify-between border-4 border-red-200 border-dotted p-3'>
       <FileInput type="file" accept='image/*'>
       </FileInput>
       <Button type='button' gradientDuoTone="tealToLime" size="sm" outline>Upload Image</Button>
        </div>

        <ReactQuill theme='snow' placeholder='Write-something' className='h-60'></ReactQuill>
        <Button type='submit' gradientDuoTone="purpleToPink">
           Publish  
        </Button>
       
       
        </form>


    </div>
  )
}

export default CreatePost