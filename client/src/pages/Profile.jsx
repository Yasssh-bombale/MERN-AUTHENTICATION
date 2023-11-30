import React from "react";
import { useSelector } from "react-redux";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className=" max-w-lg mx-auto gap-2 ">
      <h1 className="text-center text-3xl font-semibold mt-4">Profile</h1>

      <form className="flex flex-col  mt-4 gap-4 ">
        <img
          className="h-26 w-26 self-center rounded-full object-cover cursor-pointer"
          src={currentUser.profilePicture}
          alt="profile"
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
