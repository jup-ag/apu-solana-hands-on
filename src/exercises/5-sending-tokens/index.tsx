import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import React, { useState } from "react";

const Exercise5SendingTokens: React.FC<{
  keypair: Keypair | null;
  connection: Connection;
}> = ({ keypair, connection }) => {
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
    <>
      <div className="mt-6">
        <p className="font-semibold">Transfer SOL</p>
        <div className="mt-4">
          Recipient:{" "}
          <input
            value={recipient}
            className="rounded-lg border border-black/10 px-2 py-1 w-full max-w-[480px]"
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
    </>
  );
};

export default Exercise5SendingTokens;
