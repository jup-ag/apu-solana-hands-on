import { Connection } from "@solana/web3.js";
import React, { useEffect, useState } from "react";

const Exercise4ReadingRealtimeBlocks: React.FC<{
  connection: Connection;
}> = ({ connection }) => {
  const [currentBlock, setCurrentBlock] = useState<number>(0);

  useEffect(() => {
    /** Exercise 4: Use the websocket listener from the connection object to fetch the latest block */
    const id = connection.onRootChange(setCurrentBlock);
    return () => {
      connection.removeRootChangeListener(id);
    };
    /** End of exercise 4 */
  }, [connection]);

  return (
    <div className="mt-6">
      <p className="font-semibold">Current block</p>
      <div className="mt-4">{currentBlock}</div>
    </div>
  );
};

export default Exercise4ReadingRealtimeBlocks;

/** Answers
const id = connection.onRootChange(setCurrentBlock);
  return () => {
  connection.removeRootChangeListener(id);
};
*/
