import { Keypair } from "@solana/web3.js";
import * as React from "react";

interface IWalletProps {
  keypair: Keypair;
}

const Wallet: React.FunctionComponent<IWalletProps> = ({ keypair }) => {
  return (
    <div>
      <p className="font-semibold">Your Keypair</p>
      <p style={{ wordBreak: "break-all" }}>
        PublicKey: {keypair.publicKey.toString()}
      </p>

      <div className="flex mt-4">
        <a
          href={`https://explorer.solana.com/address/${keypair?.publicKey?.toString()}?cluster=devnet`}
          target="_blank"
          className="text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white"
        >
          Open Explorer
        </a>
      </div>
    </div>
  );
};

export default Wallet;
