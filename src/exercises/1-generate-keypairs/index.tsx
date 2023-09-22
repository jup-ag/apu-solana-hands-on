import { Keypair } from "@solana/web3.js";
import { Dispatch, SetStateAction } from "react";

const Exercise1GenerateKeypairs: React.FC<{
  keypair: Keypair | null;
  setKeypair: Dispatch<SetStateAction<Keypair | null>>;
}> = ({ keypair, setKeypair }) => {
  const generateKeypair = () => {
    const newKP = Keypair.generate();
    setKeypair(newKP);
  };

  return (
    <div className="max-w-full ">
      <p className="font-semibold">Your Keypair</p>
      <p style={{ wordBreak: 'break-all' }}>PublicKey: {keypair?.publicKey?.toString()}</p>
      <div className="mt-4">
        <button
          type="button"
          onClick={generateKeypair}
          className="text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white"
        >
          Generate Keypair
        </button>
      </div>

      {keypair?.publicKey?.toString() ? (
        <div className="flex mt-4">
          <a
            href={`https://explorer.solana.com/address/${keypair?.publicKey?.toString()}?cluster=devnet`}
            target="_blank"
            className="text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white"
          >
            Open Explorer
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default Exercise1GenerateKeypairs;
