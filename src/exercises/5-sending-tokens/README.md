# Create and Send Transaction

## Why?

- To write data to the blockchain
- Example: send Solana to someone else, sending NFT, interact with Solana apps.

## Function
`SystemProgram.transfer({ fromPubkey: PublicKey; lamports: number | bigint; toPubkey: PublicKey; })` is used to craft a transaction.

`Connection.sendTransaction(transaction, signers)` is used to send transaction


## Ref
https://solana-labs.github.io/solana-web3.js/classes/Connection.html#sendTransaction

https://solana-labs.github.io/solana-web3.js/classes/SystemProgram.html