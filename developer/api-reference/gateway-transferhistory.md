---
description: Get list of user's transfer history
---

# Gateway: TransferHistory

### REST API

## Get a list of user's transfer history

<mark style="color:blue;">`GET`</mark> `https://cbridge-prod2.celer.app/v2/transferHistory`

Here is a request sample:

[https://cbridge-prod2.celer.app/v1/transferHistory?acct\_addr\[\]=0x51D36E18E3D32d121A3CfE2F3E5771A6FD53274E\&page\_size=5\&next\_page\_token=1639122153714](https://cbridge-prod2.celer.app/v1/transferHistory?acct_addr\[]=0x51D36E18E3D32d121A3CfE2F3E5771A6FD53274E\&page_size=5\&next_page_token=1639122153714)

#### Path Parameters

| Name                                         | Type       | Description                                      |
| -------------------------------------------- | ---------- | ------------------------------------------------ |
| acct\_addr<mark style="color:red;">\*</mark> | String\[]  | User's wallet addresses                          |
| next\_page\_token                            | String     | Timestamp                                        |
| page\_size<mark style="color:red;">\*</mark> | Int        | size for history items, should be greater than 0 |

{% tabs %}
{% tab title="200: OK " %}
```javascript
{
  "err": null,
  "history": [
  ],
  "next_page_token": "0",
  "current_size": "0"
}
```
{% endtab %}
{% endtabs %}

### GRPC-Web API

```javascript
// import transfer history request message 
import {
  TransferHistoryRequest
} from "../ts-proto/sgn/gateway/v1/gateway_pb";

// import grpc-web WebClient
import { 
  WebClient 
} from "../ts-proto/sgn/gateway/v1/GatewayServiceClientPb";

const request = new TransferHistoryRequest();
request.setNextPageToken("1639122153714");
request.setAcctAddrList(["0x51D36E18E3D32d121A3CfE2F3E5771A6FD53274E"]);
request.setPageSize(5);
const client = new WebClient(`https://cbridge-prod2.celer.app`, null, null);
const response = await client.transferHistory(request, null);
```

## Request Parameters

| Name              | Type           | Description                                                                                    |
| ----------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| next\_page\_token | String         |                                                                                                |
| page\_size        | Number         | Size for history items, should be greater than 0. Otherwise, gateway will return an empty list |
| acct\_addr        | Array\<String> | User's wallet addresses                                                                        |

{% hint style="info" %}
To get the latest histories, use empty string as next\_page\_token. Otherwise, use value given by response.
{% endhint %}

## Response Parameters

| Name                | Type                    | Description |
| ------------------- | ----------------------- | ----------- |
| history\_list       | Array\<TransferHistory> |             |
| next\_page\_token   | String                  |             |
| current\_page\_size | Number                  |             |

{% hint style="info" %}
If current\_page\_size in response is smaller than page\_size in request, it means list has come to an end/
{% endhint %}

### TransferHistory

| Name                 | Type                                                                            | Description |
| -------------------- | ------------------------------------------------------------------------------- | ----------- |
| transfer\_id         | String                                                                          |             |
| src\_send\_info      | [TransferInfo](gateway-transferhistory.md#transferinfo)                         |             |
| dst\_received\_info  | [TransferInfo](gateway-transferhistory.md#transferinfo)                         |             |
| ts                   | Number                                                                          |             |
| src\_block\_tx\_link | String                                                                          |             |
| dst\_block\_tx\_link | String                                                                          |             |
| status               | [TranserHistoryStatus](gateway-gettransferstatus.md#transferhistorystatus-enum) |             |
| refund\_reason       | [XferStatus](gateway-gettransferstatus.md#xferstatus-enum)                      |             |

### TransferInfo

| Name   | Type                                               |   |
| ------ | -------------------------------------------------- | - |
| chain  | [Chain](gateway-gettransferconfigsforall.md#chain) |   |
| token  | [Token](gateway-gettransferconfigsforall.md#token) |   |
| amount | String                                             |   |
