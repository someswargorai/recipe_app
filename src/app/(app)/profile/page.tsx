"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Profile } from "@/app/service/user/ProfileService";

export default function InstagramProfile() {

  const router=useRouter();
  const [profile,setProfile]=useState([]);

  const getProfileDetails= async()=>{
    const response= await Profile.getProfile();
    // setProfile(response.user);
  }


  useEffect(()=>{

    getProfileDetails();

  },[]);


  return (
    <div className="w-[82vw] mx-auto p-4 md:p-15">
    
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
          {/* Profile Pic */}
          <div className="flex justify-center md:block">
            <div className="relative w-24 h-24 md:w-36 md:h-36">
              <Image
                src="https://i.pravatar.cc/150?img=2"
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1">
            {/* Username & Buttons */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-center md:text-left">
                foodie_explorer
              </h2>

              <div className="flex gap-2 mt-3 md:mt-0 justify-center md:justify-start">
                <button className="flex-1 md:flex-none px-4 py-1 border rounded-md text-sm font-semibold" onClick={()=>router.push("/profile/edit/2235")}>
                  Edit Profile
                </button>
                <button className="flex-1 md:flex-none px-4 py-1 border rounded-md text-sm font-semibold">
                  Share Profile
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden md:flex items-center gap-8 mb-4">
              <p>
                <span className="font-bold">120</span> posts
              </p>
              <p>
                <span className="font-bold">2.3k</span> followers
              </p>
              <p>
                <span className="font-bold">540</span> following
              </p>
            </div>

            {/* Mobile Stats */}
            <div className="flex justify-around text-center text-sm md:hidden mt-2">
              <div>
                <p className="font-bold">120</p>
                <p className="text-gray-500">Posts</p>
              </div>
              <div>
                <p className="font-bold">2.3k</p>
                <p className="text-gray-500">Followers</p>
              </div>
              <div>
                <p className="font-bold">540</p>
                <p className="text-gray-500">Following</p>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-4 text-center md:text-left">
              <p className="font-semibold">Foodie Explorer 🌍</p>
              <p className="text-sm">
                Discovering delicious recipes from around the world. 🌮🍣🍕
              </p>
              <a href="#" className="text-blue-500 text-sm">
                www.foodieexplorer.com
              </a>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex gap-6 mb-10 overflow-x-auto scrollbar-hide">
          {["Desserts", "Street Food", "Vegan", "Drinks", "Favorites"].map(
            (title, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 shrink-0"
              >
                <div className="w-16 h-16 rounded-full border flex items-center justify-center overflow-hidden">
                  <Image
                    src={`https://i.pravatar.cc/150?img=${i + 1}`}
                    alt={title}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <p className="text-xs">{title}</p>
              </div>
            )
          )}
      
      </div>
      {/* Tabs */}
      <div className="flex justify-center gap-12 border-t pt-4 mb-6 text-sm font-semibold text-gray-700">
        <p className="cursor-pointer">POSTS</p>
        <p className="cursor-pointer">REELS</p>
        <p className="cursor-pointer">TAGGED</p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="relative aspect-square">
            <Image
              src={`https://i.pravatar.cc/300?img=${i + 5}`}
              alt={`Post ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
