
# Contract: Pool-Based Transfer

## Implementation

Pool-based transfers are done via the [Bridge](https://github.com/celer-network/sgn-v2-contracts/blob/b0cf02c15e25f66279420e3ff6a8b2fe07404bab/contracts/Bridge.sol) contract, specifically via the [send](https://github.com/celer-network/sgn-v2-contracts/blob/b0cf02c15e25f66279420e3ff6a8b2fe07404bab/contracts/Bridge.sol#L56) or [sendNative](https://github.com/celer-network/sgn-v2-contracts/blob/b0cf02c15e25f66279420e3ff6a8b2fe07404bab/contracts/Bridge.sol#L79) functions. For advanced users, these two functions can be called from smart contracts, but please read the [refund process](../cbridge-pool-based-transfer-xliquidity/transfer-refund.md) before you proceed.

Here is the <mark style="color:red;">abi</mark> for Bridge: [ ](https://github.com/celer-network/cBridge-typescript-client/tree/main/contract/abi/Bridge.sol)[https://github.com/celer-network/cBridge-typescript-client/tree/main/contract/abi/Bridge.sol](https://github.com/celer-network/cBridge-typescript-client/tree/main/contract/abi/Bridge.sol)

* Transfer gas token(ETH): <mark style="color:orange;">sendNative</mark>. No need to provide token address
* Transfer ERC20 token: <mark style="color:orange;">send</mark>.  Token address is needed

```javascript
/// SendNative
const transferTx = await transactor(
     bridge.sendNative(
     "0xaa47c83316edc05cf9ff7136296b026c5de7eccd", /// User's wallet Address
     100000000, /// Transfer amount with decimal
     4002, /// Destination chain id
     1638864397751, /// Nonce
     3000, /// Max slippage
     { 
          value: 100000000, /// Same amount as above
     },
     ),
).catch(e => {
     /// Handle Error
});

/// Send
const transferTx = await transactor(
     bridge.send(
     "0xdad9d86885d217b92a47370e1e785897dd09a4f3", /// User's Wallet Address
     "0x7d43aabc515c356145049227cee54b608342c0ad", /// Selected Token Address
     10000000000, /// Transfer amount with decimal
     5, /// Destination chain id
     1638862397751, /// Nonce
     780, /// Max slippage
     ),
).catch(e => {
     /// Handle Error
});
```

## Request Parameters <a href="#request-parameters" id="request-parameters"></a>

| Name                     | Type      | Description                                                                            |
| ------------------------ | --------- | -------------------------------------------------------------------------------------- |
| receiver                 | String    | User's wallet address                                                                  |
| token                    | String    | Token's address on source chain                                                        |
| amount                   | BigNumber | Token amount to be sent                                                                |
| dst\_chain\_id           | BigNumber | Destination chain id                                                                   |
| nonce                    | BigNumber | Current timestamp                                                                      |
| max\_slippage            | BigNumber | Use the value given by [amount estimation](gateway-estimateamt.md#response-parameters) |

> **Note:** 
If you want to use a max\_slippage with your own calculation, please make sure it is not less than [minimalMaxSlippage](https://github.com/celer-network/cBridge-typescript-client/blob/c434598005a44334bdb6fa22979da8b253eeaa86/contract/Bridge.d.ts#L769) given by cBridge contract. Otherwise, the transaction will fail.&#x20;


> **Note:** 
If `receiver` is a smart contract and the token you are sending is a wrapped native gas token on the destination chain, make sure the contract can receive native gas token by implementing `fallback` / `receive` functions.


### TransferId Generation

When you submit on-chain send transaction, you can also generate a transfer id for future reference. For example, it is used for [getTransferStatus](gateway-gettransferstatus.md) and [withdrawLiquidityForTransferRefund](broken-reference). It should be the same as transferId inside on-chain transaction log.&#x20;

```javascript
const transfer_id = ethers.utils.solidityKeccak256(
     [
      "address",
      "address",
      "address", 
      "uint256", 
      "uint64", 
      "uint64", 
      "uint64"
     ], 
     [
      "0xdad9d86885d217b92a47370e1e785897dd09a4f3", /// User's wallet address, 
      "0xdad9d86885d217b92a47370e1e785897dd09a4f3", /// User's wallet address, 
      "0x7d43aabc515c356145049227cee54b608342c0ad", /// Wrap token address/ ERC20 token address 
      "10000000000", /// Send amount in String 
      "5", /// Destination chain id
      "1638862397751", /// Nonce
      "4002", /// Source chain id
     ],
)
```

## Response <a href="#request-parameters" id="request-parameters"></a>

Since this function is an Ethereum on-chain transaction, the response is the corresponding transaction response.&#x20;
