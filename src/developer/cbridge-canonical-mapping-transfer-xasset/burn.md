# Burn

To withdraw user's original token on original chain,  FE(front-end) needs to do the following things:

1. Get basic pegged configs through cBridge gateway. The same [api](../api-reference/gateway-gettransferconfigsforall.md) as general token transfer
2. Check user's on-chain token allowance for cBridge PeggedTokenBridge contract. If the allowance is not enough for burn, trigger the corresponding on-chain approve flow
3. Submit on-chain burn request to cBridge PeggedTokenBridge contract on pegged chain
4. Get transfer status repeatedly to check whether the burn/withdraw is complete.

{% hint style="warning" %}
If bridge\_version given by pegged\_pair\_config is 2, you should submit transaction using [PeggedTokenBridgeV2](https://github.com/celer-network/sgn-v2-contracts/blob/main/contracts/pegged-bridge/PeggedTokenBridgeV2.sol) abi. Otherwise, use [PeggedTokenBridge](https://github.com/celer-network/sgn-v2-contracts/blob/main/contracts/pegged-bridge/PeggedTokenBridge.sol). The parameters of burn function are different since PeggedTokenBridgeV2 supports [Burn-Mint mode](burn.md#undefined).
{% endhint %}

### Burn-Mint (PeggedTokenBridgeV2 only)

Unlike PeggedTokenBridge, you can burn canonical token on pegged chain where PeggedTokenBridgeV2 is deployed and Celer SGN will mint corresponding tokens on another pegged chain if both pegged chains share the same [original chain id](../api-reference/gateway-gettransferconfigsforall.md#peggedpairconfig) and the same [original token](../api-reference/gateway-gettransferconfigsforall.md#peggedpairconfig). In this scenario, the user can skip interaction with OriginalTokenVault and have a better experience for his assets transfer.&#x20;
