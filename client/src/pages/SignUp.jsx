import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate =useNavigate();

  const [formdata,setformdata]=useState({});
  const [loading,setloading]=useState(null);
  const [error,setError]=useState(null);

  const handlechange =(e)=>{
   setformdata({...formdata,[e.target.id] :e.target.value.trim()})

  }
  const handlesubmit=async(e)=>{
    e.preventDefault();
    setError(null);
    setloading(true)
    if(!formdata.email || !formdata.password || !formdata.username )
    {
     setError('please fill out all fields')
     return
    }
    try {
          const res=await fetch('/api/auth/signup',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formdata),

          });
          const data= await res.json();
          if(data.success===false)
          {
             return setError(data.message)
          }
         setloading(false);
         navigate('/sign-in');
         

    } catch (error) {
     setError(data.message)
     setloading(false) 
    }
  }
  console.log( formdata)
  return (
    <div className="min-h-screen mt-20">
      <div className=" p-3 max-w-3xl mx-auto flex flex-col md:flex-row gap-5">
           {/* left */}
          <div className="flex-1">
          <Link
            to={"/"}
            className="self-center whitespace-nowrap text-sm sm:text-4xl font-semibold dark:text-white"
          >
            <span className="px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white mr-1 ">
              {" "}
              Sudhanshu's
            </span>
            Blog
          </Link>

          <p className="mt-3">
            {" "}
            This is a demo project . You can sign up with your email and
            password or with Google
          </p>
        </div>
         

         {/* RIght */}
        <div className="flex-1">
          <form  onSubmit={handlesubmit}>
            <div>
              <Label value="Your UserName"></Label>
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handlechange}
              ></TextInput>
            </div>

            <div>
              <Label value="Your email"></Label>
              <TextInput type="email" placeholder="Email" id="email" onChange={handlechange}></TextInput>
            </div>

            <div>
              <Label value="Your password"></Label>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handlechange}
              ></TextInput>
            </div>

            <Button className="w-full mt-4 mb-4" type="submit" disabled={loading} gradientDuoTone="purpleToPink">
             
            {
              loading? ( 
                <div>
                  <Spinner></Spinner> 
                  <span className="p-3">Loading...</span>
                </div>
              ) : ('Sign Up')
            }
            </Button>
          </form>

          <div>
            <span> Have an Account? </span>
            <Link to={'/sign-in'} className="text-blue-400"> Sign In</Link>
          </div>

          {
            error && (
              <Alert className="mt-3 bg-red-100">
                   <p> {error}</p>
              </Alert>
            )
          }


        </div>

      </div>
    </div>
  );
}

export default SignUp;
