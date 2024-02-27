import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { app } from "../firebase";
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

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (!res.ok) {
         dispatch(UpdateFailure(data.message));
      } else {
        dispatch(UpdateSuccess(data));
      }
    } catch (error) {
      dispatch(UpdateFailure(error.message));
    }
  };
  return (
    <div className="max-w-lg mx-auto w-full">
      <h1 className=" text-center font-semibold text-3xl my-5">Profile</h1>
      <form onSubmit={handlesubmit} className="flex flex-col gap-4">
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
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
          // disabled={loading || imageFileUploading}
        >
          {/* {loading ? 'Loading...' : 'Update'} */}
          update
        </Button>
      </form>

      <div className="flex flex-row justify-between mt-4 text-red-500">
        <span className="cursor-pointer"> Delete Account</span>

        <span className="cursor-pointer"> Sign out</span>
      </div>
    </div>
  );
};

export default DashProfile;
