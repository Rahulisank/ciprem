"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  CTAButton,
  Dropdown,
  JoinGroups,
  Moderators,
  NFTcard,
  OutlineButton,
  PageNavigation,
  PostCard,
} from "@/components";
import Sidebar from "@/app/explore/Sidebar";

import { allPosts } from "@/mock/Posts";

export default function GroupPage() {
  const queryParams = useSearchParams();
  const query = queryParams.get("type");

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      {/* Container for the top section */}
      <section className="flex flex-col justify-between gap-y-5 border-b-[1px] border-slate-gray pb-5 md:pb-8 xl:flex-row 3xl:pb-10 4xl:pb-12">
        {/* Left side: Image and brief description */}
        <div className="flex gap-2 sm:gap-3 md:gap-5 xl:w-1/2 2xl:w-2/5">
          {/* Image container with fixed size */}
          <div className="!w-24 overflow-hidden xl:!w-44">
            <Image
              src={require("@/assets/images/camera_img.png")}
              alt="Camera"
              className="w-full rounded-full object-cover"
            />
          </div>

          {/* Description section */}
          <div className="flex w-full items-center justify-between px-4 xl:block">
            <Link href={"groups/photography?type=experiences"}>
              <h3 className="text-base font-semibold text-white hover:underline sm:text-lg 4xl:text-xl">
                Photography
              </h3>
              <p className="mt-1 text-sm font-normal text-[#a1a1aa] md:text-[15px] 2xl:text-base 4xl:mt-2 4xl:text-lg">
                Created Nov 20, 2023
              </p>
            </Link>
            <div className="flex items-center gap-4 xl:mt-4 4xl:mt-6">
              {/* Join button */}
              <OutlineButton className={cn("hidden sm:flex")}>
                Message
              </OutlineButton>
              <CTAButton extra="hidden sm:flex py-5 px-4 rounded-full  md:px-8 font-semibold border-2 border-shiny-blue">
                Follow
              </CTAButton>

              <Dropdown
                dropdownMenu={[
                  { name: "view", link: "/groups/photography?type=posts" },
                ]}
                contentClass={"xl:!left-24"}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <OutlineButton className={cn("flex max-w-fit sm:hidden")}>
            Message
          </OutlineButton>
          <CTAButton extra=" sm:hidden py-5 px-8 rounded-full  font-semibold border-2 border-shiny-blue">
            Follow
          </CTAButton>
        </div>
        {/* Right side: Statistics and description */}
        <div className="xl:w-1/2 2xl:w-3/5">
          <div className="mb-4 flex gap-24">
            {/* Members statistics */}
            <div className="">
              <p className="mb-1 text-base text-[#a1a1aa] 4xl:text-lg">
                Followers
              </p>
              <strong className="text-base text-white 4xl:text-lg">1.2k</strong>
            </div>

            {/* Posts statistics */}
            <div className="">
              <p className="mb-1 text-base text-[#a1a1aa] 4xl:text-lg">Posts</p>
              <strong className="text-base text-white 4xl:text-lg">500</strong>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-white md:text-base xl:text-[15px] 2xl:text-base 4xl:text-lg">
            {`A place to discuss the tools, techniques, and culture of photography. Whether it\u2019s a bit of homemade gear, a trick for getting a good group shot, or that special addition to your workflow, post it up here for the rest of us to learn!`}
          </p>
        </div>
      </section>

      {/* container for the post section and moderators sections */}

      <div className="pt-4 lg:pt-6 2xl:pt-8">
        <div className="mb-24 grid grid-cols-1 gap-5 xl:mb-10 xl:grid-cols-[2fr,1fr] 2xl:gap-7 4xl:gap-10">
          {/* container for the posts */}
          <div className="">
            <PageNavigation
              menus={["Posts", "Experiences", "NFTs"]}
              onButtonClick={() => {
                // dispatch(updateModalState("openCreatePostModal"));
              }}
              activeDrawer={() => setOpenDrawer(true)}
            />
            {query === "posts" && (
              <div className="mt-5 flex flex-col gap-6 xl:mt-5 2xl:mt-7 3xl:mt-10 3xl:gap-8">
                {allPosts?.map((posts) => (
                  <PostCard posts={posts} key={posts?.id} />
                ))}
              </div>
            )}

            {query === "experiences" && (
              <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:mt-5 xl:grid-cols-2 2xl:mt-7 2xl:grid-cols-3 3xl:mt-10 3xl:gap-8">
                {new Array(3).fill(true)?.map((_, i) => (
                  <div key={i} className="basis-[31%]">
                    <NFTcard />
                  </div>
                ))}
              </div>
            )}

            {query === "nfts" && (
              <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:mt-5 xl:grid-cols-2 2xl:mt-7 2xl:grid-cols-3 3xl:mt-10 3xl:gap-8">
                {new Array(5).fill(true)?.map((_, i) => (
                  <div key={i} className="basis-[31%]">
                    <NFTcard />
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* container for the moderators and groups */}

          <Sidebar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
            <JoinGroups />
            <div className="xl:mt-5 2xl:mt-7 3xl:mt-9">
              <Moderators />
            </div>
          </Sidebar>
        </div>
        {/* container for the moderators and groups */}
      </div>
    </>
  );
}
