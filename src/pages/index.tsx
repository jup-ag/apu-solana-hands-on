import GithubQR from "@/components/GithubQR";
import Header from "@/components/Header";
import Exercise1GenerateKeypairs from "@/exercises/1-generate-keypairs";
import Exercise2Airdropping from "@/exercises/2-airdropping";
import Exercise3GettingBalance from "@/exercises/3-getting-balances";
import Exercise4ReadingRealtimeBlocks from "@/exercises/4-reading-realtime-blocks";
import Exercise5SendingTokens from "@/exercises/5-sending-tokens";
import { useLocalStorage } from "@jup-ag/wallet-adapter";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Inter } from "next/font/google";
import { useEffect, useMemo } from "react";

const inter = Inter({ subsets: ["latin"] });

const Separator = () => {
  return <div className="border-b my-4 border-b-black/10" />;
};

export const WRAPPED_SOL_MINT = new PublicKey(
  "So11111111111111111111111111111111111111112"
);

export default function Home() {
  const [keypair, setKeypair] = useLocalStorage<Keypair | null>(
    "local-keypair",
    null
  );

  // DO NOT DO THIS IN PRODUCTION
  useEffect(() => {
    if (keypair) {
      const sKeys = Uint8Array.from(
        Object.values((keypair as any)._keypair.secretKey) as any
      );
      const regenKeypair = Keypair.fromSecretKey(sKeys);
      setKeypair(regenKeypair);
    }
    // On startup only
  }, []);

  const connection = useMemo(
    () =>
      new Connection(
        "https://devnet.helius-rpc.com/?api-key=cdb44f70-0173-4b5d-aa3d-8d128eb8a86c"
      ),
    []
  );

  return (
    <main
      className={`flex max-w-screen overflow-x-hidden min-h-screen flex-col items-center justify-center p-4 lg:p-24 ${inter.className}`}
    >
      <Header />

      <div className="mt-8 flex flex-col justify-center w-full max-w-2xl">
        <Exercise1GenerateKeypairs keypair={keypair} setKeypair={setKeypair} />
        <Separator />

        <Exercise2Airdropping keypair={keypair} connection={connection} />
        <Separator />

        <Exercise3GettingBalance keypair={keypair} connection={connection} />
        <Separator />

        <Exercise4ReadingRealtimeBlocks connection={connection} />
        <Separator />

        <Exercise5SendingTokens keypair={keypair} connection={connection} />
        <Separator />
      </div>

      <GithubQR />
    </main>
  );
}
