import { Connection, PublicKey } from '@solana/web3.js'

interface GetBalanceResult {
  amount: Number
}

export const task = 'Your task is to implement getBalance()'

export const getBalance = async (
  connection: Connection,
  publicKey: PublicKey
): Promise<GetBalanceResult> => {
  // TODO: Implement this function

  return {
    // TODO: Return the balance of the publicKey
    amount: 0,
  }
}
