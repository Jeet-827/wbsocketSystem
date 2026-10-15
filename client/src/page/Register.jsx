import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    IoChatbubbleEllipses,
    IoPersonOutline,
    IoMailOutline,
    IoLockClosedOutline,
    IoEyeOutline,
    IoEyeOffOutline,
    IoCheckmark,
    IoArrowForward,
    IoAlertCircleOutline,
    IoCheckmarkCircleOutline,
} from "react-icons/io5";
import axios from "axios";
import {useDispatch} from 'react-redux'
import { setUser,setAccessToken } from "../store/sclices/userSclice";
import { validateEmail, validateEmailAsync } from "../utils/emailValidator";
import { BACKEND_URL } from '../App'

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [emailError, setEmailError] = useState("");
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === "email" && isEmailTouched) {
            const check = validateEmail(value);
            setEmailError(check.isValid ? "" : check.error);
        }
        if (serverError) setServerError("");
    };

    const handleEmailBlur = () => {
        setIsEmailTouched(true);
        if (formData.email.trim()) {
            const check = validateEmail(formData.email);
            setEmailError(check.isValid ? "" : check.error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");
        setSuccessMessage("");

        const emailCheck = await validateEmailAsync(formData.email);
        if (!emailCheck.isValid) {
            setIsEmailTouched(true);
            setEmailError(emailCheck.error);
            return;
        }

        if (formData.password.length < 8) {
            setServerError("Password must be at least 8 characters");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(
                `${BACKEND_URL}/api/v1/auth/signup`,
                formData,
                {
                    withCredentials: true,
                }
            );
            setSuccessMessage("Account created successfully! Redirecting...");
            dispatch(setAccessToken(res.data.accessToken))
            dispatch(setUser(res.data.user))
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error) {
            const msg =
                error.response?.data?.message ||
                "Failed to register. Please check your details and try again.";
            setServerError(msg);
        } finally {
            setLoading(false);
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
                        Your conversations start here.
                    </h1>

                    <p className="mt-5 text-gray-600 leading-7">
                        Create your account and connect with friends, family,
                        and your community in one simple place.
                    </p>

                    <div className="mt-10 space-y-5">
                        {[
                            "Chat with people anytime",
                            "Keep conversations organized",
                            "Connect with your community",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white">
                                    <IoCheckmark className="text-base" />
                                </span>
                                <span className="text-gray-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Register form */}
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Create account
                    </h2>
                    <p className="mt-2 mb-8 text-gray-500">
                        Join ChatFlow and start a conversation.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {serverError && (
                            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                                <IoAlertCircleOutline className="text-xl shrink-0 mt-0.5" />
                                <span>{serverError}</span>
                            </div>
                        )}

                        {successMessage && (
                            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
                                <IoCheckmarkCircleOutline className="text-xl shrink-0" />
                                <span>{successMessage}</span>
                            </div>
                        )}

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="relative">
                                <IoPersonOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Choose a username"
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 py-3 text-gray-800 outline-none transition focus:border-[#25D366] focus:bg-white focus:ring-2 focus:ring-[#25D366]/20"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                {isEmailTouched && !emailError && formData.email && (
                                    <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                                        <IoCheckmarkCircleOutline className="text-sm" />
                                        Valid email
                                    </span>
                                )}
                            </div>
                            <div className="relative">
                                <IoMailOutline
                                    className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg transition ${
                                        emailError ? "text-red-400" : "text-gray-400"
                                    }`}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleEmailBlur}
                                    placeholder="Enter your email"
                                    required
                                    className={`w-full rounded-xl border bg-gray-50 pl-11 pr-4 py-3 text-gray-800 outline-none transition ${
                                        emailError
                                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20"
                                            : "border-gray-200 focus:border-[#25D366] focus:bg-white focus:ring-2 focus:ring-[#25D366]/20"
                                    }`}
                                />
                            </div>
                            {emailError && (
                                <div className="flex items-center gap-1.5 mt-2 text-xs text-red-600">
                                    <IoAlertCircleOutline className="text-sm shrink-0" />
                                    <span>{emailError}</span>
                                </div>
                            )}
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
                                    placeholder="Create a password"
                                    minLength={8}
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
                            <p className="mt-2 text-xs text-gray-400">
                                Use at least 8 characters.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || Boolean(emailError)}
                            className="w-full rounded-xl bg-[#25D366] py-3.5 font-semibold text-[#064e3b] transition hover:bg-[#20bd5a] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span>Creating account...</span>
                            ) : (
                                <>
                                    <span>Create account</span>
                                    <IoArrowForward className="text-lg" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-7 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-[#128C7E] hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
