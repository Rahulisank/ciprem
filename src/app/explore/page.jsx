"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CreatePost,
  JoinGroups,
  MyGroups,
  NFTcard,
  PageNavigation,
  PostCard,
} from "@/components";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Sidebar from "./Sidebar";

import { updateModalState } from "@/redux/slices/ModalSlice";
import { allPosts } from "@/mock/Posts";

export default function Home() {
  const dispatch = useDispatch();

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      {/* container for the post section and moderators sections */}
      <div className="mb-20 grid grid-cols-1 gap-5 xl:mb-10 xl:grid-cols-[2fr,1fr] 2xl:gap-7 4xl:gap-10">
        {/* container for the posts */}
        <div className="">
          <PageNavigation
            menus={["trending", "new"]}
            onButtonClick={() => {
              dispatch(updateModalState("openCreatePostModal"));
            }}
            buttonLabel="Create Post"
            activeDrawer={() => setOpenDrawer(true)}
          />
          <div className="mt-5 flex flex-col gap-6 xl:mt-5 2xl:mt-7 3xl:mt-10 3xl:gap-8">
            {allPosts?.map((posts) => (
              <PostCard posts={posts} key={posts?.id} />
            ))}
          </div>
          {/* Nfts */}
          <div className="my-4 flex justify-between md:my-6 2xl:my-8">
            <h3 className="text-base text-white md:text-lg xl:text-xl 3xl:text-[22px]">
              Trending NFTs - Art
            </h3>
            <Link
              href="/nft"
              className="text-sm text-shiny-blue xl:text-base 3xl:text-lg"
            >
              View NFTs
            </Link>
          </div>
          <Carousel>
            <CarouselContent className="gap-2">
              {new Array(5).fill(true).map((_, i) => {
                return (
                  <CarouselItem
                    key={i}
                    className="basis-1/1 text-white lg:basis-1/4 xl:basis-1/3 4xl:basis-1/4"
                  >
                    <NFTcard />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
        {/* container for the moderators and groups */}
        {/*  */}

        <Sidebar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
          <MyGroups />
          <div className="xl:mt-5 2xl:mt-7 3xl:mt-9">
            <JoinGroups />
          </div>
        </Sidebar>
      </div>

      {/* create post */}
      <CreatePost />
    </>
  );
}
