import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { closeModal } from "@/redux/slices/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { SendHorizontal, X } from "lucide-react";
import Image from "next/image";
import { ASSETS } from "@/assets";
import { ScrollArea } from "../ui/scroll-area";

import { CustomInput, Dropdown } from "..";

const ChatBox = () => {
  const dispatch = useDispatch();

  const dialogState = useSelector((state) => state.ModalSlice);

  return (
    <AlertDialog
      open={dialogState.openChatBoxModal}
      onOpenChange={() => {
        dispatch(closeModal("openChatBoxModal"));
      }}
    >
      <AlertDialogContent
        className={cn(
          "pointer-events-none hidden w-11/12 gap-0 overflow-hidden rounded-xl border-none bg-slate-gray p-0 xl:pointer-events-auto xl:block xl:max-w-[50rem] 2xl:max-w-[50rem] 4xl:max-w-[60rem]",
        )}
      >
        <AlertDialogHeader className={cn("border-b-[1px] border-blue-gray")}>
          <div className="flex items-center justify-between px-5 py-4">
            <AlertDialogTitle className="text-xl text-white 2xl:text-xl">
              Messages
            </AlertDialogTitle>
            <AlertDialogCancel
              className={cn(
                "mt-0 max-w-min justify-end border-none bg-slate-gray p-0 !text-white hover:bg-transparent",
              )}
            >
              <X />
            </AlertDialogCancel>
          </div>
        </AlertDialogHeader>
        <div className="grid grid-cols-[260px,1fr]">
          <AllChats />
          <MessageBox />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const AllChats = () => {
  return (
    <div className="border-r-[1px] border-blue-gray">
      <ScrollArea className="h-[70vh]">
        {new Array(2).fill(true).map((_, i) => {
          return (
            <div
              key={i}
              className="cursor-pointer border-b-[1px] border-blue-gray p-5 hover:bg-blue-gray"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={ASSETS.USER_IMAGE}
                  alt="user"
                  className="h-9 w-9 rounded-full"
                />
                <div className="flex flex-col">
                  <p className="text-[15px] text-white 3xl:text-base">Pi</p>
                  <p className="text-[13px] text-[#a1a1aa]">
                    Me: Hey, what’s up?{" "}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
};

const MessageBox = () => {
  return (
    <div>
      <div className="flex items-center justify-between border-b-[1px] border-blue-gray px-6 py-4">
        <p className="text-base text-white 3xl:text-lg">Pi</p>
        <Dropdown dropdownMenu={[{ name: "view", link: "/explore/detail" }]} />
      </div>
      <div className="relative">
        <ScrollArea className="h-[62vh]">
          <div className="p-6">
            <div className="mb-2 flex items-start gap-4">
              <Image
                src={ASSETS.USER_IMAGE}
                alt="user"
                className="h-9 w-9 rounded-full"
              />
              <div className="">
                <p className="text-[15px] text-[#a1a1aa]">pi • 1 hour ago</p>
                <p className="mt-3 w-max rounded-md bg-slate-gray px-4 py-3 text-white">
                  Hey!
                </p>
              </div>
            </div>
            <div className="mb-2 flex items-start justify-end gap-4">
              <div className="">
                <p className="text-right text-[15px] text-[#a1a1aa]">
                  Me • 1 hour ago
                </p>
                <p className="mt-3 w-max rounded-md bg-[#234f4a] px-4 py-3 text-white">
                  Hey, what’s up?
                </p>
              </div>
              <Image
                src={ASSETS.USER_IMAGE}
                alt="user"
                className="h-9 w-9 rounded-full"
              />
            </div>
          </div>
        </ScrollArea>
        <div className="bg-slate-gray">
          <div className="relative bottom-4 flex w-full items-center justify-between gap-5 bg-slate-gray px-6">
            <CustomInput
              placeholder="Text"
              className="w-full rounded-sm py-5 !text-sm"
            />
            <div className="text-white">
              <SendHorizontal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
