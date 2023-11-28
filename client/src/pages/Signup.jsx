import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const Signup = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/auth/signup", formData);
    console.log(res);
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl  text-center my-7">Sign Up</h1>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="username"
            id="username"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleSubmit}
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleSubmit}
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleSubmit}
          />
          <button
            type="submit"
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
          >
            Sign up
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
