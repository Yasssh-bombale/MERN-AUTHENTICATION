import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import toast from "react-hot-toast";
const Signup = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setError(false);
      setIsLoading(true);
      setErrorMsg("");
      const { data } = await axios.post("/api/auth/signup", formData);

      setIsLoading(false);
      navigate("/signin");
      console.log(data);
      if (data) {
        toast.success(data.message, {
          duration: 4000,
          icon: "🤩",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      // console.log(error);
      // console.log(error.response.data.message);
      setErrorMsg(error.response.data.message);
      toast.error(error.response.data.message, {
        duration: 4000,
        style: {
          background: "#333",
          borderRadius: "10px",
          color: "#fff",
        },
      });
      setError(true);
      setIsLoading(false);
    }
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
            required
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleSubmit}
            required
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleSubmit}
            required
          />
          <button
            type="submit"
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign up"}
          </button>
          <OAuth />
        </div>
        <div className="my-3 flex gap-3">
          <p>Already have an Account ?</p>
          <Link to={"/signin"}>
            <span className="text-blue-500">sign in</span>
          </Link>
        </div>
        {error ? <p className="text-red-600 mt-2">{errorMsg}</p> : null}
      </form>
    </div>
  );
};

export default Signup;
