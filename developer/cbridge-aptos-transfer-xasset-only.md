# cBridge Aptos Transfer (xAsset Only)

## Prerequisites

Before implementing transfer functionality between EVM chains and Non-EVM chains, you should know how to [transfer between EVM chains](cbridge-canonical-mapping-transfer-xasset/#flow-phrases)

## Implementation

The principle and methodology of transfer between EVM chains and Non-EVM chains are the same as transfer between EVM chains and EVM chains. To support Aptos transfer, there are several things to do.

* Submit transfer transaction through **TransferAgent** contract on EVM chains
* Submit transfer transaction to Aptos Modules(Vault for deposit, PegBridge for burn) deployed by cBridge.

{% hint style="warning" %}
To avoid chain id conflict, Celer SGN reserves <mark style="color:red;">**12360001**</mark> as <mark style="color:red;">**Aptos Mainnet**</mark> Chain Id, <mark style="color:orange;">**12360002**</mark> as <mark style="color:orange;">**Aptos Testnet**</mark> Chain Id and <mark style="color:blue;">**12360003**</mark> as <mark style="color:blue;">**Aptos Devnet**</mark> Chain Id.
{% endhint %}

## Submit transfer through [TransferAgent](https://github.com/celer-network/sgn-v2-contracts/blob/main/contracts/proxy/TransferAgent.sol) contract on EVM&#x20;

Unlike EVM wallet address, Aptos wallet uses <mark style="color:blue;">**32**</mark> bytes hex string as address. Then you <mark style="color:red;">**cannot**</mark> submit transfer transaction **using Aptos wallet address as destination receiver** through cBridge **OriginalTokenVault** / **PeggedBridge** contract. Hence, cBridge deploys a TransferAgent contract which can use any length string as destination receiver.

{% content-ref url="api-reference/contract-transferagent-mint-token-submission.md" %}
[contract-transferagent-mint-token-submission.md](api-reference/contract-transferagent-mint-token-submission.md)
{% endcontent-ref %}

{% content-ref url="api-reference/contract-transferagent-burn-token-submission.md" %}
[contract-transferagent-burn-token-submission.md](api-reference/contract-transferagent-burn-token-submission.md)
{% endcontent-ref %}

## Submit transfer on Aptos Chain

You can refer [this](https://aptos.dev/guides/aptos-guides) to submit transaction on Aptos

{% content-ref url="api-reference/contract-aptos-vault-mint-token-submission.md" %}
[contract-aptos-vault-mint-token-submission.md](api-reference/contract-aptos-vault-mint-token-submission.md)
{% endcontent-ref %}

{% content-ref url="api-reference/contract-aptos-pegbridge-burn-token-submission.md" %}
[contract-aptos-pegbridge-burn-token-submission.md](api-reference/contract-aptos-pegbridge-burn-token-submission.md)
{% endcontent-ref %}
