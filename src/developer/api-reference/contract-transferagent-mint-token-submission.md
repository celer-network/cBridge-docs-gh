---
description: >-
  Lock user's assets into cBridge contract, mint corresponding tokens to
  receiver which address can be any length
---

# Contract: TransferAgent Mint Token Submission

{% hint style="warning" %}
TransferAgent transfer is not recommended if receiver's wallet address is no more than 20 bytes
{% endhint %}

## Implementation <a href="#implementation" id="implementation"></a>

Through TransferAgent's transfer function, user can specify token to be locked on source chain and receiver's address on destination chain. According to [pegged\_pair\_config.vault\_version](gateway-gettransferconfigsforall.md#peggedpairconfig), you should set different parameters communicating with TransferAgent contract.

#### Communicate with OriginalTokenVault through TransferAgent contract

```javascript
transferAgent!.transfer(
     receiverAddress /// Destination chain receiver address, could be any length.
     pegConfig.config.org_token.token.address /// Source chain token address
     value, /// Transfer amount
     destinationChainId, /// Destination Chain Id 
     nonce, /// Current timestamp
     0, /// Canonical token transfer doesn't require max slippage
     2, /// BridgeSendType.PegDeposit
        /// https://github.com/celer-network/sgn-v2-contracts/blob/
        /// c66326d458b9d34058ed960f610af69d8514716c/contracts/
        /// libraries/BridgeTransferLib.sol#L27
     [] /// Extensions are not required    
)
```

#### Communicate with OriginalTokenVaultV2 through TransferAgent contract

```javascript
transferAgent!.transfer(
     receiverAddress /// Destination chain receiver address, could be any length.
     pegConfig.config.org_token.token.address /// Source chain token address
     value, /// Transfer amount
     destinationChainId, /// Destination Chain Id 
     nonce, /// Current timestamp
     0, /// Canonical token transfer doesn't require max slippage
     4, /// BridgeSendType.PegV2Deposit
        /// https://github.com/celer-network/sgn-v2-contracts/blob/
        /// c66326d458b9d34058ed960f610af69d8514716c/contracts/
        /// libraries/BridgeTransferLib.sol#L27
     [] /// Extensions are not required    
)
```

## Request Parameters <a href="#request-parameters" id="request-parameters"></a>

| Name              | Type                                                                                                                                                            | Description                             |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| receiver\_address | String                                                                                                                                                          | Receiver's address on destination chain |
| token\_address    | String                                                                                                                                                          | Token address on source chain           |
| amount            | UInt256                                                                                                                                                         | Transfer amount on source chain         |
| nonce             | UInt64                                                                                                                                                          | Timestamp                               |
| max\_slippage     | UInt32                                                                                                                                                          | **Not required**                        |
| bridgeSendType    | [BridgeSendType](https://github.com/celer-network/sgn-v2-contracts/blob/c66326d458b9d34058ed960f610af69d8514716c/contracts/libraries/BridgeTransferLib.sol#L24) | Bridge Send Type                        |
| extensions        | Array<[Extension](https://github.com/celer-network/sgn-v2-contracts/blob/c66326d458b9d34058ed960f610af69d8514716c/contracts/proxy/TransferAgent.sol#L19)>       | **Not required**                        |

### TransferId Generation <a href="#transferid-generation" id="transferid-generation"></a>

When you submit on-chain mint transaction through TransferAgentContract, you can also generate a transfer id for future reference. For example, it is used for [getTransferStatus](gateway-gettransferstatus.md). It should be the same as transferId inside on-chain transaction log.&#x20;

#### Transfer Id Generation with OriginalTokenVault

```javascript
const mint_id = ethers.utils.solidityKeccak256(
     [
      "address",
      "address",
      "uint256", 
      "uint64",
      "address",
      "uint64", 
      "uint64",
     ], 
     [
      "...", /// TransferAgent contract address
      "...", /// Token address on source chain,
      "...", /// Mint amount in String 
      "12360001", /// Destination Chain Id
      "0x0000000000000000000000000000000000000000", /// Hardcoded address zero
      "...", /// Nonce
      "...", /// Source chain id
     ],
)
```

#### Transfer Id Generation with OriginalTokenVaultV2

```javascript
 const mint_id = ethers.utils.solidityKeccak256(
     [
      "address", 
      "address", 
      "uint256", 
      "uint64", 
      "address", 
      "uint64", 
      "uint64", 
      "address",
     ],
     [
      "...", /// TransferAgent contract address
      "...", /// Token address on source chain,
      "...", /// Mint amount in String 
      "12360001", /// Destination Chain Id
      "0x0000000000000000000000000000000000000000", /// Hardcoded address zero
      "...", /// Nonce
      "...", /// Source chain id
      "...", /// Original Token Vault V2 contract address on source chain
     ],
)
```

## Response <a href="#request-parameters-1" id="request-parameters-1"></a>

Since this function is an on-chain transaction, the response is the corresponding transaction response.
