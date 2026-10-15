import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from '../App'
import axios from 'axios'
import {
  IoChatbubbleEllipses,
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoArrowForward,
} from "react-icons/io5";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${BACKEND_URL}/api/v1/auth/signin`, formData, { withCredentials: true })
      console.log(res.data)

    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left section */}
        <div className="bg-[#e7f8ef] p-10 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white text-2xl shadow-sm">
              <IoChatbubbleEllipses />
            </div>
            <span className="text-2xl font-bold text-[#075e54]">
              ChatFlow
            </span>
          </div>

          <h1 className="text-4xl font-bold text-[#075e54] leading-tight">
            Stay connected with everyone.
          </h1>

          <p className="mt-5 text-gray-600 leading-7">
            Send messages, share moments, and stay close to the people
            who matter most.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {["J", "A", "R", "S"].map((letter, i) => (
                <div
                  key={letter}
                  className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold ${["bg-emerald-600", "bg-sky-500", "bg-orange-500", "bg-violet-500"][i]
                    }`}
                >
                  {letter}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Your people, one chat away.
            </p>
          </div>
        </div>

        {/* Login form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome back!
          </h2>
          <p className="mt-2 mb-8 text-gray-500">
            Sign in to continue chatting.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative">
                <IoMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 py-3 text-gray-800 outline-none transition focus:border-[#25D366] focus:bg-white focus:ring-2 focus:ring-[#25D366]/20"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <IoLockClosedOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-11 py-3 text-gray-800 outline-none transition focus:border-[#25D366] focus:bg-white focus:ring-2 focus:ring-[#25D366]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="text-lg" />
                  ) : (
                    <IoEyeOutline className="text-lg" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-sm font-medium text-[#128C7E] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#25D366] py-3.5 font-semibold text-[#064e3b] transition hover:bg-[#20bd5a] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>Sign in</span>
              <IoArrowForward className="text-lg" />
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-400">NEW HERE?</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <Link
            to="/register"
            className="w-full rounded-xl border border-[#25D366] py-3 text-center font-semibold text-[#128C7E] transition hover:bg-[#e7f8ef] block"
          >
            Create an account
          </Link>

          <p className="mt-8 text-center text-xs text-gray-400">
            Simple conversations. Meaningful connections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
