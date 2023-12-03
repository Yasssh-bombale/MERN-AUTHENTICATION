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
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";

const Profile = () => {
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // console.log(imagePercent);
  // console.log(currentUser);
  // console.log(currentUser.profilePicture);
  console.log(formData);

  const inputChnageHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdateSuccess(false);
      dispatch(updateUserStart());

      const { data } = await axios.post(
        `api/user/update/${currentUser._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Note:- FIXME: if we passed an empty object then we set our current user as null because in reducer function which is an updateUserSuccess() is set when ever function calls it will set an currentUser according to the action.payload but here we are passing an empty object which means we are indirectly set an our currentUser as null;lol😂😂it's an small bug and hence currently i'm fixing it as whenever an error arrives while post request i will consider it as an empty object and i simply show an small fancy ui which shows that you need to update something !;
      // console.log(data);
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error));
      setUpdateSuccess(false);
    }
  };

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

      <form onSubmit={handleSubmit} className="flex flex-col  mt-4 gap-4 ">
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
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          src={formData.profilePicture || currentUser.profilePicture}
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
          onChange={inputChnageHandler}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="email"
          className="bg-slate-100 rounded-lg p-2 "
          onChange={inputChnageHandler}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="bg-slate-100 rounded-lg p-2 "
          onChange={inputChnageHandler}
        />
        <button className="bg-slate-700 text-white w-full uppercase p-2 rounded-lg hover:opacity-95">
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-3">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-600 mt-3">
        {error && "Opps ! Something went wrong "}
      </p>
      <p className="text-green-600 mt-5 ">
        {updateSuccess && "User is updated successfully"}
      </p>
    </div>
  );
};

export default Profile;
