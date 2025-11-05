# NFT Bridge Fee

The NFT bridge fee is charged in the native gas token when making the bridging function call. The NFT bridge fee includes two parts:

* **Base Fee**: used to cover the gas cost for minting the NFT on the destination chain.
* **Msg Passing Fee**: paid to Celer IM framework for relaying the msg across chains. The fee is proportional to the msg size sent across chains. For NFT bridges, the msg size depends on the NFT token address, the token ID and the token URI length. The msg passing fee is usually tiny for NFT bridges.
