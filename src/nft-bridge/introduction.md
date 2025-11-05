# Introduction

Besides asset bridging, cBridge also supports the cross-chain transfer of NFTs by leveraging [Celer IM framework](https://im-docs.celer.network/developer/celer-im-overview). Specifically, cBridge supports the two types of NFT bridges: pegged NFT bridge and multi-chain native (MCN) NFT bridge. In the following sections, we describe how each bridge mode works.

## Pegged NFT Bridge

Pegged NFT Bridge. This applies to existing NFTs that have an origin chain. The bridge works by creating a "copy" of the original NFT that is pegged to the original NFT. In particular, the bridge process follows the "lock-and-mint", "burn-and-release", and "burn-and-mint" patterns.&#x20;

* **Lock-and-Mint**. When an NFT is transferred from the origin chain to a remote chain, the original NFT is first locked in the smart contract on the origin chain. Then a pegged NFT is minted on the remote chain.
* **Burn-and-Release**. When an NFT is transferred from the remote chain to the origin chain, the pegged NFT is first burned on the remote chain. Then the original NFT is released on the origin chain.
* **Burn-and-Mint**. When an NFT is transferred from remote chain A to another remote chain B, the pegged NFT is first burned on the remote chain A. Then a new pegged NFT is minted on the remote chain B. This new pegged NFT may be further transferred back to the origin chain and release the original NFT.

## Multi-Chain Native (MCN) NFT Bridge

Different from the pegged bridge mode, an MCN NFT does not have the notion of “origin chain” or "original NFT". When transferring an MCN NFT from chain A to chain B, the only pattern is "Burn-and-Mint" where the NFT is burned on chain A and then minted on chain B, so that there is always one NFT across all chains. By comparison, the pegged NFT bridge always has an original NFT and a pegged NFT.

It should be noted that the MCN NFT bridge only applies to newly deployed NFT tokens that follow [this template](https://github.com/celer-network/nft-bridge-contracts/blob/main/contracts/MCNNFT.sol). You can follow [this Github repo](https://github.com/celer-network/nft-bridge-contracts) to deploy your own MCN NFT contract. Note that the cross-chain function is built into the MCN NFT token contract so that the NFT can be transferred across chains even without an frontend. To transfer an MCN NFT across chains, simply call the **`crossChain`** function with the token ID, your destination chain ID and the receiver address. Note that the **`crossChain`** function is a payable function and some native gas tokens need to be enclosed with the function call. The payable value is used to cover [the fees of NFT bridging](nft-bridge-fee.md) and can be queried from the **`totalFee`** function in the MCN NFT contract.
