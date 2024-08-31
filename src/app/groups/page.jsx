"use client";

import { useDispatch } from "react-redux";
import { CreateGroup, CustomInput, PageNavigation } from "@/components";
import { updateModalState } from "@/redux/slices/ModalSlice";
import { SelectContent, SelectItem, SelectLabel } from "@/components/ui/select";
import SelectBox from "@/components/input/SelectBox";
import { ArrowUpDown, Search } from "lucide-react";
import GroupCard from "@/components/Cards/GroupCard";

export default function Groups() {
  const dispatch = useDispatch();

  return (
    <>
      <PageNavigation
        menus={["Joined", "All"]}
        onButtonClick={() => {
          dispatch(updateModalState("openCreateGroupModal"));
        }}
        buttonLabel="Create Group"
      />

      <div className="my-5 sm:my-7 3xl:my-9">
        <form className="mt-6 flex gap-4 md:max-w-full lg:max-w-[800px] xl:max-w-[1000px] xl:gap-6">
          <div className="w-max md:w-1/3 2xl:w-1/4">
            <SelectBox
              name="group"
              placeholder={
                <>
                  <span className="md:hidden">
                    <ArrowUpDown />
                  </span>
                  <span className="hidden md:block">Date Created</span>
                </>
              }
            >
              <SelectContent className="relative top-3 w-60 rounded-xl border-blue-gray bg-blue-gray py-4 text-white">
                <SelectItem
                  className="bg-blue-gray py-3 focus:!bg-slate-gray focus:text-white"
                  value="trending"
                >
                  Trending
                </SelectItem>
                <SelectItem
                  className="mt-4 bg-blue-gray py-3 focus:!bg-slate-gray focus:text-white"
                  value="most-members"
                >
                  Most Members
                </SelectItem>
              </SelectContent>
            </SelectBox>
          </div>
          <div className="relative w-full">
            <CustomInput
              name="searchGroups"
              placeholder="Search Groups"
              className="pl-12"
            />

            <div className="absolute top-1/2 -translate-y-1/2 pl-3 text-white">
              <Search />
            </div>
          </div>
        </form>
      </div>
      <div className="mb-20 grid grid-cols-1 gap-4 sm:grid-cols-[1fr,1fr] xl:mb-10 xl:gap-6 2xl:grid-cols-[1fr,1fr,1fr] 3xl:gap-8">
        {new Array(9).fill(true).map((_, i) => (
          <GroupCard key={i} />
        ))}
      </div>
      <CreateGroup />
    </>
  );
}
