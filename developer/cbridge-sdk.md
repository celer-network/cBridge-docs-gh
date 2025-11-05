# cBridge SDK

cBridge SDK allows new and existing applications to integrate a rich **subset of features** that are available in the cBridge 2.0.  Simple imported libraries and packages allow you to quickly implement the cBridge transfer functionality into new and existing applications.&#x20;

### cBridge Testnet Website

You can try our [testnet website](https://dev-cbridge-v2.netlify.app/#/transfer) during the SDK integration

### cBridge Testnet Endpoint

The testnet endpoint is: [https://cbridge-v2-test.celer.network](https://cbridge-v2-test.celer.network)

### cBridge Mainnet Endpoint

When you have finished implementation and testing on testnet, you are welcome to use cBridge mainnet for production test. The endpoint is: [https://cbridge-prod2.celer.app/](https://cbridge-prod2.celer.app/)

## SDK Working Flow

The following graph reveals a general cBridge SDK integration inside your application. In most cases, you need to support <mark style="color:red;">only two</mark> functions(red lines in the graph):

1. Send request to cBridge gateway through cBridge SDK
2. Send corresponding on-chain transaction to cBridge contract

![](../.gitbook/assets/sdk-working-flow.png)

## Installation

It's highly recommended to communicate with cBridge gateway by using grpc-web.

1. You don't need to put any effort for response value mapping. Since all messages are defined in protobuf, enum value could be used directly such as <mark style="color:green;">Completed</mark> instead of an integer value 1. It helps preventing bugs and errors due to random mapping issues
2. Inside cBridge gateway, there are some post APIs needing serialized byteArray as input. It takes some steps to prepare format accepted request information. Just in case you prefer RESTful api request, we will provide some examples for you accordingly
3. Since cBridge iterates frequently, the best way to keep everything updated is using grpc. You can always check the latest grpc generated files and keep in touch with the newest cBridge gateway

{% hint style="info" %}
<mark style="color:orange;">You can always use REST apis when communicating with cBridge gateway. We will provide examples and details in each api reference.</mark>
{% endhint %}

### 1. Install the [grpc-web](https://github.com/grpc/grpc-web)&#x20;

To begin development with cBridge SDK, each developer needs to install grpc-web for cBridge gateway communication&#x20;

{% tabs %}
{% tab title="yarn" %}
```javascript
// Install via yarn
yarn add grpc-web
```
{% endtab %}

{% tab title="npm" %}
```javascript
// Install via npm
npm install grpc-web
```
{% endtab %}
{% endtabs %}

### 2. Download cBridge type-script client and contract&#x20;

Download auto-generated protobuf files(including xxx\_pb.d.ts, xxx\_pb.js) in [cBridge typescript client repo](https://github.com/celer-network/cBridge-typescript-client). You can find all needed messages including client, request constructs and contracts there.

### 3. Import cBridge SDK into your projects.

Import the file and type-defined messages, then they can be used in your project. The following is code snippet for type-script client usage in JavaScript project.

```javascript
// import getTransferConfig request message 
import {
  GetTransferConfigsRequest
  GetTransferConfigsResponse
} 
from "../ts-proto/sgn/gateway/v1/gateway_pb";

// import grpc-web WebClient
import { WebClient } 
from "../ts-proto/sgn/gateway/v1/GatewayServiceClientPb";

const request = new GetTransferConfigsRequest();
const client = new WebClient(`https://cbridge-prod2.celer.app/`, null, null);
const response = await client.getTransferConfigs(request, null);
```

## API Reference

Once you have integrated cBridge SDK into your project, dive into the specifics of each API by checking out our complete documentation.

{% content-ref url="api-reference/" %}
[api-reference](api-reference/)
{% endcontent-ref %}

## Need help? <a href="#need-help" id="need-help"></a>

If you're looking for help, try join the [community Discord](https://discord.gg/Trhab5w)
