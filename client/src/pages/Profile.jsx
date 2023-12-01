import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
const Profile = () => {
  const [image, setImage] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = await uploadBytesResumable(storageRef, image);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImagePercent(Math.round(progress));
    });
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
