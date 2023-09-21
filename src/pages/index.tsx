import Image from "next/image";
import { Inter } from "next/font/google";
import { UnifiedWalletButton, useLocalStorage } from "@jup-ag/wallet-adapter";
import {
  Connection,
  Keypair,
  MessageV0,
  PublicKey,
  SystemProgram,
  TokenAmount,
  Transaction,
  TransactionMessage,
  VersionedMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { useEffect, useMemo, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const WRAPPED_SOL_MINT = new PublicKey(
  "So11111111111111111111111111111111111111112"
);

export default function Home() {
  const [keypair, setKeypair] = useLocalStorage<Keypair | null>(
    "local-keypair",
    null
  );

  const generateKeypair = () => {
    const keypair = Keypair.generate();
    setKeypair(keypair);
  };

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

  const [airdropping, setAirdropping] = useState<boolean>(false);
  const onClickAirdrop = async () => {
    if (!keypair?.publicKey) return;

    setAirdropping(true);
    try {
      const txid = await connection.requestAirdrop(
        keypair?.publicKey,
        1_000_000_000
      );
      const result = await connection.confirmTransaction(txid);

      if ("err" in result) {
        console.error(result.err);
        throw new Error("Failed to airdrop");
      }
    } catch (error) {
      // ignore
    } finally {
      setAirdropping(false);
    }
  };

  const [balance, setBalance] = useState<string>("0");
  useEffect(() => {
    const fetchSOLBalance = async () => {
      if (!keypair?.publicKey) return;

      try {
        const solBalance = await connection.getBalance(keypair.publicKey);
        setBalance((solBalance / 10 ** 9).toFixed(9));

        // const solATA = await getAssociatedTokenAddress(
        //   WRAPPED_SOL_MINT,
        //   keypair.publicKey
        // );

        // const result = await connection.getTokenAccountBalance(solATA);
        // setBalance(result.value);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSOLBalance();
    const intervalId = setInterval(fetchSOLBalance, 2_000);

    return () => {
      clearInterval(intervalId);
    };
  }, [connection, keypair]);

  const [currentBlock, setCurrentBlock] = useState<number>(0);
  useEffect(() => {
    const id = connection.onRootChange(setCurrentBlock);
    return () => {
      connection.removeRootChangeListener(id);
    };
  }, [connection]);

  const [txid, setTxid] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [amountToTransfer, setAmountToTransfer] = useState<number>(0);
  const [isSending, setIsSending] = useState<boolean>(false);
  const onClickTransfer = async () => {
    if (!keypair?.publicKey) return;

    try {
      new PublicKey(recipient);
    } catch (error) {
      alert("Invalid Public Key");
      return;
    }

    try {
      setIsSending(true);
      const ix = SystemProgram.transfer({
        fromPubkey: keypair?.publicKey,
        toPubkey: new PublicKey(recipient),
        lamports: amountToTransfer,
      });

      const { blockhash } = await connection.getLatestBlockhash();
      const messageV0 = new TransactionMessage({
        payerKey: keypair.publicKey,
        recentBlockhash: blockhash,
        instructions: [ix],
      }).compileToV0Message();
      const verTx = new VersionedTransaction(messageV0);
      verTx.sign([keypair]);
      const txid = await connection.sendTransaction(verTx);
      setTxid(txid);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          APU Solana Hands-on
        </p>
        <div className="flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <UnifiedWalletButton />
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-center w-full max-w-2xl">
        <div>
          <p className="font-semibold">Your Keypair</p>
          <p>PublicKey: {keypair?.publicKey?.toString()}</p>
          <div className="mt-4">
            <button
              type="button"
              onClick={generateKeypair}
              className="text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white"
            >
              Generate Keypair
            </button>
          </div>
        </div>

        <div className="border-b my-4 border-b-black/10" />

        <div className="mt-6">
          <p className="font-semibold">Airdop</p>
          <div className="mt-4">
            {airdropping ? (
              <button
                type="button"
                disabled
                className="cursor-not-allowed opacity-50 text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white"
              >
                Airdropping...
              </button>
            ) : (
              <button
                type="button"
                onClick={onClickAirdrop}
                className="text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white"
              >
                Click to Airdrop
              </button>
            )}
          </div>
        </div>

        <div className="border-b my-4 border-b-black/10" />

        <div className="mt-6">
          <p className="font-semibold">Balance</p>
          <div className="mt-4">{balance} SOL</div>
        </div>

        <div className="border-b my-4 border-b-black/10" />

        <div className="mt-6">
          <p className="font-semibold">Current block</p>
          <div className="mt-4">{currentBlock}</div>
        </div>

        <div className="border-b my-4 border-b-black/10" />

        <div className="mt-6">
          <p className="font-semibold">Transfer SOL</p>
          <div className="mt-4">
            Recipient:{" "}
            <input
              value={recipient}
              className="rounded-lg border border-black/10 px-2 py-1 w-[480px]"
              onChange={(e) => {
                setRecipient(e.target.value);
              }}
            />
          </div>
          <div className="mt-4">
            Amount to transfer:{" "}
            <input
              className="rounded-lg border border-black/10 px-2 py-1"
              value={amountToTransfer}
              onChange={(e) => {
                setAmountToTransfer(e.target.valueAsNumber);
              }}
              type="number"
            />
          </div>

          {isSending ? (
            <button
              type="button"
              disabled
              className="text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white mt-4 cursor-not-allowed opacity-50"
            >
              Sending...
            </button>
          ) : (
            <button
              type="button"
              onClick={onClickTransfer}
              className="text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white mt-4"
            >
              Transfer
            </button>
          )}
        </div>

        <div className="border-b my-4 border-b-black/10" />

        <div className="mt-6">
          <p className="font-semibold">Transaction ID:</p>
          <div className="mt-4 text-xs">{txid}</div>

          <div className="flex mt-4">
            {txid ? (
              <a
                href={`https://explorer.solana.com/tx/${txid}?cluster=devnet`}
                target="_blank"
                className="text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white"
              >
                Open Explorer
              </a>
            ) : null}
          </div>
        </div>

        <div className="border-b my-4 border-b-black/10" />
      </div>

      <div className="fixed bottom-20 flex w-full justify-end">
        <a
          href="https://github.com/dicksonpys/apu-solana-hands-on"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Github
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width={200}
              height={200}
              src={"/apu-solana-hands-on.png"}
              alt="Github Link to APU Solana Hands On"
            />
          </p>
        </a>
      </div>
    </main>
  );
}
