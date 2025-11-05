# API Reference

{% hint style="info" %}
All APIs will have a prefix to indicate whether it is a cBridge gateway function or a cBridge contract on-chain function.
{% endhint %}

### Get Transfer Configs

Get chains and tokens info supported by cBridge.

{% content-ref url="gateway-gettransferconfigsforall.md" %}
[gateway-gettransferconfigsforall.md](gateway-gettransferconfigsforall.md)
{% endcontent-ref %}

### Transfer Flow

When all needed information is ready, make an _<mark style="color:purple;">**estimation**</mark>_ for this transfer first. Then, submit an on-chain _<mark style="color:blue;">**send**</mark>_ transaction. Poll _<mark style="color:red;">**getTransferStatus**</mark>_ for this transaction until the transfer is complete or needs a refund.

{% content-ref url="gateway-estimateamt.md" %}
[gateway-estimateamt.md](gateway-estimateamt.md)
{% endcontent-ref %}

{% content-ref url="contract-pool-based-transfer.md" %}
[contract-pool-based-transfer.md](contract-pool-based-transfer.md)
{% endcontent-ref %}

{% content-ref url="gateway-gettransferstatus.md" %}
[gateway-gettransferstatus.md](gateway-gettransferstatus.md)
{% endcontent-ref %}

### Transfer Refund Flow

When the transfer status is <mark style="color:yellow;">TRANSFER\_TO\_BE\_REFUNDED</mark>, cBridge gateway will prepare on-chain refund transaction info automatically within several minutes. Polling getTransferStatus and submit on-chain transaction based on failed transfer type.&#x20;

{% content-ref url="gateway-gettransferstatus.md" %}
[gateway-gettransferstatus.md](gateway-gettransferstatus.md)
{% endcontent-ref %}

{% content-ref url="contract-pool-based-transfer-refund.md" %}
[contract-pool-based-transfer-refund.md](contract-pool-based-transfer-refund.md)
{% endcontent-ref %}

{% content-ref url="contract-mint-canonical-token-transfer-refund.md" %}
[contract-mint-canonical-token-transfer-refund.md](contract-mint-canonical-token-transfer-refund.md)
{% endcontent-ref %}

{% content-ref url="contract-burn-canonical-token-transfer-refund.md" %}
[contract-burn-canonical-token-transfer-refund.md](contract-burn-canonical-token-transfer-refund.md)
{% endcontent-ref %}

### Transfer History Query

{% content-ref url="gateway-transferhistory.md" %}
[gateway-transferhistory.md](gateway-transferhistory.md)
{% endcontent-ref %}
