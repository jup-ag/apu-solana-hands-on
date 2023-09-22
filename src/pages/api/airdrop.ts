// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DEVNET_URL } from '@/constants'
import { Connection, PublicKey } from '@solana/web3.js'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  txid: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let body = JSON.parse(req.body)

  try {
    const txid = await new Connection(DEVNET_URL).requestAirdrop(
      new PublicKey(body.publicKey),
      body.lamports
    )

    res.status(200).json({ txid })
  } catch (e: any) {
    // request airdrop have issue and throwing type error even though it's success
    res.status(200).json({ txid: e.value.result })
  }
}
