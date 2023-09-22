# RPC through websocket

## Why?

- Get events realtime from Solana.
- Also using the Connection object, it establish a websocket connection to the RPC.

## Function
`Connection.onRootChange(callback)` is used to get slot changes from RPC.

`Connection.onSignature(signature, callback)` is used to understand the status of a transaction.

## Ref
https://solana-labs.github.io/solana-web3.js/classes/Connection.html#onRootChange

https://solana-labs.github.io/solana-web3.js/classes/Connection.html#onSignature
