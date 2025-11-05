# The SGN as a cBridge node gateway and Service Level Agreement (SLA) arbitrator

![](<../../.gitbook/assets/image (72).png>)

### **Design Choices and Limitations of 1.0**

In cBridge 1.0, when a cBridge node joins the network, it registers to a gateway service with various information such as fee schedule and liquidity status. This gateway will continuously monitor the status and performance of the cBridge node. When a user request is made, it is directed to the gateway. The gateway evaluates the registered nodes based on liquidity availability, historical bridging success rate, fee, and more. Then it suggests the most suitable bridge node for the request. In 1.0, we chose to use a centralized gateway to quickly learn operation experiences on various scheduling policies.&#x20;

Basically, what the 1.0 gateway provides to the user is really an “FYI” _suggestion_ to use certain cBridge nodes. Although cBridge 1.0 is built with non-custodial architecture and users NEVER need to put trust in nodes for their fund’s security, there is indeed a user experience issue related to node availability. As an example, if after a user sends a conditional transfer to a node but the node goes offline before the two-step HTLC transfer is complete, they will have to wait until the conditional transfer times out, without any penalty to or compensation from this offline cBridge node.

We solve both of these limitations in 2.0 via the SGN.&#x20;

### **Decentralized bridge node scheduling via the SGN**

In 2.0, we first decentralized all of the gateway logic by migrating it as a service on top of the SGN. Instead of registering with a centralized gateway service, cBridge nodes will register with the SGN with their fee preference, availability of liquidity, and more.&#x20;

When a user request is made, this is the “happy” system flow:

* The user queries the current state of the SGN to get an estimated transaction fee and liquidity availability.&#x20;
* If the estimation is acceptable, the user sends the first half of the HTLC transfer with max fee tolerance specified.
* The SGN monitors and picks up the transaction. It assigns one or more registered cBridge nodes to the transaction based on node selection rules. This transaction assignment is written on the SGN chain and also marked on the user’s HTLC transfer.&#x20;
* The assigned node picks up the assignment and responds by completing the rest of the conditional transfer.
* The SGN continues to monitor and track the transaction and once the transaction is successfully completed, the state related to this transaction is purged from the SGN chain.

This allows for a much more scalable cBridge node onboarding process with a consensus-based and unbiased node selection process. But we didn’t stop there.

### **Bridge node SLA bond and slashing mechanism**&#x20;

As opposed to 1.0’s gateway, the SGN-as-a-gateway architecture monitors the whole process of the cross-chain transaction. As a decentralized PoS chain, the SGN can now offer more than just a “friendly suggestion.” It can also enforce penalties to registered cBridge nodes that cannot complete transactions assigned to them “as promised.”&#x20;

When a cBridge node registers with the SGN, it can put down an “SLA bond” (i.e. a bunch of tokens with value) associated with some SLA promises (e.g. availability, fee level, and liquidity reserve) in a pool contract. If the SGN determines that this node violates the SLA, such as being offline with an assigned transfer, the SGN can slash the bond as compensation to the user for the degraded user experience and liquidity opportunity cost. (remember, **no fund loss for users is** possible, this is just for “fund getting stuck” cost.)&#x20;

During node selection, the value available in the SLA bond is a key factor in how the node is prioritized in the transfer assignment process. Honest and reliable cBridge nodes are heavily incentivized to invest in a reasonable SLA bond to increase their chances of getting selected in the bridging process. On the other hand, less reliable nodes will be driven out of the system or will only be called upon as a last option. Finally, cBridge nodes can only be de-registered with the SGN once there are no pending cross-chain transactions.&#x20;

With the SLA bond slashing capability powered by the decentralized “SGN gateway,” the node availability challenge, and more generally, the SLA assurance concerns, are solved. This is aimed to facilitate a healthy, fast-growing, and decentralized cBridge node operator network for liquidity providers who want to maintain their self-custodial liquidity.

Some may argue that the SLA bond is not a 100% self-custodial setting due to the possibility of having the SLA bond wrongly slashed because of the possibility of a PoS consensus failure. &#x20;

While this is true, we want to highlight that the SLA bond only needs to be a very tiny portion of the total liquidity in order to become highly efficient in ensuring a smooth user experience and a self-healing cBridge node operator ecosystem. This is a very worthwhile tradeoff to make and most importantly, the entire transfer process stays 100% non-custodial.&#x20;

### **Node selection rule**&#x20;

The principle of the node selection rule design is to optimize for user experience. We build an empirical Node Quality Score formula to incorporate multiple factors such as the parameters in a node’s SLA (fee, response time) as well as historical performance. (e.g. success rate, average response time) When selecting nodes for user requests, we prioritize the nodes according to this score. We expect this formula to iterate and optimize over time with empirical operation experiences through protocol governance.
