# Burn Refund

Once the user's previous transfer status is <mark style="color:red;">TRANSFER\_TO\_BE\_REFUNDED</mark>, FE(front-end) needs to handle as follows to bring back user's assets to his/her wallet:

1. Polling [GetTransferStatus](../api-reference/gateway-gettransferstatus.md) until transfer status is [<mark style="color:yellow;">TRANSFER\_TO\_BE\_CONFIRMED</mark>](../api-reference/gateway-gettransferstatus.md#xferstatus-enum)
2. Submit on-chain mint request to cBridge **PeggedTokenBridge** contract with information provided by cBridge gateway in [getTransferStatus](../api-reference/gateway-gettransferstatus.md) response
3. Once the refund transaction succeeds, the refund flow is complete.

{% hint style="warning" %}
&#x20;If burn flow failed, it means the canonical tokens have been burnt. To bring them back, you should tell cBridge **PeggedTokenBridge** contract to **mint** corresponding tokens.&#x20;
{% endhint %}

{% hint style="warning" %}
You should submit transaction to **PeggedTokenBridgeV2** if you interact with **PeggedTokenBridgeV2** for the previous transfer
{% endhint %}

{% hint style="info" %}
Basically, it may take some time for gateway to prepare withdraw information. If the transfer status is stuck as <mark style="color:red;">TRANSFER\_TO\_BE\_REFUNDED</mark> more than 30 minutes, you may contact our custom support
{% endhint %}
