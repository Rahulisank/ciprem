"use client";

import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import { Bell, MessageSquareText, Search, X } from "lucide-react";

import Login from "@/auth/Login";
import SignUp from "@/auth/SignUp";
import { Popover, PopoverTrigger } from "../ui/popover";

import { updateModalState } from "@/redux/slices/ModalSlice";
import { CTAButton, CustomInput } from "..";
import Link from "next/link";

import { headerMenues } from "@/mock/Header";
import ChatBox from "../dialog/ChatBox";
import { useEffect, useState } from "react";
import Notificaton from "./Notificaton";
import Image from "next/image";
import { ASSETS } from "@/assets";

const Header = () => {
  // Get the current pathname from the URL
  const pathname = usePathname();

  const [searchBar, setSearchBar] = useState(false);

  // Redux dispatch function to dispatch actions
  const dispatch = useDispatch();

  const [isFixed, setIsFixed] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos =
        typeof window !== "undefined" && window.pageYOffset;
      if (currentScrollPos > prevScrollPos) {
        // Scrolling down
        setIsFixed(false);
      } else {
        // Scrolling up
        setIsFixed(true);
      }
      setPrevScrollPos(currentScrollPos);
    };

    typeof window !== "undefined" &&
      window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <nav
        className={`fixed top-0 z-10 w-full bg-slate-gray py-5 transition-transform duration-300 3xl:py-6 ${isFixed ? "fixed top-0 w-full bg-slate-gray" : "-translate-y-full"}`}
      >
        <div className="container-fluid">
          <div className="flex items-center justify-between">
            {/* logo section */}
            <div className="relative z-20 cursor-pointer text-white">
              <Link
                href={"/"}
                className="text-base md:text-lg xl:text-xl 3xl:text-2xl"
              >
                <Image src={ASSETS.LOGO} alt="logo" />
              </Link>
            </div>
            {/* navigation menu */}
            <div
              className={`hidden bg-slate-gray transition-all duration-300 sm:w-1/2 md:relative md:mt-0 md:h-auto xl:block`}
            >
              <ul className="flex h-full flex-row items-center justify-center gap-8 p-0 lg:gap-4 xl:gap-5 2xl:gap-7">
                {headerMenues?.map((menu) => {
                  return (
                    <li
                      key={menu?.id}
                      className="w-full border-b-[1px] pb-3 md:w-auto md:border-none md:pb-0"
                    >
                      <Link
                        href={menu?.slug}
                        className={`flex items-center gap-3 rounded-lg p-3 text-base text-white transition-all duration-200 hover:bg-[rgba(3,68,49,20%)] hover:text-shiny-blue 4xl:text-lg ${pathname.includes(menu?.name?.toLowerCase()) ? "bg-[rgba(3,68,49,20%)] !text-shiny-blue" : ""}`}
                      >
                        {menu?.icon} {menu?.name}
                      </Link>
                    </li>
                  );
                })}

                {/*Search  input for large screen   */}
                <li className="relative hidden lg:block">
                  <CustomInput
                    placeholder="Search for posts, groups, or users"
                    className={cn(
                      "rounded-md text-sm lg:w-80 lg:py-3 lg:pl-10 xl:w-[24rem] xl:text-[15px] 2xl:w-[30rem] 2xl:py-6 2xl:pl-12",
                    )}
                  />
                  <button className="absolute top-1/2 -translate-y-1/2 pl-3 text-white">
                    <Search className="lg:h-5 lg:w-5" />
                  </button>
                </li>
              </ul>
            </div>
            {/* Right side of the header */}
            <div className="flex items-center gap-6">
              {/* Search popover for small screens */}
              <div
                className={`absolute right-0 flex h-full w-full items-center justify-center gap-3 bg-slate-gray px-3 transition-all duration-500 md:gap-4 md:px-5 ${searchBar ? "z-20 translate-x-0" : "-z-10 translate-x-full"}`}
              >
                <div
                  onClick={() => setSearchBar(false)}
                  className="cursor-pointer text-white"
                >
                  <X />
                </div>
                <CustomInput
                  placeholder="Search for posts, groups, or users"
                  className="mx-auto w-full px-10 py-5 pl-5"
                />
              </div>
              <div
                onClick={() => setSearchBar(true)}
                className="cursor-pointer text-white xl:hidden"
              >
                <Search />
              </div>

              <button
                onClick={() => {
                  dispatch(updateModalState("openChatBoxModal"));
                }}
                className="hidden text-white xl:block"
              >
                <MessageSquareText />
              </button>
              <Popover>
                <PopoverTrigger className="hidden text-white xl:block">
                  <Bell />
                </PopoverTrigger>
                <Notificaton />
              </Popover>

              <CTAButton
                onClick={() => {
                  dispatch(updateModalState("openLoginModal"));
                }}
              >
                Login
              </CTAButton>
            </div>
          </div>
        </div>

        {/* Login Dialog */}
        <Login />
        {/* Signup Dialog */}
        <SignUp />

        {/* chat dialog */}
        <ChatBox />
      </nav>
      <div className="mb-[105px] md:mb-28 2xl:mb-32 4xl:mb-36"></div>
    </>
  );
};

export default Header;
