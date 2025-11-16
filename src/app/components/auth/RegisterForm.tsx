"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RegisterSchema, { RegisterSchemaType } from "@/schema/RegisterSchema";
import { LuChevronDown } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { AuthService } from "@/app/service/auth/AuthService";
import axios from "axios";


export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [next, setNext] = useState<boolean>(true);
  const [load, setLoad] = useState<boolean>(false);
  const router=useRouter();

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      setLoad(true);
      const response = axios.post("http://localhost:5050/api/v1/recify/auth/sign-up", data);
      
      // if(response.data.success){
      //   alert("Registration successful! Please log in.");
      //   router.push("/auth/login");
      // }
    
    } catch (err) {
      console.log(err);
      alert("Registration failed. Please try again.");
    }finally{
      setLoad(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 w-[100vw] md:w-full max-w-md animate-fadeIn">
        <h1 className="text-[22px] md:text-3xl font-extrabold text-gray-900 text-center">
          Create Your Account
        </h1>
        <p className="mt-2 text-gray-500 text-center text-[14px] md:text-lg">
          Join the{" "}
          <span className="font-semibold text-blue-600">Recipe World</span>{" "}
          today! Discover, save & share mouth-watering recipes.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mt-4"
        >
          {next ? (
            <>
              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Email address"
                  {...register("email")}
                  className="pl-10 p-3 w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}

              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className="pl-10 pr-10 p-3 w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </>
          ) : (
            <>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Username"
                  autoComplete="off"
                  {...register("username")}
                  className="pl-10 p-3 w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}

              <div className="w-full relative">
                 <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  {...register("gender")}
                  className="pl-10 p-3 w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-400 appearance-none"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-sm text-red-500 min-h-[18px]">
                    {errors.gender.message}
                  </p>
                )}

                <LuChevronDown className="absolute top-5 right-5 text-gray-700 font-[10px]" />
              </div>
              
              <input
            
                type="date"
                {...register("dob")}
                className="pl-10 p-3 w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-400"
              />

              {errors.dob && (
                <p className="text-sm text-red-500">{errors.dob.message}</p>
              )}
            </>
          )}

          {next ? (
            <button
              type="button"
              className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 rounded-lg shadow-md transition transform hover:scale-[1.02]"
              onClick={async () => {
                const valid = await trigger(["email", "password"]);
                if (valid) setNext(false);
              }}
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={load}
              className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 rounded-lg shadow-md transition transform hover:scale-[1.02]"
            >
              {load ? "Processing...":"Register Now"}
            </button>
          )}

          <div className="flex items-center gap-2 my-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <button className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition">
            <FcGoogle className="w-5 h-5" />
            <span className="text-[14px] md:text-md">Sign up with Google</span>
          </button>
        </form>

        <p className="text-gray-500 text-center mt-6">
          <span className="text-[14px] md:text-md">
            Already have an account?{" "}
          </span>
          <Link
            href="/auth/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
