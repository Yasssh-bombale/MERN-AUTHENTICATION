import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
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
      setErrorMsg("");
      setIsLoading(true);
      const { data } = await axios.post("/api/auth/signin", formData);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      // console.log(error);
      // console.log(error.response.data.message);
      setErrorMsg(error.response.data.message);
      setError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl  text-center my-7">Sign In</h1>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col gap-3">
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
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign in"}
          </button>
        </div>
        <div className="my-3 flex gap-3">
          <p>Dont have an Account ?</p>
          <Link to={"/signup"}>
            <span className="text-blue-500">sign up</span>
          </Link>
        </div>
        {error ? <p className="text-red-600 mt-2">{errorMsg}</p> : null}
      </form>
    </div>
  );
};

export default Signin;
