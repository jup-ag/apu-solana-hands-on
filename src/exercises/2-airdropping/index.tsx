import { Connection, Keypair } from "@solana/web3.js";
import React, { useState } from "react";

const Exercise2Airdropping: React.FC<{
  keypair: Keypair | null;
  connection: Connection;
}> = ({ keypair, connection }) => {
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

  return (
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
  );
};

export default Exercise2Airdropping;
