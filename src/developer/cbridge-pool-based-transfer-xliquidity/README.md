# cBridge Pool-Based Transfer  (xLiquidity)

## Terminology

The followings are used to describe cBridge transfer flow

* The **Source Chain** is a chain contains the assets which users want to move.&#x20;
* The **Destination Chain** is a chain where users want to receive their assets
* The **cBridge Gateway** provides related functionality to support users' assets transfer.&#x20;
* The **cBridge contract** will be deployed on different chains for transfer functionality  &#x20;

## Flow Phrases

#### Transfer

> A user request a on-chain transfer through cBridge contract on source chain. Then cBridge gateway and Celer SGN will coordinate token transfer from cBridge contract to user's address on destination Chain

#### Transfer Refund

> Once there is a transfer failure which requests refund, you will wait until cBridge has prepared on-chain refund transaction parameters.  Then submit refund transaction and cBridge contracts will return user's assets on source chain

![](<../../.gitbook/assets/image (70).png>)

