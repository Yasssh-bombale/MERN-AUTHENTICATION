import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
const Profile = () => {
  const [image, setImage] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  console.log(imagePercent);
  console.log(formData);

  const handleFileUpload = async (image) => {
    setImageError(false);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      // Note:-always keep an error function before the downloadurl function or downloadurl function means call back function must be an at very end of the functions list i got this error to many times if we put an getDowmloadURL before any function then getDownloadURL function will not going to provide any download url;
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );

    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    //     setImagePercent(Math.round(progress));
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
    //       setFormData({ ...formData, profilePicture: downloadURL })
    //     );
    //   },
    //   (error) => {
    //     setImageError(true);
    //   }
    // );
  };
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  return (
    <div className=" max-w-lg mx-auto gap-2 ">
      <h1 className="text-center text-3xl font-semibold mt-4">Profile</h1>

      <form className="flex flex-col  mt-4 gap-4 ">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {/* 
          Rules for firebase storage are given below;
          allow write:if
          request.resource.size < 2 * 1024 * 1024 &&
          request.resource.contentType.matches("image/.*")
        */}
        <img
          className="h-26 w-26 self-center rounded-full object-cover cursor-pointer"
          src={currentUser.profilePicture}
          alt="profile"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error while uploading an image *(file size must be less than 2 mb)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span>{`Uploading image : ${imagePercent} '%'`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>

        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="username"
          className="bg-slate-100 rounded-lg p-2 "
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="email"
          className="bg-slate-100 rounded-lg p-2 "
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="bg-slate-100 rounded-lg p-2 "
        />
        <button className="bg-slate-700 text-white w-full uppercase p-2 rounded-lg hover:opacity-95">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-3">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
