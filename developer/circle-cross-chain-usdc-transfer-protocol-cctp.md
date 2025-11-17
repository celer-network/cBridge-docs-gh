# Circle Cross-chain USDC Transfer Protocol(CCTP)

For Circle Cross-Chain USDC Protocol supported chains, the USDC flow is going through Circle bridge contracts and its attestation service instead of cBridge or peg bridge contracts and SGN.

The following content is an integration tutorial from frontend perspective.

<figure><img src="../.gitbook/assets/image (41).png" alt=""><figcaption><p>CCPT flow</p></figcaption></figure>



## Proxy Contracts

<table data-header-hidden><thead><tr><th width="195"></th><th width="502.3333333333333"></th></tr></thead><tbody><tr><td>Chain</td><td>Address</td></tr><tr><td>Ethereum 1</td><td><a href="https://etherscan.io/address/0xC75fdd24820ddCdADeE9BB653aE6cD73BA8f0e80">0xC75fdd24820ddCdADeE9BB653aE6cD73BA8f0e80</a></td></tr><tr><td>Avalanche 43114</td><td><a href="https://snowtrace.io/address/0x358234B325EF9eA8115291A8b81b7d33A2Fa762D">0x358234B325EF9eA8115291A8b81b7d33A2Fa762D</a></td></tr><tr><td>Arbitrum One 42161</td><td><a href="https://arbiscan.io/address/0x90811d8Ea6499D3e5CbfBa3B279FB4387EbDfce9">0x90811d8Ea6499D3e5CbfBa3B279FB4387EbDfce9</a></td></tr><tr><td>Optimism 10 </td><td><a href="http://optimistic.etherscan.io/address/0xcfA5906d71e057BE50f4CF2a5bc41FF7bD0f0B91">0xcfA5906d71e057BE50f4CF2a5bc41FF7bD0f0B91</a></td></tr><tr><td>Base 8453</td><td><a href="https://basescan.org/address/0xCD086225f47155937cc57b320f8D37933B683197">0xCD086225f47155937cc57b320f8D37933B683197</a></td></tr><tr><td>Polygon PoS 137</td><td><a href="https://polygonscan.com/address/0x04869755Da6E3F6eE5D190b8C6E56E1c33604cf2">0x04869755Da6E3F6eE5D190b8C6E56E1c33604cf2</a></td></tr><tr><td>Plume Mainnet 98866</td><td><a href="https://explorer.plume.org/address/0x9B36f165baB9ebe611d491180418d8De4b8f3a1f">0x9B36f165baB9ebe611d491180418d8De4b8f3a1f</a></td></tr></tbody></table>

Also you can get the related contract addressed from cBridge gateway api

[https://cbridge-prod2.celer.app/v1/circleUsdcConfig](https://cbridge-prod2.celer.app/v1/circleUsdcConfig)

## Quote Fee

Note that the CCTP quote the fees from the proxy contract instead of the cBridge gateway APIs.

For example, bridging USDC from Ethereum to Avalanch by [totalFee](https://etherscan.io/address/0x6065a982f04f759b7d2d042d2864e569fad84214#readContract#F13) method.

**Inputs**

amount:  Your bridging amount with decimal, for example, 3000000 = 30USDC

dstChid: The destination chain you wanna send, in this case is 43114



**Outputs**

Output data is an array of fees `[fee, txFee, percFe]`.

`fee: total fee, txFee+percFee`

`txFee: transaction fee`

`percFee: percentage fee`

For this bridging mode, the bridge rate is 1.



## Bridge by depositForBurn

From the front-end side, lock the USDC to source proxy contract by the method [depositForBurn](https://etherscan.io/address/0x6065a982f04f759b7d2d042d2864e569fad84214#writeContract#F4). Circle attestation will bridge the assets to the destination chain in a trustless way. For more details refer to this:[https://developers.circle.com/stablecoin/docs/cctp-protocol-contract](https://developers.circle.com/stablecoin/docs/cctp-protocol-contract)



**Contract Parameters**

| Field         | Des                                                                                                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| amount        | Bridging amount with decimal                                                                                                                                                                           |
| dstChid       | Bridging destination chain id                                                                                                                                                                          |
| mintRecipient | Receiver address                                                                                                                                                                                       |
| burnToken     | USDC token address in source chain, you can read the token address from this configuration: [https://cbridge-prod2.celer.app/v1/circleUsdcConfig](https://cbridge-prod2.celer.app/v1/circleUsdcConfig) |

Once this depositForBurn happened on the source chain, you can get the source chain **Deposited** event.

```
event Deposited(address sender, bytes32 recipient, uint64 dstChid, uint256 amount, uint256 txFee, uint256 percFee, uint64 nonce);
```



## Searching destination transaction status

Searching the final destination chain status by the gateway API: GetTransferStatus.

The API requires a tracking field **transferId** for the status quering, here is an example with ether.js.

```typescript
getTransferId(): string {
      return ethers.utils.solidityKeccak256(
          ["string", "address", "uint64", "uint64"],
          [
            "CircleTransfer", // fixed string
            walletAddress, // wallet address of user
            fromChainId, // source chain Id
            nonce, // can be retrived from the Deposited event
          ],
      );
    }  
```

**API reference**

{% content-ref url="api-reference/gateway-gettransferstatus.md" %}
[gateway-gettransferstatus.md](api-reference/gateway-gettransferstatus.md)
{% endcontent-ref %}







