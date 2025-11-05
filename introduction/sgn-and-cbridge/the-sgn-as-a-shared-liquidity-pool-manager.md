# The SGN as a Shared Liquidity Pool Manager

\


![](https://lh5.googleusercontent.com/JF9gj9sNjs_BHYAX6npV9K3OJo-R4xu1LWAymN9fzYcY7Xx5Y-tnVMU34CSP1s4a2xS2jw7DQRD_8uYSVTj142fSKGlezzk3uKpscd4cYNVoP8_TDMXTJd_RybVtyS0VrnCAAg_j=s0)

### **Provide liquidity without running a cBridge node**

The above improvements are designed more for self-custodial LPs who are capable of running their own cBridge nodes. However, we recognize that there are a large number of LPs and users who want to provide liquidity without running a cBridge node themselves and are satisfied with the security level provided by the SGN’s PoS consensus with CELR staking. In addition, through a shared liquidity pool model, the entire network liquidity can be easily bootstrapped to facilitate a much better user experience much faster. &#x20;

So in cBridge 2.0, we are introducing an entirely new model of operation where the SGN manages shared liquidity pool contracts on multiple chains. This effectively treats the SGN and its managed liquidity pool as a single “node” along with all the other non-custodial LP-managed nodes and gives an option to the LPs to delegate liquidity easily without the hassle of running a node.&#x20;

So, without any ambiguity, what security level does this model offer?

### **PoS-level security and decentralized governance**

In cBridge 2.0, shared liquidity pool contracts are managed through the SGN’s PoS consensus. CELR staking weighted multi-signatures are needed to move funds in the pool contracts and malicious or faulty nodes will be slashed out of their staking token. It is only when nodes with more than ⅔ of the total stake are malicious, that the fund pool will be at risk. We want to stress that as the number of cBridge transactions grows and the total value captured by the network grows, it will be a naturally increasing economic deterrent for any node to try to behave maliciously.&#x20;

The validator governance model in the SGN is open and decentralized: the SGN allows new validators to be elected and join the validator set through the staking governance process without any special coordination processes.&#x20;

### **Simple Liquidity Provider (LP) experience and high liquidity efficiency**

So how do LPs manage their liquidity in this model? Existing solutions require LPs to put canonical token liquidity along with another protocol-controlled settlement token in on-chain AMM pools. But this model has a few drawbacks:

* Some models require LPs to use a highly volatile settlement token and therefore inherently expose LPs to a significant impermanent loss.&#x20;
* Even in the case of minting synthetic tokens through canonical liquidity tokens, LPs still suffer from complicated operational overhead when adding, removing, and rebalancing liquidity across multiple chains.&#x20;
* In the case where “bonder” liquidity is required, the liquidity efficiency is lower because the liquidity requirement for any transfer is double what’s necessary.&#x20;

cBridge 2.0 provides a simple LP experience and high liquidity efficiency through a new design to solve the “liquidity attribution problem.” To understand our system design, we will first explain what “liquidity attribution” means. In any multi-chain bridging system, when a user sends funds from a source chain to a destination chain, LP(s) (or aggregated pools) essentially pay funds to the user on the destination chain while receiving funds from the user on the source chain. Now, let’s say there is an LP providing liquidity to the system on chain A. When a user sends funds from chain B to chain A,  the LP’s liquidity essentially is “redistributed”: their liquidity on chain A is reduced and their liquidity on chain B is increased. The liquidity attribution problem is defined as “how does the system allow every LP to know where all of their liquidity is?” and hence how to effectively manage the liquidity to optimize for transaction fee yield.&#x20;

An AMM pool-based solution tracks LPs liquidity implicitly via the distribution of settlement tokens and canonical tokens in the AMM pool. The bridging fabric (e.g. TSS validators or L2-to-L1 messaging protocols) only manages the minting and burning of the settlement tokens cross-chain. The user will always need to pay for an AMM swap from the settlement token to the canonical token on the destination chain; sometimes even on the source chain as well. When a lopsided liquidity movement happens in the network, it makes sense to move liquidity from the liquidity-abundant chain to the liquidity-scarce chain to arbitrage the slippage. Arbitragers will have an incentive to rebalance the liquidity by sending funds from the liquidity-scarce chain to the liquidity-abundant chain.&#x20;

Active LPs have stronger incentives due to that they don’t need to pay additional bridging fees to harvest the arbitrage gain. However, the rebalancing process for LP is quite complicated. As an example, if we denote the liquidity-scarce chain as S and liquidity-abundant chain as A, an LP would need to take the following steps:

* Remove liquidity from the AMM pool in S.&#x20;
* Move the settlement token from S to A.&#x20;
* Sell the settlement token to the canonical token on A at a premium&#x20;
* Move the canonical token back to S.&#x20;
* Purchase the settlement token on S.&#x20;
* Add liquidity back into the AMM pool on S.&#x20;

The above steps not only cause operational overhead but can also incur significant transaction and time costs. (e.g. in the case of the bonder model)&#x20;

In cBridge 2.0, we argue that the bridging fabric (in our case the SGN) is specialized and can be highly optimized to have fundamentally lower costs when compared to on-chain smart contract operations. Therefore, in the cBridge 2.0, every LP’s liquidity in the system is explicitly tracked. Adding liquidity is super simple: just one transaction to add the canonical token into the liquidity pool contract and the SGN will record each LP’s liquidity amount in the SGN’s chain state. In essence, the SGN maintains a table of (chain\_id, LP\_address, token\_type, balance) in its chain states.

When processing cross-chain transfer requests, the SGN will use the entire pool’s liquidity to calculate the slippage and pricing. (more on this in the next section) The SGN then treats LPs as “virtual cBridge nodes” and allocates the transfer request against the LP’s liquidity. A simplified conceptual understanding is that, for every transfer request, every destination chain’s LP’s balance is reduced proportionally to their available liquidity while their liquidity balance is increased on the source chain. Of course, various methods including random sampling and approximation algorithms are used to minimize state changes and hence costs, all while maintaining statistical fairness among LPs. More details are in our technical documentation.&#x20;

The same arbitrager-based rebalance incentives applies, but this design additionally gives LPs the utmost flexibility when managing their liquidity. Every LP can clearly see exactly how their liquidity is distributed at any given time. This allows them to be fully informed when choosing to remove or add liquidity to any chains. This significantly simplifies the liquidity rebalancing process from 6 steps to 3 steps with no AMM swap costs:

* The LP removes liquidity from A directly in canonical tokens. Due to system-wide pricing difference, with this first step, the LP locks in the arbitrage gain.
* The LP moves the canonical tokens from A to S.
* The LP adds the canonical tokens on pools in S.&#x20;

It is still possible for LPs to remove all liquidity from a single chain or any combination of specific chains. In cBridge 2.0, the way to do this is to trigger an internal cross-chain transfer and treat the LP as a user and transfer their liquidity to the desired chains and then remove the liquidity. Note that in this case, the LP will shoulder the system slippage for the cross-chain transfer. However, this is no different than directly swapping settlement tokens for the on-chain AMM-based solutions and in fact, has a lower cost.&#x20;

What’s more, as described in this model, LPs use canonical token liquidity directly and therefore do not suffer from high impermanent loss. Plus, it provides the highest level of liquidity efficiency without any additional bonder liquidity lockup requirement.

### **Cross-chain bridge pricing to incentive balanced liquidity**&#x20;

In a cross-chain bridging system, liquidity for the same canonical token exists on multiple chains. As the demand for the same canonical token shifts for different chains, the inherent pricing between the same token on different chains also dynamically changes. This is based on the underlying costs to use those native bridges to move across different chains and the supply-demand balance of liquidity on those different chains.&#x20;

It is very important for any bridging solution to be able to capture this inherent pricing shift with a properly designed bonding curve. This creates important incentives for LPs to leverage the “economies of scale” and rebalance liquidity across multiple chains to maintain a network with sufficient and balanced liquidity to process all of the user requests.&#x20;

Continuing with our design principle of having an “intelligent fabric,” we build a Curve-inspired bonding curve pricing mechanism inside the SGN. When a user transfers tokens from one chain to another, the SGN will calculate the received token based on the available liquidity on the source and destination chains. In addition to the slippage and pricing, a flat fee is deducted from the transaction as payment to LPs.&#x20;

Specifically, for any pair of chains, _i_ and _j_, let xiand xjbe the balance on-chain _i_ and chain _j_ for a given token, respectively. Then the following invariant should always hold true when we calculate the pricing and slippage of token transfers between chain _i_ and chain _j_:

![](https://lh6.googleusercontent.com/PZSvsIZNgCbONPVyJqWciygUrrO91Izd6vkumejI8W_4YWD0EKANPepv5CzdY5tWASsIuKzW6PwY7d94ArCTsiOV1vewv9YvOnIpcNY5oW69sCVqYhEJIFa8HisGAhJ7fCS9srs5=s0)

* _A_ is a per-chain-pair constant. For the same chain pair, _A_ is the same for all tokens.
* _D_ is a variable. The initial _D_ can be obtained by solving a cubic equation against _D_ given the initial liquidity on the two chains. After that, _D_ should be iteratively updated based on liquidity status.&#x20;
* wi and wj are the relative weights for the two chains, which is used to control the pricing asymmetry for the transfers. Note that the configuration of weights is per-chain-pair and should satisfy wi+wj=2.&#x20;

The reason we have these weight parameters in the bonding curve is to capture the inherent asymmetry of certain chains. For example, transferring into optimistic rollups, such as Arbitrum and Optimism, is much simpler and lower cost than the 7-day delay of transferring out. Therefore, we can control the weight in the bonding curve to reflect this inherent difference created by each and every chain.&#x20;

![](https://lh3.googleusercontent.com/ehrMx9687FkLS5vDsy5ysi0t7R3PoDJw3BgerGnDXkznZP84DZdkzOlwcHVQEVp_9zFlDBB10zj3MJYHOu3xS4M6l6FQmWIAfWrABx4EcfFCkMGroc5lI4Myq1enxyOFquuCKnBR=s0)

In the above red asymmetric curve with the blue symmetric reference line, we can see the curve creates more slippage for transfers from chain _i_ to chain _j_ when the imbalance happens. If wi=1, wj=1, it reduces to the Curve invariant.

It is also possible to treat an entire network of similar canonical liquidity as a single multi-variable bonding surface. More analysis is needed on the effects of these two different potential designs in terms of slippage effectiveness and cost of operation.&#x20;

### **General cross-chain messaging**&#x20;

cBridge 2.0 creates an intelligent cross-chain fabric based on the SGN. This fabric can do more than just cross-chain asset transfers. Under the asset bridging functionality is actually a general cross-chain messaging framework where the SGN monitors certain events on the source chain and posts a PoS consensus secured notarization on the destination chain.&#x20;

We will be gradually opening up this underlying functionality to developers as an SDK to build use cases for not only on-chain bridging, but for other use cases like cross-chain NFT, cross-chain DeFi aggregation, and more.&#x20;
