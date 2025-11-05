
# Gateway: MarkRefRelation

### Rest API <a href="#implementation" id="implementation"></a>

## Make a reference between transfer transaction with your ref code

<mark style="color:green;">`POST`</mark> `https://cbridge-prod2.celer.app/v2/partner/markRefRelation`

#### Path Parameters

| Name                                           | Type   | Description                      |
| ---------------------------------------------- | ------ | -------------------------------- |
| transfer\_id<mark style="color:red;">\*</mark> | String | on-chain transaction transfer id |
| ref\_id                                        | String | your ref code                    |

### GRPC-Web API

```javascript
// import getTransferConfig request message 
import {
  MarkRefRelationRequest
} from "../ts-proto/sgn/gateway/v1/gateway_pb";

// import grpc-web WebClient
import { 
  WebClient 
} from "../ts-proto/sgn/gateway/v1/GatewayServiceClientPb";

const request = new MarkRefRelationRequest();
request.setTransferId(YOUR_TRANSFER_ID);
request.setRefId(YOUR_REF_CODE);

const client = new WebClient(`https://cbridge-prod2.celer.app`, null, null);
const response = await client.markRefRelation(request, null);
```

## Request Parameters <a href="#request-parameters" id="request-parameters"></a>

| Name         | Type   | Description               |
| ------------ | ------ | ------------------------- |
| transfer\_id | String | Auto-generated transferId |
| ref\_id      | String | Your reference code       |

### TransferId Generation <a href="#transferid-generation" id="transferid-generation"></a>

Since there are different types of transfer provided by cBridge, you should use corresponding transfer id generation logic, please refer following links.

* [Pool-Based Transfer Id Generation](contract-pool-based-transfer.md#transferid-generation)
* [Mint Token Transfer Id Generation](contract-mint-canonical-token-originaltokenvault.md#transferid-generation)
* [Burn Token Transfer Id Generation](contract-burn-canonical-token-peggedtokenbridge.md#transferid-generation)

> **Note:** 
The best practice for markRefRelation is notifying cBridge gateway after on-chain transaction has been submitted.&#x20;


## Response <a href="#request-parameters-1" id="request-parameters-1"></a>

Since this request is notifying cBridge gateway one transfer is related to a ref code, normal response returns an empty body.&#x20;
