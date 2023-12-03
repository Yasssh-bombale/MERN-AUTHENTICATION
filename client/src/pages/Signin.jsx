import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import toast from "react-hot-toast";
const Signin = () => {
  const [formData, setFormData] = useState({});
  const { error, loading, errorMsg } = useSelector((state) => state.user);

  const [newErrorMsg, setNewErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setNewErrorMsg("");
      dispatch(signInStart());

      const { data } = await axios.post("/api/auth/signin", formData);
      console.log(data);
      dispatch(signInSuccess(data.rest));

      navigate("/");
      toast.success(data.message, {
        duration: 4000,
        icon: "😎",
        style: {
          background: "#333",
          borderRadius: "10px",
          color: "#fff",
        },
      });
    } catch (error) {
      console.log(error.response.data.message);
      // error.response.data.message
      setNewErrorMsg(error.response.data.message);
      dispatch(signInFailure(error));
      toast.error(error.response.data.message, {
        duration: 4000,

        icon: "🤬",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
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
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign in"}
          </button>
          <OAuth />
        </div>
        <div className="my-3 flex gap-3">
          <p>Dont have an Account ?</p>
          <Link to={"/signup"}>
            <span className="text-blue-500">sign up</span>
          </Link>
        </div>

        {error ? (
          <p className="text-red-600 mt-2">
            {newErrorMsg || "Something went wrong"}
          </p>
        ) : null}
      </form>
    </div>
  );
};
export default Signin;
