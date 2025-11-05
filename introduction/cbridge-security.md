# cBridge Security

We’ve seen time and again news headlines about how different cross-chain bridges have been compromised and hacked, so it is important for our community, users, and developers to have a clear understanding of the security models of the Celer Inter-chain Message Framework (Celer IM). Different from existing interoperability solutions, Celer has **two** different security models, an **optimistic-rollup** inspired model and a **L1-PoS-blockchain security model**. Each of these comes with different delay and security assumptions tradeoffs that developers and users can freely choose from or set. The security model is highly flexible and even for a single application, developers can choose to build a hybrid model based on the “value” or “significance” of every cross-chain message.

In fact, Celer cBridge, an asset bridge built on top of Celer IM, supports a hybrid model so that the various tradeoffs can be dynamically chosen by the connecting chain based on the cross-chain transfer amount, token and source/destination chain.&#x20;

### Quick Recap of How Celer Inter-chain Message Works

![](https://lh5.googleusercontent.com/UsGqbTHTevWwdIAl0wEhJoH4cCbj-5AXQLXj2SfA4MfH54j4si5F80x91ltZ23eDJl0SF9vCRMVa5RH0Vv05dGk8IAJlJdlOvzkzB1zWnbua7xp9b5Kh_me5HO-APUJ_2zrVx_s)

Celer Network consists of smart contracts that are deployed on each chain. These contracts are all monitored and operated by the State Guardian Network (SGN), which serves as the “cross-chain message router”. The SGN is implemented as a **Cosmos-based blockchain with $CELR PoS staking from a set of distributed validators**. To send a message, bridge an asset, or invoke smart contract calls cross-chain, a user or a dApp will first send their intention as a message with a structured header and binary payload to a Message Bus smart contract on the source chain. Then the validators in the State Guardian Network blockchain, will monitor these events containing messages and first reach a consensus on the existence of such a message through the **Cosmos consensus protocol** and concurrently generate a stake-weighed multi-signature attestation. This attestation is then relayed to the destination via an Executor subscribing to the message. On the destination chain, the same Message Bus contract exists to check the validity of the message and triggers the corresponding logic associated with the message **either immediately or after an Optimistic-rollup-style timeout**. For a more detailed explanation with a step-by-step example walkthrough, please refer to this [Celer IM documentation](https://im-docs.celer.network/developer/end-to-end-flow) and the [Celer IM introduction blog](https://blog.celer.network/2022/01/12/celer-inter-chain-message-framework-the-paradigm-shift-for-building-and-using-multi-blockchain-dapps/).&#x20;

### Blockchain-level Security Powered by Cosmos Consensus

![](https://lh4.googleusercontent.com/o0IU2x-rEb43FmkUQe-KIczbb14Aag2YkKM9t8xz2PQTR_ivJ6ILpOJFdLhrkTQNHaNb-fgyY1FbfKKW13oqaVb3dyfSwyjksRa1fi10_wnD1G-ZGafj3VGlfyPjkqdTaFCXau0)

By default, inter-chain dApps rely on the security of the State Guardian Network (**a Cosmos Chain**) to process messages routed from another chain without delay. The SGN offers L1-blockchain level security just like Cosmos or Polygon with it being a Proof-of-Stake (PoS) blockchain built on Tendermint with CELR as the staking asset. If one minority guardian acts maliciously, its staked CELR will be slashed by the consensus protocol and the offending guardian will be evicted from the validator group. There are also block rewards, to act as economic incentives, when the participating guardians follow the protocol.

This level of economic security grows with the staked CELR’s value and is simply not available in simple Multi-signature or MPC/PoA-based solutions. In MPC/PoA-based solutions, there is really no economic recourse or punishment built into the protocol for validators that act maliciously.

This security model is the most “lightweight” option, because it offers the best user experience with the lowest level of latency and cost to the users. There are numerous PoS blockchains using the exact same consensus protocol that the Celer SGN uses and are securing hundreds of billions in assets. Therefore, in most cases, this default security model is recommended.&#x20;

### Optimistic-rollup-style Security Model

![](https://lh3.googleusercontent.com/nK0IMUwuzl-LqrzAe0eaW1bVSm68TzX-i1HkkSTwYrp3GGPFz867vG0DbIL_IsXwtdrgWKtUc3beAXfSgykR-v6Z_h-mghrnVmJdHVHykgYAJtfddjsac8cRxC-755aOQYYFoYQ)

So, what happens if more than two thirds (in staked value) of the validators behave maliciously in the State Guardian Network? Although this is highly unlikely given the economical security and distributed nature of the validators in Celer Network, Celer does have a second security model, inspired by the **Optimistic Rollup design,** that works securely even under this worst-case scenario.&#x20;

Instead of instantly processing a message routed by the SGN, a two-phase commit-confirm pattern is used to process any inter-chain message. Before any application consumes the message, the message has to be “committed” to the blockchain by SGN into a “quarantine zone” for a period of time. Only after the delay has passed, can this message be “confirmed” and pushed to the final destination application.&#x20;

During this delay buffer, a dApp can run an App Guardian service to double-validate the message on the source chain and check the authenticity of the message committed in the quarantine zone. If the App Guardian detects any inconsistency, it can prevent the message from being processed before the time buffer expires. For application developers who cannot run an App Guardian themselves, they can commission the SGN nodes to undertake the task of an App Guardian. In that case, the security model is strengthened to a **trust-any** model for the SGN. Therefore, even under the worst-case scenario of the SGN consensus failure, inter-chain dApps built on top of Celer’s construct will still maintain safety property without any concern.

### Hybrid Model is Available&#x20;

dApp developers and blockchains can choose to mix-match the above two models based on the “value” or “significance” of certain transactions. In fact, Celer [cBridge](http://cbridge.celer.network/), built on top of Celer IM, already has this hybrid model built-in [based on the amount of transfer](https://github.com/celer-network/sgn-v2-contracts/blob/main/contracts/safeguard/DelayedTransfer.sol). We will also release sample applications where developers can trigger Celer IM in the optimistic-rollup-style security model based on different message types.&#x20;

### Other Considerations on Implementation

Except for the above architecture design to fundamentally enhance security, it is also very important to have implementation and operational best practices to ensure a safe operation of the asset bridge. These considerations includes 24\*7 automated system invariant monitoring, rate limiting on bridging volume and more.&#x20;

### Smart contract audits

Celer cBridge has been extensively audited.&#x20;

Open-source code: [https://github.com/celer-network/sgn-v2-contracts/](https://github.com/celer-network/sgn-v2-contracts/)

CertiK reports: [liquidity bridge](https://github.com/celer-network/sgn-v2-contracts/blob/main/audit/CertiK_general.pdf)

PeckShield Report: [liquidity bridge](https://github.com/celer-network/sgn-v2-contracts/blob/main/audit/PeckShield_general.pdf), [canonical bridge](https://github.com/celer-network/sgn-v2-contracts/blob/main/audit/PeckShield_pegged.pdf)

SlowMist Report: [liquidity bridge](https://github.com/celer-network/sgn-v2-contracts/blob/main/audit/SlowMist_general.pdf), [canonical bridge](https://github.com/celer-network/sgn-v2-contracts/blob/main/audit/SlowMist_pegged.pdf)

### $2M Bug Bounty

In addition to the security audits, Celer cBridge has a standing [$2M bug bounty in ImmuneF](https://immunefi.com/bounty/celer/)i.&#x20;
