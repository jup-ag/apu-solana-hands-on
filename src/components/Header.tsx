import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";
import React from "react";

const Header = () => {
  return (
    <div className="border-b-2 border-b-black/10 pb-2 z-50 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
      <p className="flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        APU Solana Hands-on
      </p>
    </div>
  );
};

export default Header;
