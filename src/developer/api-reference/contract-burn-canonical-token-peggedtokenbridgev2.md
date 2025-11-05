
# Contract: Burn Canonical Token (PeggedTokenBridgeV2)

## Implementation <a href="#implementation" id="implementation"></a>

The user can specify destination chain id when submitting burn transaction to PeggedTokenBridgeV2. The destination chain id can be original chain id which means the user will bring back his asset from OriginalTokenVault. The destination chain id could indicate another pegged chain where another PeggedTokenBridgeV2 is deployed and able to mint corresponding canonical token.&#x20;

```javascript
peggedTokenBridge!.burn(
     pegConfig.config.pegged_token.token.address, 
     value, 
     destinationChainId,
     address, 
     nonce)   
```

## Request Parameters <a href="#request-parameters" id="request-parameters"></a>

| Name               | Type    | Description                              |
| ------------------ | ------- | ---------------------------------------- |
| token              | String  | Pegged token address on the pegged chain |
| amount             | UInt256 | Burn amount                              |
| destinationChainId | UInt64  | Destination Chain Id                     |
| withdraw\_account  | String  | User's wallet address                    |
| nonce              | UInt64  | Current timestamp                        |

> **Note:** 
If `withdraw_account` is a smart contract and the token you are sending is a wrapped native gas token on the destination chain, make sure the contract can receive native gas token by implementing `fallback` / `receive` functions.


### TransferId Generation <a href="#transferid-generation" id="transferid-generation"></a>

When you submit on-chain burn transaction, you can also generate a transfer id for future reference. For example, it is used for [getTransferStatus](gateway-gettransferstatus.md). It should be the same as transferId inside on-chain transaction log.&#x20;

```javascript
const burn_id = ethers.utils.solidityKeccak256(
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
      "0x51d36e18e3d32d121a3cfe2f3e5771a6fd53274e", /// User's wallet address, 
      "0x37c92f7f65c40813b9404e9d031126550c39f8a8", /// selectedTokenAddress,
      "20000000000000000000", /// Burn amount in String 
      "...", /// Destination Chain Id
      "0x51d36e18e3d32d121a3cfe2f3e5771a6fd53274e", /// User's wallet address, 
      "....", /// Nonce
      "...", /// Pegged chain id
      "...", /// PeggedTokenBridgeV2 contract address
     ],
)
```

> **Note:** 
Please be aware that transfer id generation parameters are different between **PeggedTokenBridge** and **PeggedTokenBridgeV2**


## Response <a href="#request-parameters-1" id="request-parameters-1"></a>

Since this function is an Ethereum on-chain transaction, the response is the corresponding transaction response.
