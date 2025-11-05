---
description: Submit burn transaction from Aptos chain
---

# Contract: Aptos PegBridge Burn Token Submission

## Implementation <a href="#implementation" id="implementation"></a>

You will generate Aptos transaction payload and submit it on-chain

```javascript
const burnTransactionPayload = {
    arguments: [
      amount, /// Burn token amount with decimal
      destinationChainId.toString(), /// Destination chain id
      Array.from(ethers.utils.arrayify(RECEIVER_ADDRESS)), /// Destination receiver address bytes
      nonce /// timestamp
    ],
    function: `0x${PEGGED_BRIDGE_CONTRACT_ADDRESS}::peg_bridge::burn`,
    type: 'entry_function_payload',
    type_arguments: [BURN_TOKEN_ADDRESS], /// burn token address
  };
```

## Request Parameters <a href="#request-parameters" id="request-parameters"></a>

| Name          | Type        | Description                        |
| ------------- | ----------- | ---------------------------------- |
| amount        | u64         | Burn token amount                  |
| to\_chain\_id | u64         | Destination chain id               |
| to\_addr      | vector\<U8> | Destination receiver address bytes |
| nonce         | u64         | Timestamp                          |

### TransferId Generation <a href="#transferid-generation" id="transferid-generation"></a>

Since Aptos uses Big-Endian, you may use BCS provided by Aptos to get serialized data.

```javascript
import { ethers } from "ethers";

const receiverAddressWithout0x = "..." /// Receiver address on destination chain
const transferId = ethers.utils.solidityKeccak256(
    [
      "bytes32", 
      "string", 
      "uint64", 
      "uint64", 
      `bytes${Math.floor(receiverAddressWithout0x.length / 2)}`, 
      "uint64", 
      "uint64", 
      "bytes32", 
      "string"
    ],
    [
      "...", /// Aptos wallet address as sender, 32-byte hexString
      "..." /// Aptos token address
      "...", /// Transfer amount
      "...", /// Destination chain id
      `0x${receiverAddressWithout0x}`, /// Receiver address which length may vary based on different chains
      "...", /// Nonce
      "12360001", /// Source chain id
      `0x${this.contractAddress}`, /// Aptos contract address, 32-byte hexString
      "peg_bridge", /// hardcoded message 
    ],
);
```

## Response <a href="#request-parameters-1" id="request-parameters-1"></a>

Since this function is an on-chain transaction, the response is the corresponding transaction response.
