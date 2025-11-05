
# Gateway: GetTransferConfigsForAll

### REST API

## Get chains and corresponding tokens supported by cBridge

<mark style="color:blue;">`GET`</mark> `https://cbridge-prod2.celer.app/v2/getTransferConfigsForAll`

By using this method, you can find chains' and tokens' information for cBridge testnet transfer, you can use cBridge production endpoint for mainnet configs



```javascript
{
    // Response
}
```



## Request Parameters

None

## Response Parameters

| Name                            | Type                                                                               | Description                                            |
| ------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------ |
| chains                          | Array<[Chain](gateway-gettransferconfigsforall.md#chain)>                          | All supported chains' info                             |
| chain\_token                    | Map\<Number, [ChainTokenInfo](gateway-gettransferconfigsforall.md#chaintokeninfo)> | Supported tokens info for each chain. Key is chain\_id |
| farming\_reward\_contract\_addr | String                                                                             | cBridge farming reward contract address                |
| pegged\_pair\_configs           | Array\<PeggedPairConfig>                                                           |                                                        |

### Chain

| Name                 | Type   | Description                              |
| -------------------- | ------ | ---------------------------------------- |
| id                   | UInt32 | chain id                                 |
| name                 | String | chain name                               |
| icon         ​   ​   | String |  chain icon url                          |
| block\_delay         | UInt32 | block delay for transaction confirmation |
| gas\_token\_symbol   | String | gas token                                |
| explore\_url         | String | This chain's browser's url               |
| contract\_addr       | String | cBridge contract address on  this chain  |

### ChainTokenInfo

| Name        | Type              | Description                |
| ----------- | ----------------- | -------------------------- |
| token\_list | Array\<TokenInfo> | chain supported token list |

### TokenInfo

| Name               | Type                                               | Description             |
| ------------------ | -------------------------------------------------- | ----------------------- |
| token              | [Token](gateway-gettransferconfigsforall.md#token) | token detail            |
| name               | String                                             | token name              |
| icon               | String                                             | token icon url          |
| transfer\_disabled | Boolean                                            | token transfer disabled |

### Token

| Name            | Type    | Description             |
| --------------- | ------- | ----------------------- |
| symbol        ​ | String  | token symbol            |
| address         | String  | token address           |
| decimal         | Number  | token decimal           |
| xfer\_disabled  | Boolean | token transfer disabled |

> **Note:** 
If transfer\_disabled or xfer\_disabled is true, we cannot transfer the token on the corresponding chain


### PeggedPairConfig

| Name                            | Type                                                       | Description                                                                                                                                                                                                                                                                        |
| ------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| org\_chain\_id                  | UInt32                                                     | source chain id                                                                                                                                                                                                                                                                    |
| org\_token                      | [TokenInfo](gateway-gettransferconfigsforall.md#tokeninfo) | original token info                                                                                                                                                                                                                                                                |
| pegged\_chain\_id               | UInt32                                                     | pegged chain id                                                                                                                                                                                                                                                                    |
| pegged\_token                   | [TokenInfo](gateway-gettransferconfigsforall.md#tokeninfo) | corresponding pegged token on pegged chain                                                                                                                                                                                                                                         |
| pegged\_deposit\_contract\_addr | String                                                     | contract address on pagged chain for mint/deposit                                                                                                                                                                                                                                  |
| pegged\_burn\_contract\_addr    | String                                                     | contract address on pagged chain for burn/withdraw                                                                                                                                                                                                                                 |
| vault\_version                  | Number                                                     | 0 for [OriginalTokenVault](https://github.com/celer-network/sgn-v2-contracts/blob/main/contracts/pegged-bridge/OriginalTokenVault.sol), 2 for [OriginalTokenVaultV2](https://github.com/celer-network/sgn-v2-contracts/blob/main/contracts/pegged-bridge/OriginalTokenVaultV2.sol) |
| bridge\_version                 | Number                                                     | 0 for [PeggedTokenBridge](https://github.com/celer-network/sgn-v2-contracts/blob/main/contracts/pegged-bridge/PeggedTokenBridge.sol), 2 for [PeggedTokenBridgeV2](https://github.com/celer-network/sgn-v2-contracts/blob/main/contracts/pegged-bridge/PeggedTokenBridgeV2.sol)     |

> **Note:** 
All data inside the configs should not be edited, otherwise it may lead to failure.


