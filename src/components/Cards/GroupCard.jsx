import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

const GroupCard = () => {
  return (
    <div className="rounded-2xl bg-none from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] p-[2px] transition-all hover:bg-gradient-to-r">
      <Card className="rounded-2xl border-none bg-slate-gray p-5 outline-none sm:p-6 2xl:p-7 3xl:p-8 4xl:p-9">
        <CardContent className="flex flex-col gap-4 p-0 sm:gap-5 xl:gap-6">
          <Link href={"/groups/photography?type=posts"}>
            <CardHeader className="flex-row items-center gap-3 p-0 xl:gap-5">
              <div className="w-16 xl:w-20">
                <Image
                  src={require("@/assets/images/camera_img.png")}
                  alt="Camera"
                  className="w-full rounded-xl object-cover"
                />
              </div>
              <div className="">
                <CardTitle className="cursor-pointer text-base font-semibold text-white hover:underline sm:text-lg 4xl:text-xl">
                  Photography
                </CardTitle>
                <CardDescription className="mt-1 text-sm font-normal text-[#a1a1aa] md:text-[15px] 2xl:text-base 4xl:mt-2 4xl:text-lg">
                  Created Nov 20, 2023
                </CardDescription>
              </div>
            </CardHeader>
          </Link>
          <div className="flex justify-between sm:justify-normal sm:gap-24">
            {/* Members statistics */}
            <div className="">
              <p className="text-base text-[#a1a1aa] sm:mb-1 4xl:text-lg">
                Members
              </p>
              <strong className="text-[15px] text-white sm:text-base 4xl:text-lg">
                30.3k
              </strong>
            </div>

            {/* Posts statistics */}
            <div className="">
              <p className="text-base text-[#a1a1aa] sm:mb-1 4xl:text-lg">
                Posts
              </p>
              <strong className="text-[15px] text-white sm:text-base 4xl:text-lg">
                500
              </strong>
            </div>
          </div>
          <CardFooter className="p-0">
            <Button
              variant="outline"
              className="hover:bg-dark-gray w-full rounded-full border-2 bg-transparent text-sm font-semibold !text-white sm:text-base 3xl:py-6 4xl:text-lg"
            >
              Leave
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupCard;
