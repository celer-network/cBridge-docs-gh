---
description: Get estimation for the user's transfer request.
---

# Gateway: EstimateAmt

### REST API

## Get estimation for the user's transfer request

<mark style="color:blue;">`GET`</mark> `https://cbridge-prod2.celer.app/v2/estimateAmt`

Here is a sample request for estimateAmt:

[https://cbridge-prod2.celer.app/v2/estimateAmt?src\_chain\_id=1\&dst\_chain\_id=56\&token\_symbol=USDT\&amt=1000000\&usr\_addr=0xaa47c83316edc05cf9ff7136296b026c5de7eccd\&slippage\_tolerance=3000](https://cbridge-prod2.celer.app/v2/estimateAmt?src_chain_id=1\&dst_chain_id=56\&token_symbol=USDT\&amt=1000000\&usr_addr=0xaa47c83316edc05cf9ff7136296b026c5de7eccd\&slippage_tolerance=3000)

#### Path Parameters

| Name                                                  | Type    | Description                                                                                                                                                          |
| ----------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| src\_chain\_id<mark style="color:red;">\*</mark>      | Number  | source chain id, given by transfer configs                                                                                                                           |
| dst\_chain\_id<mark style="color:red;">\*</mark>      | Number  | destination chain Id,  given by transfer configs                                                                                                                     |
| token\_symbol<mark style="color:red;">\*</mark>       | String  | symbol of token to be transfered, given by transfer configs                                                                                                          |
| usr\_addr                                             | String  | user's wallet address                                                                                                                                                |
| amt<mark style="color:red;">\*</mark>                 | String  | Token amount to be transfered. It should contain token's decimal. For example, if the user wants to transfer 1 tokenA and A's decimal is 4, then amt should be 10000 |
| slippage\_tolerance<mark style="color:red;">\*</mark> | Number  | value between 1 and 1M - 1, see details below                                                                                                                        |
| is\_pegged                                            | Bool    | set true if transfer pegged token                                                                                                                                    |

{% tabs %}
{% tab title="200: OK " %}
```javascript
{
  "err": null,
  "eq_value_token_amt": "1000000999999999872",
  "bridge_rate": 1.000001,
  "perc_fee": "0",
  "base_fee": "605437528092011966",
  "slippage_tolerance": 3000,
  "max_slippage": 608436,
  "estimated_receive_amt": "394563471907987906",
  "drop_gas_amt": "0"
}
```
{% endtab %}
{% endtabs %}

### GRPC-Web API

```javascript
// import estimateAmt request message 
import { 
    EstimateAmtRequest, 
    EstimateAmtResponse 
} from "../ts-proto/sgn/gateway/v1/gateway_pb";

// import grpc-web WebClient
import { 
    WebClient 
} from "../ts-proto/sgn/gateway/v1/GatewayServiceClientPb";

const estimateRequest = new EstimateAmtRequest();
estimateRequest.setSrcChainId(1);
estimateRequest.setDstChainId(56);
estimateRequest.setTokenSymbol("USDT");
estimateRequest.setUsrAddr(0xaa47c83316edc05cf9ff7136296b026c5de7eccd);
estimateRequest.setSlippageTolerance(3000);
estimateRequest.setAmt("100000");

const client = new WebClient(`https://cbridge-prod2.celer.app`, null, null);
const res = await client.estimateAmt(estimateRequest, null);
```

## Request Parameters <a href="#request-parameters" id="request-parameters"></a>

| Name                          | Type   | Description                                                                                                                                                            |
| ----------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| src\_chain\_id                | Number | Source Chain Id, given by transfer configs                                                                                                                             |
| dst\_chain\_id                | Number | Destination Chain Id,  given by transfer configs                                                                                                                       |
| token\_symbol                 | String | Symbol of token to be transfered, given by transfer configs                                                                                                            |
| usr\_addr                     | String | User's wallet addres&#x73;_<mark style="color:red;">**(Not required for multi-chain token transfer)**</mark>_                                                          |
| slippage\_tolerance           | Number | Slippage for onchain transaction(User's input)                                                                                                                         |
| amt                           | String | Token amount to be transfered. Token's decimal should be used here. For example, if the user wants to transfer 1 tokenA and A's decimal is 4, then amt should be 10000 |
| is\_pegged                    |        | Used for pegged token transfer only                                                                                                                                    |

{% hint style="info" %}
Which value is suitable for <mark style="color:red;">slippage\_tolerance</mark>?

cBridge gateway uses <mark style="color:orange;">slippage\_tolerance\_rate</mark> to represent user's slippage for on-chain transaction. The range of <mark style="color:orange;">slippage\_tolerance\_rate</mark> is from \[0, 1)

The calculation formula between <mark style="color:red;">slippage\_tolerance</mark> and slippage\_tolerance\_rate is

<mark style="color:orange;">slippage\_tolerance\_rate</mark> = <mark style="color:red;">slippage\_tolerance / 1M</mark>

Hence, if the user sets slippage\_tolerance with 0.05%, <mark style="color:red;">slippage\_tolerance</mark> in the request will be 0.05% \* 1M = 500

Moreover, if the user sets slippage\_tolerance with 0.050123%, the calculation will lead to 0.050123% \* 1M = 501.23. However, gateway will only accept <mark style="color:green;">integer</mark> as <mark style="color:red;">slippage\_tolerance.</mark> The final value should be <mark style="color:red;">501</mark>
{% endhint %}

{% hint style="warning" %}
You need to find out whether this transfer is used for pegged token according to [PeggedPairConfigs](gateway-gettransferconfigsforall.md#peggedpairconfig). Moreover, slippage will not be effective if is\_pagged is true
{% endhint %}

## Response Parameters <a href="#response-parameters" id="response-parameters"></a>

| Name                                    | Type   | Description                                                                                                                                               |
| --------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p>eq_value_token_amt          <br></p> | String | Token amount in destination chain                                                                                                                         |
| bridge\_rate                            | Number | [Bridge rate](../../reference/faq.md#bridge-rate) between source chain and destination chain                                                              |
| perc\_fee                               | String | [Protocol fee](../../reference/faq.md#bridge-fee)                                                                                                         |
| base\_fee                               | String | [Base fee](../../reference/faq.md#bridge-fee)                                                                                                             |
| slippage\_tolerance                     | Number | The same number as slippage\_tolerance in request                                                                                                         |
| max\_slippage                           | Number | slippage will be used to submit on-chain transaction, see below for calculation detail. <mark style="color:red;">used for xLiquidity transfer only</mark> |
| estimated\_receive\_amt                 | String | receiving amount estimation on destination chain                                                                                                          |

{% hint style="info" %}
How to calculate max\_slippage?

There are several factors influencing the final value for max\_slippage, all of them are inside the response. Since we cannot guarantee user receiving more tokens on destination chain, there is slippage adjustment in the end.

1. estimate\_dst\_amt = user\_transfer\_amount\_on\_src\_chain \* bridge\_rate
2. estimate\_min\_dst\_amt = estimate\_dst\_amt \* (1 - slippage\_tolerance\_rate) - base\_fee - perc\_fee
3. max\_slippage\_rate = 1 - estimate\_min\_dst\_amt / user\_transfer\_amount\_on\_src\_chain
4. max\_slippage = max(max\_slippage\_rate \* 1M, minimalMaxSlippage)
{% endhint %}

{% hint style="info" %}
Minimum receiving amount calculation

amount = eq\_value\_token\_amt  \*  (1 - max\_slippage/1M)
{% endhint %}

{% hint style="warning" %}
The on-chain send transaction failed _**mostly when slippage is too small to be processed by cBridge system.**_&#x20;

To avoid the potential on-chain failure and waste of gas, we recommend you compare max\_slippage with minimalMaxSlippage on cBridge contract before sending on-chain  transaction. If max\_slippage is less than minimalMaxSlippage, guide user increasing input value slippage\_tolerance.

Moreover, since max\_slippage, bridge\_rate, perc\_fee and base\_fee may change when user interacting with your application, we should get the lastest estimation before final submit to avoid [on-chain send](contract-pool-based-transfer.md) failure.
{% endhint %}

{% hint style="danger" %}
The cross-chain transfer is accepted only. if src\_chain\_id is the same as dst\_chain\_id, it may lead to an error
{% endhint %}

## Error handling

### Error Code Description

<table><thead><tr><th width="334.3333333333333">Error Code</th><th width="138">Error Number</th><th>Description</th></tr></thead><tbody><tr><td>ERROR_CODE_UNDEFINED</td><td>0</td><td>Error code placeholder</td></tr><tr><td>ERROR_CODE_COMMON</td><td>500</td><td>Chain is disabled</td></tr><tr><td>ERROR_NO_TOKEN_ON_DST_CHAIN</td><td>1001</td><td>Token not supported on destination chain</td></tr><tr><td>ERROR_NO_TOKEN_ON_SRC_CHAIN</td><td>1002</td><td>Token not supported on source chain</td></tr><tr><td>ERROR_CODE_NO_ENOUGH_TOKEN_ON_DST_CHAIN</td><td>1004</td><td>Destination chain token is not enough for transfer</td></tr><tr><td>ERROR_CODE_INBOUND_LIQUIDITY_LIMIT</td><td>1005</td><td>Token pool epoch volume cap reached</td></tr><tr><td>ERROR_CODE_TRANSFER_DISABLED</td><td>1009</td><td>Token transfer between source chain and destination(both direction) is disabled</td></tr><tr><td>ERROR_CODE_BAD_LIQ_SLIPPAGE</td><td>1012</td><td>Bad slippage</td></tr><tr><td>ERROR_CODE_ADDRESS_BLOCKED</td><td>1015</td><td>This address is blocked due to potential security risks, which is alerted by third party organization. Those risks include hacker's address, money laundering and etc.</td></tr><tr><td>ERROR_CODE_BLOCK_BRIDGE_DIRECT</td><td>1016</td><td>Token transfer from source chain to destination(one direction) is disabled</td></tr><tr><td>ERROR_CODE_LIQ_OVER_CAP</td><td>1017</td><td>Token pool total cap reached</td></tr><tr><td>ErrCode_ERROR_CODE_VPN_BLOCK</td><td>1018</td><td>VPN is <em><mark style="color:red;"><strong>not allowed</strong></mark></em> when getting transfer estimation</td></tr></tbody></table>

### Error with high frequency

#### <mark style="color:red;">ERROR\_CODE\_INBOUND\_LIQUIDITY\_LIMIT & ERROR\_CODE\_LIQ\_OVER\_CAP</mark>

The sending amount is beyond liquidity pool limit. It will happen only for liquidity pool-based transfer. The calculation for inbound liquidity limit of **source chain token** liquidity pool is <mark style="color:purple;">**TOTAL\_LIQUIDITY\_ADDED - TOTAL\_\_LIQUIDITY\_RELAYED - TOTAL\_\_LIQUIDITY\_WITHDRAWN.**</mark> Once this error code is given, you have to let the users <mark style="color:red;">decrease</mark> their input sending amount.

#### <mark style="color:red;">ERROR\_CODE\_NO\_ENOUGH\_TOKEN\_ON\_DST\_CHAIN</mark>

Destination chain doesn’t have enough token for this transfer. It may happen for pool based transfer which bridge rate is fixed to 1.

## Estimated Time of Arrival for Transfer

To provide a better user experience, cBridge has a request to indicate user how long it will take to finish a transfer. You may also use this to provide a better time estimation for the users.

## Request Sample

<mark style="color:blue;">`GET`</mark> `https://cbridge-prod2.celer.app/v2/getLatest7DayTransferLatencyForQuery`

[https://cbridge-prod2.celer.app/v2/getLatest7DayTransferLatencyForQuery?src\_chain\_id=1\&dst\_chain\_id=56](https://cbridge-prod2.celer.app/v2/getLatest7DayTransferLatencyForQuery?src_chain_id=1\&dst_chain_id=56)

#### Path Parameters

| Name                                             | Type   | Description          |
| ------------------------------------------------ | ------ | -------------------- |
| src\_chain\_id<mark style="color:red;">\*</mark> | Number | source chain id      |
| dst\_chain\_id<mark style="color:red;">\*</mark> | Number | destination chain id |

{% tabs %}
{% tab title="200: OK " %}
```javascript
{
  "err": null,
  "median_transfer_latency_in_second": 325.818221
}
```
{% endtab %}
{% endtabs %}
