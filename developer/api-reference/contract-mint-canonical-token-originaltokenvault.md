---
description: >-
  Lock user's assets into cBridge and mint corresponding token on the
  destination chain
---

# Contract: Mint Canonical Token(OriginalTokenVault)

## Implementation

Minting is the process of locking original tokens on the source chain and minting canonical tokens that are pegged 1:1 on the destination chain. Original tokens can be deposited into the [OriginalTokenVault](https://github.com/celer-network/sgn-v2-contracts/blob/b0cf02c15e25f66279420e3ff6a8b2fe07404bab/contracts/pegged/OriginalTokenVault.sol) contract on the source chain, specifically via the [deposit](https://github.com/celer-network/sgn-v2-contracts/blob/b0cf02c15e25f66279420e3ff6a8b2fe07404bab/contracts/pegged/OriginalTokenVault.sol#L64) or [depositNative](https://github.com/celer-network/sgn-v2-contracts/blob/b0cf02c15e25f66279420e3ff6a8b2fe07404bab/contracts/pegged/OriginalTokenVault.sol#L84) functions, which will trigger the minting of canonical tokens from the [PeggedTokenBridge](https://github.com/celer-network/sgn-v2-contracts/blob/b0cf02c15e25f66279420e3ff6a8b2fe07404bab/contracts/pegged/PeggedTokenBridge.sol) contract on the destination chain. For advanced users, the two deposit functions can be called from smart contracts.&#x20;

Here is the <mark style="color:red;">abi</mark> for the canonical / pegged token bridge contracts: [https://github.com/celer-network/cBridge-typescript-client/tree/main/contract/abi/pegged/PeggedTokenBridge.sol](https://github.com/celer-network/cBridge-typescript-client/tree/main/contract/abi/pegged/PeggedTokenBridge.sol), [https://github.com/celer-network/cBridge-typescript-client/tree/main/contract/abi/pegged/OriginalTokenVault.sol](https://github.com/celer-network/cBridge-typescript-client/tree/main/contract/abi/pegged/OriginalTokenVault.sol)

```javascript
const transferTx = await transactor(
     originalTokenVault!.deposit(
          pegConfig.config.org_token.token.address, 
          value,
          pegConfig.config.pegged_chain_id,
          address, 
          nonce,
     ),    
).catch(e => {
     /// Handle Error
});
```

## Request Parameters <a href="#request-parameters" id="request-parameters"></a>

| Name            | Type    | Description                        |
| --------------- | ------- | ---------------------------------- |
| token           | String  | Token's address                    |
| amount          | UInt256 | locked token amount                |
| mint\_chain\_id | UInt64  | destination chainId to mint tokens |
| nonce           | UInt64  | Current timestamp                  |
| mint\_account   | String  | User's wallet address              |

{% hint style="warning" %}
If the `mint_account` is a smart contract and the token you are sending is a wrapped native gas token on the destination chain, make sure the contract can receive native gas token by implementing `fallback` / `receive` functions.
{% endhint %}

### TransferId Generation

When you submit on-chain deposit transaction, you can also generate a transfer id for future reference. For example, it is used for [getTransferStatus](gateway-gettransferstatus.md). It should be the same as transferId inside on-chain transaction log.&#x20;

```javascript
/// Example transaction:
/// https://testnet.bscscan.com/tx/0x5a4a0b50a74c9671f39694a506f1117bdfda2fbd001fe853c0494ca542d7687f#eventlog
const deposit_id = ethers.utils.solidityKeccak256(
     [
      "address",
      "address",
      "uint256", 
      "uint64", 
      "address",
      "uint64", 
      "uint64"
     ], 
     [
      "0x51d36e18e3d32d121a3cfe2f3e5771a6fd53274e", /// User's wallet address, 
      "0x0368ba12d5b0fc5cd2e17199f8074fbac9abb7aa", /// selectedTokenAddress,
      "50000000000000000000", /// Mint amount in String 
      "65", /// Pegged Chain Id
      "0x51d36e18e3d32d121a3cfe2f3e5771a6fd53274e", /// User's wallet address, 
      "....", /// Nonce
      "...", /// Original chain id
     ],
)
```

## Response <a href="#request-parameters" id="request-parameters"></a>

Since this function is an Ethereum on-chain transaction, the response is the corresponding transaction response.&#x20;
