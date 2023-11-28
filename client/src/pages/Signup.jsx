import React from "react";
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl  text-center my-7">Sign Up</h1>
      <form>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="username"
            className="bg-slate-100 p-3 rounded-lg"
          />
          <input
            type="email"
            placeholder="email"
            className="bg-slate-100 p-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="password"
            className="bg-slate-100 p-3 rounded-lg"
          />
          <button
            type="submit"
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
          >
            sign up
          </button>
        </div>
        <div className="my-3 flex gap-3">
          <p>Already have an Account ?</p>
          <Link to={"/signin"}>
            <span className="text-blue-500">sign in</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
