# Architectural Benefits

A quick summary of improvements and additions brought by 2.0 architecture.

For users

* **Deep liquidity**: supports much larger transfer sizes.&#x20;
* **Simpler to use**: offer an option to reduce two-step operations to a single click.
* **Native gas token unwrapping**: e.g. transfer WETH from BSC to unwrapped ETH on Arbitrum.&#x20;
* **Extend to even more tokens and chains**
* **Insured bridge node Service Level**: did you initiate a transfer but the bridge node was not available? Slash cBridge node’s bond to cover your opportunity cost!&#x20;

For LPs and cBridge node operators

* **LPs don’t have to run a cBridge node**: in cBridge 1.0, the only way to provide liquidity is to run a cBridge node. In 2.0, we added a second mode where the SGN itself acts as a “cBridge node.” For LPs satisfied with PoS-consensus-level security based on CELR token economics in the SGN, they can directly delegate liquidity to the network without operating a node themselves.&#x20;
* **Simple Liquidity Provider (LP) experience**: No minting synthetic tokens, no volatile token pair AMM pool, no high impermanent loss, no complicated rebalancing. Simply add liquidity to the chain of your choice and start to earn fees!&#x20;
* **High liquidity efficiency:** No double liquidity locking, fully utilize liquidity with the highest yield.
* **Incentivized liquidity rebalance**: lopsided liquidity movement? No worries! An AMM-style bonding curve and a flexible liquidity mining mechanism are in place to incentivize LPs and arbitrageurs to rebalance liquidity cross-chain.&#x20;
* **High Quality-of-Service node scheduling:** For LPs operating self-custodial cBridge nodes, the SGN becomes the decentralized layer to allocate user transfer requests to different LPs through policies that incentivize high-quality service and competitive pricing.

Fo staker and validators participating in State Guardian Network

* **Value capture:** In return for their active services and roles in supporting cBridge 2.0, PoS stakers and validators in the SGN directly capture the value of cBridge via fees paid to the block producer facilitating user’s bridging request. This is very much like fee being paid for any PoS blockchain validators.
* **Governance:** Various system parameters including pricing curve, fee percentage, and more are governed through a decentralized governance process built in the active service SGN.

For developers:

* **White-label frontend SDK**: Allows multi-chain dApp to have a built-in cross-chain experience.
* **Cross-chain messaging for NFT and more**: Allows developers to build applications beyond simple cross-chain asset transfers, including cross-chain DEX and NFT cross-chain minting.&#x20;

So, how do we achieve all of these cool improvements and innovations? What bridging design tradeoff space do we cover in the 2.0 architecture? At a high level, how exactly do all of these things work?&#x20;

Answer: **The State Guardian Network (SGN).**
