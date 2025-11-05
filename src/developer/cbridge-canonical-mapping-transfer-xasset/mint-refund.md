# Mint Refund

Once the user's previous transfer status is <mark style="color:red;">TRANSFER\_TO\_BE\_REFUNDED</mark>, FE(front-end) needs to handle as follows to bring back user's assets to his/her wallet:

1. Polling [GetTransferStatus](../api-reference/gateway-gettransferstatus.md) until transfer status is [<mark style="color:yellow;">TRANSFER\_TO\_BE\_CONFIRMED</mark>](../api-reference/gateway-gettransferstatus.md#xferstatus-enum)
2. Submit on-chain withdraw request to cBridge **OriginalTokenVault** contract with information provided by cBridge gateway in [getTransferStatus](../api-reference/gateway-gettransferstatus.md) response
3. Once the refund transaction succeeds, the refund flow is complete.

> **Note:** 
&#x20;Because of no slippage constraints, the possibility of deposit/mint flow failure is pretty low. Once mint flow failed with source chain deposit transaction, you will need to withdraw user's assets.  The whole refund flow is the same as [pool-based transfer flow](../cbridge-pool-based-transfer-xliquidity/#transfer-refund). However, you should communicate with **OriginalTokenVault** contract for this refund


> **Note:** 
You should submit transaction to **OriginalTokenVaultV2** if you interact with **OriginalTokenVaultV2** for the previous transfer


> **Note:** 
Basically, it may take some time for gateway to prepare withdraw information. If the transfer status is stuck as <mark style="color:red;">TRANSFER\_TO\_BE\_REFUNDED</mark> more than 30 minutes, you may contact our custom support

