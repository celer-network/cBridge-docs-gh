---
description: >-
  Get refund transaction info from cBridge gateway and submit the transaction
  on-chain. Then cBridge contract will transfer corresponding assets back to
  user's address on source chain
---

# Contract: Pool-Based Transfer Refund

## Implementation

Here is the <mark style="color:red;">abi</mark> for Bridge: [https://github.com/celer-network/cBridge-typescript-client/tree/main/contract/abi/Bridge.sol](https://github.com/celer-network/cBridge-typescript-client/tree/main/contract/abi/Bridge.sol)

```javascript
bridge.withdraw(wdmsg, sigs, signers, powers)
```

## Request Parameters <a href="#request-parameters" id="request-parameters"></a>

All information is given by cBridge gateway in [getTransferStatus response](gateway-gettransferstatus.md#response-parameters)

|         |                   |              |
| ------- | ----------------- | ------------ |
| wdmsg   | BytesLike         | wd\_onchain  |
| sigs    | Array\<BytesLike> | sorted\_sigs |
| signers | Array\<String>    | signers      |
| powers  | Array\<BigNumber> | powers       |

{% hint style="warning" %}
Notice: Since the types of parameters are different between getTransferStatus response and withdraw request, please convert them accordingly. See details in the below code sample
{% endhint %}

{% tabs %}
{% tab title="JavaScript" %}
```javascript
import { base64, getAddress, hexlify } from "ethers/lib/utils";

const wdmsg = base64.decode(wd_onchain);

const signers = _signers.map(item => {
    const decodeSigners = base64.decode(item);
    const hexlifyObj = hexlify(decodeSigners);
    return getAddress(hexlifyObj);
});

const sigs = sorted_sigs.map(item => {
    return base64.decode(item);
});

const powers = _powers.map(item => {
    return base64.decode(item);
});
```
{% endtab %}
{% endtabs %}

## Response

Since this function is an Ethereum on-chain transaction, the response is the corresponding transaction response.
