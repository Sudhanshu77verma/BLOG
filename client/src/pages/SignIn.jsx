import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import {toast} from "react-hot-toast"
import { signInSuccess,signInFailure,signInStart } from "../redux/user/userSlice";
import Oath from "../components/Oath";

function SignIn() {
  const dispatch=useDispatch();
  const navigate =useNavigate();
   const {loading,error}=useSelector((state)=>state.user)

  const [formdata,setformdata]=useState({});


  const handlechange =(e)=>{
   setformdata({...formdata,[e.target.id] :e.target.value.trim()})

  }
  const handlesubmit=async(e)=>{
    e.preventDefault();
  
    if(!formdata.email || !formdata.password )
    {
     return dispatch(signInFailure('please fill all the fields'))
   
    }
    try {
      dispatch(signInStart());

          const res=await fetch('/api/auth/signin',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formdata),

          });
          const data= await res.json();
          if(data.success===false)
          { 
           toast.error("Sign in Failed")
           return  dispatch(signInFailure(data.message));
          }
     
        dispatch(signInSuccess(data));
        toast.success("Sign in Successfully")
        navigate('/')
    

    } catch (error) {
 dispatch(signInFailure(error))

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
            <span className="px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white mr-1 font-semibold">
              {" "}
              Sudhanshu's
            </span>
             <span className="font-semibold text-5xl">Blog</span>
          
          </Link>

          <p className="mt-3">
            {" "}
            This is a demo project . You can sign in with your email and
            password or with Google.
          </p>
        </div>
         

         {/* RIght */}
        <div className="flex-1">
          <form  onSubmit={handlesubmit}>
          

            <div>
              <Label value="Your email"></Label>
              <TextInput type="email" placeholder="Email" id="email" onChange={handlechange}></TextInput>
            </div>

            <div>
              <Label value="Your password"></Label>
              <TextInput
                type="password"
                placeholder="*****"
                id="password"
                onChange={handlechange}
              ></TextInput>
            </div>

            <Button className="w-full mt-4 mb-4" type="submit" disabled={loading} gradientDuoTone="purpleToPink">
             
            {
              loading ? ( 
                <div>
                  <Spinner></Spinner> 
                  <span className="p-3">Loading...</span>
                </div>
              ) : ('Sign In')
            }
            </Button>
           
           <Oath></Oath>

          </form>

          <div>
            <span>Don't Have an Account? </span>
            <Link to={'/sign-up'} className="text-blue-400"> Sign Up</Link>
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

export default SignIn;
