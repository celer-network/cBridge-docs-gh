# FAQ

{% hint style="info" %}
Didn't find an answer? Join the [community Discord](https://discord.gg/Trhab5w) or [Telegram](https://t.me/celernetwork) to get support.
{% endhint %}

### Bridge Fee

#### How is the bridge fee calculated?

Celer cBridge offers two bridging models, xAsset and xLiquidity, with their respective fee models.

For xAsset (a canonical mapping bridge), _**Bridge Fee =  Base Fee + Protocol Fee**_, where **Protocol Fee** ranges from 0% to 2%.

For xLiquidity (a pool-based bridge), _**Bridge Fee = Base Fee + Protocol Fee**_**,** where **Protocol Fee** ranges from 0% to 2%. The protocol fee percentage depends on the source chain, destination chain and the token amount transferred. Note that the protocol fee percentage may be higher if the transfer results in pool liquidity imbalance.

The **Base Fee** is paid in the form of the tokens being transferred, and covers the destination-chain gas cost for sending the tokens to the user.\
\
For more details of xAsset and xLiquidity, please check: [https://cbridge-docs.celer.network/introduction/fungible-token-bridging-models](https://cbridge-docs.celer.network/introduction/fungible-token-bridging-models)

### Bridge Rate

#### **How is the bridge rate calculated?**

Celer cBridge offers two bridging models, xAsset and xLiquidity, with their respective Bridge Rate models.

For xAsset (a canonical mapping bridge), the bridge rate is always 1 as the tokens minted on the destination chain are pegged to the tokens locked on the source chain.

For xLiquidity (a pool-based bridge), in most cases, the bridge employs a [StableSwap AMM curve](https://curve.fi/files/stableswap-paper.pdf) to calculate the bridge rate which makes sure the bridge rate is always close to or at 1 unless there is significant liquidity imbalance between the two pools. A transfer rebalancing two pools can benefit from the StableSwap AMM curve and result in more tokens after bridging.\
\
For some bridge pairs, the StableSwap AMM curve is not used and the bridge rate is set to be a fixed 1:1.\
\
For more details of xAsset and xLiquidity, please check: [https://cbridge-docs.celer.network/introduction/fungible-token-bridging-models](https://cbridge-docs.celer.network/introduction/fungible-token-bridging-models)

### Contract Addresses

#### Where can I find the contract addresses used in cBridge?

Please refer to [this page](https://cbridge-docs.celer.network/reference/contract-addresses#contract-address) for the list of contract addresses used in cBridge.

#### What are the token addresses on different chains?

Please refer to [this page](https://cbridge-analytics.celer.network/assets) for the list of token addresses on different chains.

### User Operations

#### **How long does it take to complete a cross-chain transfer?**

Most of the cross-chain transfers take 5-20 minutes to complete. There are rate limit measures in place to mitigate security risks on cBridge, and transfers larger than a certain amount will need additional time to go through.

#### My cross-chain transfer has been stuck for more than 30 minutes. What should I do?

If your transfer is stuck in the “Submitting” status, please check if your transfer has been confirmed on the source chain. If the transfer is not yet confirmed on the source chain, you can speed up the transfer by increasing your gas price; otherwise, feel free to contact [customer support](https://form.typeform.com/to/Q4LMjUaK?typeform-source=cbridge.celer.network), be sure to have your transaction hash on the source chain available.

If your transfer is stuck in the “Waiting for SGN confirmation” or “Waiting for fund release” status, please wait for at least two additional hours since cBridge uses rate limits to mitigate security risks and it may take some time to clear the backlog when the traffic is heavy. If your transfer has been stuck for more than 3 hours, feel free to contact [customer support](https://form.typeform.com/to/Q4LMjUaK?typeform-source=cbridge.celer.network) along with your transaction hash on the source chain.

#### My transfer shows “Completed” status but I didn’t see it in Metamask. What should I do?

This occurs because the token hasn’t been added to your Metamask wallet on the destination chain. Please click the Metamask icon on the transfer history item and you will be guided to add the token to Metamask.

![](https://get.celer.app/cbridge-v2-img/history-faq.jpg)

### LP Operations

#### Is there any risk involved with providing liquidity on cBridge?

Providing liquidity on cBridge is not risk-free. Your liquidity may lose value if there is a significant liquidity imbalance between chains. This is similar to **Impermanent Loss** in AMMs.

* For example, suppose an LP provides 50,000 USDT on Ethereum as liquidity. A user tries to make a cross-chain transfer of 10,000 USDT from BNB Chain to Ethereum. At the time of this transfer, the total USDT liquidity on BNB Chain is significantly lower than that on Ethereum, and thus the bridge rate for a USDT BNB Chain -> Ethereum transfer is 1.001:1. If the LP’s liquidity is used to bridge this entire transfer, the LP will receive 10,000 USDT on BNB Chain but will send out 10,010 USDT on Ethereum to the user. As a result, an impermanent loss of 10 USDT is incurred to the LP. In the long term, the impermanent loss may be recovered as users make transfers of reverse directions.

In most cases, the bridge rate is close to 1 under the [StableSwap AMM curve](https://curve.fi/files/stableswap-paper.pdf) and the deviation of pricing is almost always smaller than the fee charged so the impermanent loss only happens when there is an extreme liquidity imbalance between chains.

#### **Why is my liquidity distribution on each chain different from when I initially supplied liquidity**?

When you supply liquidity on cBridge, your liquidity may be moved around to different chains as users make cross-chain transfers with your liquidity. For example, if you initially provided 10,000 USDT on BNB Chain, and a user makes a cross-chain transfer of 2000 USDT from Polygon to BNB Chain using your liquidity, then your liquidity distribution becomes 8,000 USDT on BNB Chain and 2,000 USDT on Polygon.

#### **How is the LP Fee Earning APY calculated**?

The LP Fee Earning APY is estimated as:

$$
fee\_APY=\Big(1+\frac{last\_24\_ hr\_fee}{total\_liquidity}\Big)^{365}-1
$$

The displayed LP Fee Earning APY is a 7-day median given the above formula.

&#x20;

### Liquidity Mining

#### **How can I enroll in liquidity mining**?

On the “Liquidity” page, you will see a green “Farming” mark if there is an active liquidity mining session for a token pool on a specific chain. Your liquidity in that token pool will be automatically enrolled in the liquidity mining session and yield farming rewards with no manual staking required.

![](https://get.celer.app/cbridge-v2-img/farming-faq.jpg)

**Please Note:** Your liquidity may be moved around to different chains as users make cross-chain transfers with your liquidity. As a result, your enrolled liquidity in each mining session might change as well. For example, suppose there are two mining sessions, one for the USDT pool on BNB Chain, with an APY of 50%; the other is for the USDT pool on Polygon, with an APY of 30%. Initially, you added 1,000 USDT liquidity to BNB Chain targeting the 50% APY.

Later, as users conduct cross-chain transfers, your liquidity distribution becomes 600 USDT on BNB Chain and 400 USDT on Polygon. In this case, the 600 USDT will automatically enroll in the 50% APY mining session and 400 USDT will enroll in the 30% APY mining session. A strategy for LPs to maximize their farming yield is to rebalance the liquidity across different chains themselves.



### The SGN & CELR token

#### **What is the SGN? How is the SGN related to cBridge v2**?

The Celer State Guardian Network (SGN) has been an essential part of Celer Network’s architecture. The SGN is a specialized Proof-of-Stake (PoS) chain that serves the purposes of monitoring L1 transactions related to L2 state and faithfully passing layer-2 information back to layer-1 when needed.

In cBridge, the SGN serves multiple roles:

1. The SGN serves as a shared liquidity pool manager that provides PoS-level security and decentralized governance for cBridge.
2. The SGN serves as a cBridge node gateway that oversees cBridge node selection and scheduling.
3. The SGN serves as a cBridge node Service Level Agreement (SLA) arbitrator that guarantees the Quality of Service of cBridge nodes.

For additional details about the SGN and cBridge, please refer to this architecture introduction and its child pages.

#### **Where can I stake CELR tokens**?

CELR holders can stake their tokens into the State Guardian Network (https://sgn.celer.network/) by becoming a validator and actively provide services for Celer Network products (e.g., Celer Inter-chain Messaging Framework, Celer cBridge, Layer2.Finance), or through delegation.

CELR stakers in the SGN can receive staking rewards and fee rewards from cBridge and other Celer products for their active block-producing services and the crypto-economic security that they provide.

#### How is the value of cBridge captured?

Unlike many other protocol tokens where holders do not take on active duty of the protocol’s daily functions, CELR token stakers and validators are indispensable in the smooth operation of cBridge via the SGN’s new extension.

Specifically, users and LPs in cBridge are required to pay fees to the SGN in return for its services, which are similar to fees paid for validators on any other PoS blockchain. These fees are distributed to the CELR stakers of the SGN nodes that generate a block.

There are also a number of system parameters and configurations that require governance-based updates and tuning to ensure the smooth and continuous operation of the system. CELR will also be acting as a governance token for this new component in Celer’s ecosystem.

#### **What is the difference between validator and delegator in the SGN**?

Validators need to run a full node in the SGN (a Proof-of-Stake chain) while delegators do not. A delegator can stake their CELR tokens with a validator to earn staking rewards. In return, the validator will take a portion of the delegator’s staking rewards as a commission.

#### **What is the commission rate in the SGN**?

When a delegator stakes their CELR with a validator, a portion of the yielded staking rewards will be taken by the validator as a commission. For example, if the commission rate of a validator is 15% and you have delegated 10,000 CELR with this validator, 15% of the total staking rewards yielded by your 10,000 CELR will be taken by the validator as incentives, resulting in a remaining 85% of your staking rewards that you can claim.

**How are cBridge fee earnings split in the xLiquidity model between the SGN and cBridge LPs?**

In our xLiquidity (the pool-based bridge model), 50% of the fee earnings go to SGN delegators and stakers, and the other 50% goes to cBridge LPs whose liquidity is used in the cross-chain transfers that generate the earnings.

### New Chains and New Tokens

#### How does cBridge add new tokens?&#x20;

You can add any token by implementing a simple token bridge with Celer Inter-chain Message framework. Or you can propose to add your token to Celer cBridge through the governance process by submitting proposals here:&#x20;

* [Fungible token listing proposal](https://form.typeform.com/to/RWC0Ihge?typeform-source=linktr.ee)
* [NFT token listing proposal](https://form.typeform.com/to/r8dLWXcH)
* [Celer Network forum](https://forum.celer.network/)

#### How does cBridge add new chains?

New chains are added when the required smart contracts of Celer Network and cBridge are deployed and a governance proposal is passed by a validator quorum to support this new chain.&#x20;

#### How cBridge handles a major chain upgrade?

When an already supported chain go through any major consensus upgrade, Celer validators will execute Major Chain Upgrade Procedure by pausing cBridge functionality on all chains during such upgrade that has exposure to this chain's liquidity and asset.&#x20;
