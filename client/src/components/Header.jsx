import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-200 p-4">
      <div className="max-w-6xl flex justify-between items-center mx-auto">
        <Link to={"/"}>
          <h1 className="font-bold text-xl">MERN Authentication</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/about"}>
            <li>About</li>
          </Link>
          <Link to={"signin"}>
            <li>SignIn</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;