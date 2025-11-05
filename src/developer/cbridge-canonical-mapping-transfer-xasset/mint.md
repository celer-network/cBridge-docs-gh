# Mint

To mint pegged token for user on pegged chain,  FE(front-end) needs to do the following things:

1. Get basic pegged configs through cBridge gateway. The same [api](../api-reference/gateway-gettransferconfigsforall.md) as general token transfer
2. After collecting all needed information, always get updated estimation for the mint. The same [estimation api](../api-reference/gateway-estimateamt.md) as general token transfer
3. Check user's on-chain token allowance for cBridge contract. If the allowance is not enough for mint, trigger the corresponding on-chain approve flow
4. Submit on-chain deposit/mint request to cBridge OriginalTokenVault contract on source chain
5. Get transfer status repeatedly to check whether the mint is complete.

{% hint style="success" %}
Mint/Burn flow are quite similar to pool-based token transfer flow. However, it is simpler because there is no slippage-related transfer failure scenario. If user's original token could be moved into OriginalTokenVault, peggedTokenBridge will mint and send corresponding pegged tokens to user's wallet address on pegged chain.
{% endhint %}

{% hint style="warning" %}
If vault\_version given by pegged\_pair\_config is 2, please use [OriginalTokenVaultV2](https://github.com/celer-network/sgn-v2-contracts/blob/main/contracts/pegged-bridge/OriginalTokenVaultV2.sol). Otherwise, use [OriginalTokenVault](https://github.com/celer-network/sgn-v2-contracts/blob/main/contracts/pegged-bridge/OriginalTokenVault.sol) &#x20;
{% endhint %}
