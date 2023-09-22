import { Connection, PublicKey } from '@solana/web3.js'

export type GetTransactionsResult = Array<{ signature: string }>

export const task = 'Now you learn how to get signatures for your wallet.'

export const getTransactions = async (
  connection: Connection,
  publicKey: PublicKey
): Promise<GetTransactionsResult> => {
  const results = await connection.getSignaturesForAddress(publicKey)

  return results
}
