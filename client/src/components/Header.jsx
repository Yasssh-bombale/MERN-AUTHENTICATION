import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser.profilePicture);
  return (
    <div className="bg-slate-200 p-4 box-border">
      <div className="max-w-6xl flex justify-between items-center mx-auto ">
        <Link to={"/"}>
          <h1 className="font-bold text-xl">MERN Authentication</h1>
        </Link>
        <ul className="flex gap-4 items-center">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/about"}>
            <li>About</li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                className="h-10 w-10 object-cover rounded-full"
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
