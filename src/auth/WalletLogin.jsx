import Image from "next/image";

// import all assets object
import { ASSETS } from "@/assets";

const WalletLogin = () => {
  return (
    <button className="flex w-full items-center justify-center gap-3 rounded-full border-none bg-white p-3 text-sm font-semibold text-dark-slate sm:text-base 2xl:text-[17px] 3xl:text-lg 4xl:text-xl">
      <Image src={ASSETS.WALLET_ICON} alt="google" className="w-6" />
      Log in with wallet
    </button>
  );
};

export default WalletLogin;
