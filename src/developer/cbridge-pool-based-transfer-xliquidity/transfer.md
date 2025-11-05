# Transfer

To accomplished user's transfer, FE(front-end) needs to do the following things:

1. Get basic transfer configs to get correct user' input for assets transfer
2. After collecting all needed information, always get updated estimation for the transfer.
3. Check user's on-chain token allowance for cBridge contract. If the allowance is not enough for user token transfer, trigger the corresponding on-chain approve flow
4. Submit on-chain transfer request to cBridge contract on source chain
5. Get transfer status repeatedly to check whether the transfer is complete.
