import { Keypair, Connection } from "@solana/web3.js";
import React, { useEffect, useState } from "react";

const Exercise3GettingBalance: React.FC<{
  keypair: Keypair | null;
  connection: Connection;
}> = ({ keypair, connection }) => {
  const [balance, setBalance] = useState<string>("0");
  useEffect(() => {
    const fetchSOLBalance = async () => {
      if (!keypair?.publicKey) return;

      try {
        const solBalance = await connection.getBalance(keypair.publicKey);
        setBalance((solBalance / 10 ** 9).toFixed(9));
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

  return (
    <div className="mt-6">
      <p className="font-semibold">Balance</p>
      <div className="mt-4">{balance} SOL</div>
    </div>
  );
};

export default Exercise3GettingBalance;
