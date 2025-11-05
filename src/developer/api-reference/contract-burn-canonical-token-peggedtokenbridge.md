
# Contract: Burn Canonical Token(PeggedTokenBridge)

## Implementation <a href="#implementation" id="implementation"></a>

Burning is the reverse of the [minting](https://app.gitbook.com/o/KqK7YjAlzW1oggY8EUgX/s/e2ozVyumMnvf5tn0izji/c/a9lgLSP9VsmBEO9eAsJt/developer/api-reference/contract-mint-canonical-token) process. Canonical tokens can be [burned](https://github.com/celer-network/sgn-v2-contracts/blob/b0cf02c15e25f66279420e3ff6a8b2fe07404bab/contracts/pegged/PeggedTokenBridge.sol#L98) via the [PeggedTokenBridge](https://github.com/celer-network/sgn-v2-contracts/blob/b0cf02c15e25f66279420e3ff6a8b2fe07404bab/contracts/pegged/PeggedTokenBridge.sol) contract on the source chain, which will trigger the release of the original tokens from the [OriginalTokenVault](https://github.com/celer-network/sgn-v2-contracts/blob/b0cf02c15e25f66279420e3ff6a8b2fe07404bab/contracts/pegged/OriginalTokenVault.sol) contract on the destination chain. For advanced users, the burn function can be called from smart contracts.

Here is the <mark style="color:red;">abi</mark> for the canonical / pegged token bridge contracts: [https://github.com/celer-network/cBridge-typescript-client/tree/main/contract/abi/pegged/PeggedTokenBridge.sol](https://github.com/celer-network/cBridge-typescript-client/tree/main/contract/abi/pegged/PeggedTokenBridge.sol), [https://github.com/celer-network/cBridge-typescript-client/tree/main/contract/abi/pegged/OriginalTokenVault.sol](https://github.com/celer-network/cBridge-typescript-client/tree/main/contract/abi/pegged/OriginalTokenVault.sol)

```javascript
peggedTokenBridge!.burn(
     pegConfig.config.pegged_token.token.address, 
     value, 
     address, 
     nonce)
```

## Request Parameters <a href="#request-parameters" id="request-parameters"></a>

| Name              | Type    | Description                              |
| ----------------- | ------- | ---------------------------------------- |
| token             | String  | Pegged token address on the pegged chain |
| amount            | UInt256 | Burn amount                              |
| withdraw\_account | String  | User's wallet address                    |
| nonce             | UInt64  | Current timestamp                        |

> **Note:** 
If `withdraw_account` is a smart contract and the token you are sending is a wrapped native gas token on the destination chain, make sure the contract can receive native gas token by implementing `fallback` / `receive` functions.


### TransferId Generation <a href="#transferid-generation" id="transferid-generation"></a>

When you submit on-chain burn transaction, you can also generate a transfer id for future reference. For example, it is used for [getTransferStatus](gateway-gettransferstatus.md). It should be the same as transferId inside on-chain transaction log.&#x20;

```javascript
/// Example transaction: 
/// https://www.oklink.com/en/oec-test/tx/0x56c066218fcfab624d53abeea74486a33c0aa2339bde333d94ccc143a83b98b4?tab=3

const burn_id = ethers.utils.solidityKeccak256(
     [
      "address",
      "address",
      "uint256", 
      "address",
      "uint64", 
      "uint64"
     ], 
     [
      "0x51d36e18e3d32d121a3cfe2f3e5771a6fd53274e", /// User's wallet address, 
      "0x37c92f7f65c40813b9404e9d031126550c39f8a8", /// selectedTokenAddress,
      "20000000000000000000", /// Burn amount in String 
      "0x51d36e18e3d32d121a3cfe2f3e5771a6fd53274e", /// User's wallet address, 
      "....", /// Nonce
      "...", /// Pegged chain id
     ],
)
```

> **Note:** 
Please be aware that transfer id generation parameters are different between mint flow and burn flow.


## Response <a href="#request-parameters-1" id="request-parameters-1"></a>

Since this function is an Ethereum on-chain transaction, the response is the corresponding transaction response.
