"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "../Sidebar";

import { CTAButton, TrendingPosts, Moderators, PostCard } from "@/components";

import { allPosts } from "@/mock/Posts";

export default function Explore() {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      {/* container for the post section and moderators sections */}
      <div className="mb-20 grid grid-cols-1 gap-5 xl:mb-10 xl:grid-cols-[2fr,1fr] 2xl:gap-7 4xl:gap-10">
        {/* container for the posts */}
        <div className="flex justify-end pb-1 sm:pb-2 md:pb-3 xl:hidden">
          <CTAButton onClick={() => setOpenDrawer(true)}>
            <Menu />
          </CTAButton>
        </div>
        <div className="w-full">
          <PostCard posts={allPosts[0]} />
        </div>
        {/* container for the moderators and groups */}
        <Sidebar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
          <Moderators />
          <div className="xl:mt-5 2xl:mt-7 3xl:mt-9">
            <TrendingPosts />
          </div>
        </Sidebar>
        {/* container for the moderators and groups */}
      </div>
    </>
  );
}
