import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {HiOutlineExclamationCircle} from "react-icons/hi"
import { app } from "../firebase";
import { DeleteFailure,DeleteSuccess,DeleteStart, SignoutSuccess } from "../redux/user/userSlice";
import {
  UpdateStart,
  UpdateSuccess,
  UpdateFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";




const DashProfile = () => {
  const navigate=useNavigate()
  const [updateusersuccess, setupdateusersuccces] = useState(false);
  const [updateusererror, setupdateusererror] = useState(false);
  const [showModal, setshowmodal] = useState(false);
  const { currentUser,error,loading } = useSelector((state) => state.user);
  const [imagefile, setFile] = useState(null);
  const [formdata, setformdata] = useState({});
  const fileRef = useRef();
 
  const dispatch = useDispatch();
  const [imagedone, setimagedone] = useState(false);
  const [imageFileUploadError, setImageError] = useState(null);
  const [imgageFileuploading, setimageFileupload] = useState(0);
  console.log(imgageFileuploading);
  const [imageURL, setimageUrl] = useState(null);
  console.log(formdata);

  console.log(currentUser);
  //  console.log(imageURL)
  const handleimagechange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setimageUrl(URL.createObjectURL(file));
    }
  };
  // console.log(imageURL)
  // console.log(imagefile)
  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    if (imagefile) {
      handleimagefile(imagefile);
    }
  }, [imagefile]);

  const deletehandler = async () => {
    setshowmodal(false)

    try {
       dispatch(DeleteStart())
          const res=await fetch(`/api/user/delete/${currentUser._id}`, {
            method:'DELETE',
           
          });
          const data=await res.json();
        if(!res.ok)
        {
          dispatch(DeleteFailure(data.message))
        }
       
          dispatch(DeleteSuccess(data))
       
      

    } catch (error) {
      dispatch(DeleteFailure(error.message))
    }
  };
  const handleimagefile = async (imagefile) => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write:if
    //       request.resource.size <2*1024*1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }

    const storage = getStorage(app);
    const fileName = new Date().getTime() + imagefile.name;
    const storageRef = ref(storage, fileName);
    const UploadTask = uploadBytesResumable(storageRef, imagefile);
    UploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setimageFileupload(progress.toFixed(0));

        console.log(`upload is ${progress}%  done`);
        setimagedone(true);
      },
      (error) => {
        setImageError("Couldn't upload image file ");
      },
      () => {
        getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
          setimageUrl(downloadURL);
          setformdata({ ...formdata, avatar: downloadURL });
        });
      }
    );
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(UpdateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(UpdateFailure(data.message));
        toast.error("Error in updation")
      } else {
        dispatch(UpdateSuccess(data));
        toast.success("Update successfully")
      }
    } catch (error) {
      dispatch(UpdateFailure(error.message));
    }
  };  
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
    <div className=" w-96 mx-auto md:flex flex-col items-center">
      <h1 className=" text-center font-semibold text-3xl my-5">Profile</h1>
      <form onSubmit={handlesubmit} className="flex flex-col gap-4 w-full">
        <input
          type="file" 
          accept="image/*"
          hidden
          onChange={handleimagechange}
          ref={fileRef}
        />
        <div
          className="w-32 h-32 self-center cursor-pointer  "
          onClick={() => fileRef.current.click()}
        >
          <img
            src={imageURL ? imageURL : currentUser.avatar}
            alt=""
            className="rounded-full w-full h-full"
          />
        </div>
    
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
          {error && (
          <Alert color="failure">{error}</Alert>
        )}
       
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handlechange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handlechange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handlechange}
        />

        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loading }
        >
         {loading ? 'Loading...' : 'Update'} 
      
        </Button>
        {
          currentUser.isAdmin && (
            <Link to={'/create-post'}>
            <Button type='button' className="w-full" gradientDuoTone="purpleToPink" outline>
             
             Create a  Post
                
            </Button>
            </Link>
          )
        }
      </form>

      <div className=" w-full mt-5 flex flex-row justify-between text-red-500">
        <span onClick={() => setshowmodal(true)} className="cursor-pointer">
          {" "}
          Delete Account
        </span>

        <span onClick={handlesignout} className="cursor-pointer"> Sign out</span>
      </div>

      <Modal
        show={showModal}
        onClose={() => setshowmodal(false)}
        popup
        size="md"
      >
        <Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-32 text-gray-400 dark:text-gray-200 mb-4 mx-auto"></HiOutlineExclamationCircle>
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete your account</h3>
            <div className="flex justify-between">
              <Button color="failure" onClick={deletehandler}> Yes , I'm sure</Button>
              <Button color="gray" onClick={()=>setshowmodal(false)}> No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
        </Modal.Header>
      </Modal>
    </div>
  );
};

export default DashProfile;
