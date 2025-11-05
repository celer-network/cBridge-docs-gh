---
description: Get transfer status from cBridge gateway
---

# Gateway: GetTransferStatus

### REST API

<mark style="color:green;">`POST`</mark> `https://cbridge-prod2.celer.app/v2/getTransferStatus`

Here is a curl example.

`curl -d '{"transfer_id":"77D7E231B08120217969DED3FF1ED2B40C0028CA1E239B225F535C57808A23F6"}' -H "Content-Type: application/json" -X POST https://cbridge-prod2.celer.app/v2/getTransferStatus`

When you get the response, you can get <mark style="color:purple;">TransferHistoryStatus</mark> and <mark style="color:purple;">XferStatus</mark> according to below mapping.

For example, if the "status" is 6 and the "refund\_reason" is 4, we know this tx needs to be refunded for user since slippage is too low to finish the cBridge transfer flow. &#x20;

#### Headers

| Name                                           | Type   | Description          |
| ---------------------------------------------- | ------ | -------------------- |
| Content-Type<mark style="color:red;">\*</mark> | String | use application/json |

#### Request Body

| Name                                           | Type   | Description |
| ---------------------------------------------- | ------ | ----------- |
| transfer\_id<mark style="color:red;">\*</mark> | String |             |

{% tabs %}
{% tab title="200: OK " %}
```javascript
{
  "err": null,
  "status": 5,
  "wd_onchain": null,
  "sorted_sigs": [
  ],
  "signers": [
  ],
  "powers": [
  ],
  "refund_reason": 0,
  "block_delay": 30,
  "src_block_tx_link": "https://ftmscan.com/tx/0x5817041ff87994234a74edbff7f25afb659a5519c1ce0b90b7d886aca67eaccc",
  "dst_block_tx_link": "https://arbiscan.io/tx/0xe73db1fff7407a72d4755cd52252d29afd2e5326b755725df56befba4ff7594b"
}
```
{% endtab %}
{% endtabs %}

### GRPC-Web API

```javascript
import {
    GetTransferStatusRequest
} from "../ts-proto/sgn/gateway/v1/gateway_pb";

// import grpc-web WebClient
import { 
    WebClient 
} from "../ts-proto/sgn/gateway/v1/GatewayServiceClientPb";

/// https://ftmscan.com/tx/0x5817041ff87994234a74edbff7f25afb659a5519c1ce0b90b7d886aca67eaccc"
const request = new GetTransferStatusRequest();
request.setTransferId("77D7E231B08120217969DED3FF1ED2B40C0028CA1E239B225F535C57808A23F6");
const client = new WebClient(`https://cbridge-prod2.celer.app`, null, null);
const response = await client.getTransferStatus((request, null);
```

## Request Parameter

| Name         | Type   | Description                                                                                                                                                                                |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| transfer\_id | String | [Ethereum generation hash ](contract-pool-based-transfer.md#transferid-generation)with  [cBridge on-chain send transaction parameters](contract-pool-based-transfer.md#request-parameters) |

## Response Parameters <a href="#response-parameters" id="response-parameters"></a>

| Name                 | Type                                                                             | Description                                                                                                |
| -------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| status               | [TransferHistoryStatus](gateway-gettransferstatus.md#transferhistorystatus-enum) | transfer status                                                                                            |
| wd\_onchain          | String                                                                           | Serialized on-chain withdraw request<mark style="color:orange;">(only for refund)</mark>                   |
| sorted\_sigs         | Array\<String>                                                                   | Celer SGN validators' sign for wd\_onchain <mark style="color:orange;">(only for refund)</mark>            |
| signers              | Array\<String>                                                                   | Celer SGN validators which has signed for wd\_onchain <mark style="color:orange;">(only for refund)</mark> |
| powers               | Array\<String>                                                                   | Powers for each signed validators <mark style="color:orange;">(only for refund)</mark>                     |
| refund\_reason       | [XferStatus](gateway-gettransferstatus.md#xferstatus-enum)                       | Used when status is <mark style="color:red;">TRANSFER\_TO\_BE\_REFUNDED</mark>                             |
| block\_delay         | Number                                                                           | Waiting block for this transfer on src chain                                                               |
| src\_block\_tx\_link | String                                                                           | source chain transaction link                                                                              |
| dst\_block\_tx\_link | String                                                                           | destination chain transaction link                                                                         |

### TransferHistoryStatus <a href="#transferhistorystatus-enum" id="transferhistorystatus-enum"></a>

<table><thead><tr><th>Type</th><th>Description</th><th>Code</th><th data-hidden></th></tr></thead><tbody><tr><td>TRANSFER_UNKNOWN</td><td>Placeholder status</td><td>0</td><td></td></tr><tr><td><mark style="color:yellow;">TRANSFER_SUBMITTING</mark></td><td>cBridge gateway monitoring on-chain transaction</td><td>1</td><td></td></tr><tr><td><mark style="color:red;">TRANSFER_FAILED</mark></td><td>transfer failed, no need to refund</td><td>2</td><td></td></tr><tr><td><mark style="color:blue;">TRANSFER_WAITING_FOR_SGN_CONFIRMATION</mark></td><td>cBridge gateway waiting for Celer SGN confirmation</td><td>3</td><td></td></tr><tr><td>TRANSFER_WAITING_FOR_FUND_RELEASE</td><td>waiting for user's fund release on destination chain</td><td>4</td><td></td></tr><tr><td><mark style="color:green;">TRANSFER_COMPLETED</mark></td><td>Transfer completed</td><td>5</td><td></td></tr><tr><td><mark style="color:red;">TRANSFER_TO_BE_REFUNDED</mark></td><td>Transfer failed, should trigger refund flow, whether it is Pool-Based or Mint/Burn refund​</td><td>6</td><td></td></tr><tr><td>TRANSFER_REQUESTING_REFUND</td><td>cBridge gateway is preparing information for user's transfer refund</td><td>7</td><td></td></tr><tr><td><mark style="color:yellow;">TRANSFER_REFUND_TO_BE_CONFIRMED</mark></td><td>The user should submit on-chain refund transaction based on information provided by this api</td><td>8</td><td></td></tr><tr><td>TRANSFER_CONFIRMING_YOUR_REFUND</td><td>cBridge monitoring transfer refund status on source chain</td><td>9</td><td></td></tr><tr><td><mark style="color:green;">TRANSFER_REFUNDED</mark></td><td>Transfer refund completed</td><td>10</td><td></td></tr><tr><td><mark style="color:yellow;">TRANSFER_DELAYED</mark></td><td>Transfer is put into a delayed execution queue</td><td>11</td><td></td></tr></tbody></table>

### XferStatus <a href="#xferstatus-enum" id="xferstatus-enum"></a>

<table><thead><tr><th>Type</th><th>Description</th><th>Code</th><th data-hidden></th></tr></thead><tbody><tr><td>UNKNOWN</td><td>Placeholder</td><td>0</td><td></td></tr><tr><td>OK_TO_RELAY ​  ​  ​  ​  ​  ​  ​  ​ </td><td><mark style="color:blue;">TRANSFER_WAITING_FOR_SGN_CONFIRMATION</mark></td><td>1</td><td></td></tr><tr><td>SUCCESS</td><td>Transfer success</td><td>2</td><td></td></tr><tr><td><mark style="color:red;">BAD_LIQUIDITY</mark></td><td>Not enough liquidity</td><td>3</td><td></td></tr><tr><td><mark style="color:red;">BAD_SLIPPAGE</mark></td><td>Slippage is too low</td><td>4</td><td></td></tr><tr><td><mark style="color:red;">BAD_TOKEN</mark></td><td>not supported token or token amount not available</td><td>5</td><td></td></tr><tr><td>REFUND_REQUESTED</td><td>refund started</td><td>6</td><td></td></tr><tr><td>REFUND_DONE</td><td>refund finished</td><td>7</td><td></td></tr><tr><td><mark style="color:red;">BAD_XFER_DISABLED</mark></td><td>transfer for this token is disabled</td><td>8</td><td></td></tr><tr><td><mark style="color:red;">BAD_DEST_CHAIN</mark></td><td>not supported destination chain</td><td>9</td><td></td></tr></tbody></table>

{% hint style="info" %}
We should focus on status types with <mark style="color:red;">BAD</mark> prefix, it shows the error reason for failed transfer transaction. Other status indicates normal transaction flow.
{% endhint %}

{% tabs %}
{% tab title="JavaScript" %}
```javascript
/// Code Sample

const statusRes = await getTransferStatus({ transfer_id: transferId }
```
{% endtab %}
{% endtabs %}
