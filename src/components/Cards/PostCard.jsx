// Import necessary modules and components from Next.js and other libraries
"use client";
import Image from "next/image";
import { useState } from "react";

// Import custom Card components from UI
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Import assets
import { ASSETS } from "@/assets";

// Import icons from lucide-react
import {
  ArrowUpDown,
  ImagePlus,
  MessageSquareText,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

// Import custom icons
import { RepostIcon, ShareIcon } from "@/assets/Icons";
import TextareaInput from "../input/TextareaInput";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { CTAButton, Dropdown } from "..";
import SelectBox from "../input/SelectBox";
import { SelectContent, SelectItem } from "../ui/select";

const PostCard = ({ posts }) => {
  const [comments, setComments] = useState(false);

  return (
    // Main Card component with custom styles
    <div className="rounded-2xl bg-none from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] p-[2px] transition-all hover:bg-gradient-to-r">
      <Card className="rounded-2xl border-none bg-slate-gray p-5 outline-none sm:p-6 2xl:p-7 3xl:p-8 4xl:p-9">
        {/* CardHeader contains the header section with user info and options */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
          <div className="flex items-center gap-5 4xl:gap-7">
            {/* User image section with profile picture overlay */}
            <div className="relative w-14 4xl:w-20">
              <Image
                src={require("@/assets/images/camera_img.png")}
                alt="Camera"
                className="h-full w-full object-cover"
              />
              <div className="absolute -bottom-2 -right-2 w-6 4xl:w-8">
                <Image
                  src={ASSETS.USER_IMAGE}
                  alt="user"
                  className="w-full rounded-full"
                />
              </div>
            </div>
            <div>
              <CardTitle className="cursor-pointer text-base text-white hover:underline sm:text-lg 3xl:text-xl">
                Photography
              </CardTitle>
              <CardDescription className="text-sm text-[#a1a1aa] 3xl:text-base">
                <span className="hover:underline">redredred</span> • 1 hour ago
              </CardDescription>
            </div>
          </div>

          <Dropdown
            dropdownMenu={[{ name: "view", link: "/explore/detail" }]}
          />
        </CardHeader>
        <CardContent className="p-0">
          {/* Post Heading */}
          <h3 className="mt-6 text-lg font-bold text-white md:text-xl 2xl:text-[22px] 4xl:mt-8 4xl:text-[26px]">
            {posts?.title}
          </h3>
          {/* Post Image */}
          {posts?.image && (
            <div className="mx-auto mt-6 h-full w-full max-w-96 3xl:max-h-[552px] 3xl:max-w-[403px] 4xl:mt-8">
              <Image
                src={posts?.image}
                alt="uploaded post"
                className="block h-full w-full object-contain"
              />
            </div>
          )}
          {/* Post content */}
          <div
            className="post_content"
            dangerouslySetInnerHTML={{ __html: posts?.description }}
          />
          <div className="mt-6 flex flex-wrap gap-4 3xl:mt-8">
            {/* Hashtags */}
            {posts?.hashtags?.map((tag, i) => {
              return (
                <p
                  key={i}
                  className="cursor-pointer text-sm text-[#B9FEF5] hover:underline sm:text-base 4xl:text-lg"
                >
                  {tag}
                </p>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="mt-6 flex items-center justify-between p-0 4xl:mt-8">
          {/* Footer with action icons */}
          <div className="flex gap-3 sm:gap-5 lg:gap-7">
            {/* Like post */}
            <div className="flex cursor-pointer items-center gap-1 text-white">
              <ThumbsUp /> <span className="text-sm">10</span>
            </div>
            {/* Dislike post */}
            <div className="flex cursor-pointer items-center gap-1 text-white">
              <ThumbsDown /> <span className="text-sm">1</span>
            </div>
          </div>
          <div className="flex gap-3 sm:gap-5 lg:gap-7">
            {/* comment post */}
            <div
              onClick={() => setComments(!comments)}
              className="flex cursor-pointer items-center gap-1 text-white"
            >
              <MessageSquareText /> <span className="text-sm">7</span>
            </div>
            {/* repost post */}
            <div className="flex cursor-pointer gap-1 text-white">
              <RepostIcon />
            </div>
            {/* share post */}
            <div className="flex cursor-pointer gap-1 text-white">
              <ShareIcon />
            </div>
          </div>
        </CardFooter>
        <AddComments comments={comments} />
      </Card>
    </div>
  );
};

const AddComments = ({ comments }) => {
  const form = useForm({
    defaultValues: {
      comment: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      {comments && (
        <div className="my-4 lg:my-6 2xl:my-8 4xl:my-10">
          <div className="flex flex-col justify-between gap-2 md:flex-row md:gap-5">
            <Avatar className="hidden md:block">
              <AvatarImage src={"https://github.com/shadcn.png"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="relative w-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <TextareaInput
                    control={form.control}
                    name="comment"
                    className="!mt-0"
                  />
                  <div
                    className="absolute bottom-3 right-3 flex cursor-pointer items-center gap-2 text-white"
                    // onClick={handleFileClick}
                  >
                    <ImagePlus /> <span className="text-base">GIF</span>
                    <CTAButton extra="ml-4">Comment</CTAButton>
                  </div>
                  <div className="hidden">
                    <input
                      name="title"
                      type="file"
                      placeholder="Title"
                      id="file"
                      // accept=".png,.jpg,.jpeg,.gif"
                    />
                  </div>
                </form>
              </Form>
            </div>
          </div>
          <DisplayComments />
        </div>
      )}
    </>
  );
};

const DisplayComments = () => {
  return (
    <>
      <div className="my-6 2xl:my-8 4xl:my-10">
        <div className="max-w-fit md:max-w-36">
          <SelectBox
            placeholder={
              <>
                <span className="md:hidden">
                  <ArrowUpDown />
                </span>
                <span className="hidden md:block">Newest</span>
              </>
            }
            className="w-full"
          >
            <SelectContent className="border-blue-gray bg-blue-gray text-white">
              <SelectItem
                className="mt-1 bg-blue-gray py-2 focus:!bg-slate-gray focus:text-white"
                value="newest"
              >
                Newest
              </SelectItem>
              <SelectItem
                className="mt-1 bg-blue-gray py-2 focus:!bg-slate-gray focus:text-white"
                value="oldest"
              >
                Oldest
              </SelectItem>
              <SelectItem
                className="mt-1 bg-blue-gray py-2 focus:!bg-slate-gray focus:text-white"
                value="top"
              >
                Top
              </SelectItem>
            </SelectContent>
          </SelectBox>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-center gap-2 sm:gap-5 lg:items-start">
          <Avatar>
            <AvatarImage src={"https://github.com/shadcn.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-sm text-[#a1a1aa] lg:text-[15px] 3xl:text-base">
            <p>
              <strong>pi</strong> • 1 hour ago
            </p>
          </div>
        </div>
        <div className="mt-3 lg:-my-4 lg:mx-14">
          <div className="mt-3 overflow-hidden rounded-lg bg-blue-gray">
            <p className="px-3 py-3 text-sm text-white lg:px-5 lg:text-[15px] 2xl:text-base 4xl:text-lg">
              I m on the same boat! Will be checking back to see what others say
            </p>
          </div>
          <div className="mt-4 flex items-center gap-5">
            <div className="flex cursor-pointer items-center gap-1 text-white hover:text-blue-700">
              <ThumbsUp /> <span className="text-sm">1</span>
            </div>
            <div className="flex cursor-pointer items-center gap-1 text-white hover:text-red-700">
              <ThumbsDown /> <span className="text-sm">1</span>
            </div>
            <div className="text-sm text-white xl:text-[15px] 4xl:text-base">
              Reply
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
