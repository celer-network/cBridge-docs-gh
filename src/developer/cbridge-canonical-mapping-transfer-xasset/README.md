# cBridge Canonical Mapping Transfer (xAsset)

## Terminology

The followings are used to describe cBridge transfer flow

* The **Original Chain** is the chain which supports the original token
* The **Pegged Chain** is the chain which has not supported original token yet.&#x20;
* The **Original Token** is the existing token on the source chain
* The **Pegged Token** is the original token mapping on the pegged chain. <mark style="color:red;">The rate between original token and pegged token is 1:1</mark>
* The **Original Token Vault** is a contract deployed on the source chain locking and sending back user's assets
* The **Pegged Token Bridge** is a contract deployed on the pegged chain minting and burning pegged token for users.

## Flow Phrases&#x20;

#### Mint(Deposit)

> A user submit on-chain deposit/mint request to the OriginalTokenVault contract on source chain. Then user's original tokens will be moved and locked in the OriginalTokenVault contract. Celer SGN will coordinate pegged token mint in PeggedTokenBridge contract and move generated tokens into user's wallet address

#### Burn(Withdraw)

> A user submit on-chain burn/withdraw request to the PeggedTokenBridge contract on pegged chain. Then user's pegged tokens will be moved and burnt in the PeggedTokenBridge contract. Celer SGN will coordinate original tokens unlock and send back to user's wallet address in OriginalTokenVault bridge on source chain.

{% hint style="warning" %}
During the communication between you and cBridge gateway, you need to indicate it is a mint\&burn transfer flow. Otherwise, cBridge gateway will treat it as a general pool-based transfer and may lead to unexpected error
{% endhint %}

```javascript
// By refering pegged_pair_configs, we can determine whether 
// it is a pegged transfer. 
Scenario A:
   5 <---> 69 Domi ====> Pool-Based Transfer
Scenario B:
   5 <---> 97 Domi ====> Mint&Burn Transfer

"chains": [
    {
      "id": 5,
      "name": "Goerli",
      "icon": "https://get.celer.app/cbridge-icons/ETH.png",
      "block_delay": 5,
      "gas_token_symbol": "ETH",
      "explore_url": "https://goerli.etherscan.io/",
      //cbridge contract
      "contract_addr": "0x358234B325EF9eA8115291A8b81b7d33A2Fa762D",
      "drop_gas_amt": "0",
      "suggested_gas_cost": "0",
      "drop_gas_cost_amt": "0"
    },
    {
      "id": 69,
      "name": "Optimistic Kovan",
      "icon": "https://get.celer.app/cbridge-icons/chain-icon/OP.jpg",
      "block_delay": 8,
      "gas_token_symbol": "ETH",
      "explore_url": "https://kovan-optimistic.etherscan.io/",
      //cbridge contract
      "contract_addr": "0x265B25e22bcd7f10a5bD6E6410F10537Cc7567e8",
      "drop_gas_amt": "0",
      "suggested_gas_cost": "0",
      "drop_gas_cost_amt": "0"
    },
    {
      "id": 97,
      "name": "BSC Testnet",
      "icon": "https://get.celer.app/cbridge-icons/chain-icon/BSC.png",
      "block_delay": 8,
      "gas_token_symbol": "BNB",
      "explore_url": "https://testnet.bscscan.com/",
      "contract_addr": "0xf89354F314faF344Abd754924438bA798E306DF2",
      "drop_gas_amt": "2000000000000000",
      "suggested_gas_cost": "125624",
      "drop_gas_cost_amt": "100000000000000"
    },
  ]
{
  "token": {
      "symbol": "CELR",
      "address": "0x5D3c0F4cA5EE99f8E8F59Ff9A5fAb04F6a7e007f",
      "decimal": 18,
      "xfer_disabled": false
    },
    "name": "Celer Network",
    "icon": "https://get.celer.app/cbridge-icons/celr.png"
  },
  {
    "token": {
      "symbol": "DOMI",
      "address": "0x646Ff87BE4F232C555c264465007f3AAE7a5626e",
      "decimal": 18,
      "xfer_disabled": false
    },
    "name": "Domi",
    "icon": "https://get.celer.app/cbridge-icons/Domi.png"
  },
}

"pegged_pair_configs": [
    {
      "org_chain_id": 5,
      "org_token": {
        "token": {
          "symbol": "DOMI",
          "address": "0x646Ff87BE4F232C555c264465007f3AAE7a5626e",
          "decimal": 18,
          "xfer_disabled": false
        },
        "name": "Domi",
        "icon": "https://get.celer.app/cbridge-icons/Domi.png"
      },
      "pegged_chain_id": 97,
      "pegged_token": {
        "token": {
          "symbol": "DOMI",
          "address": "0x472c1c7147F335C97066eA59fa548aCeAc1F5b58",
          "decimal": 18,
          "xfer_disabled": false
        },
        "name": "Domi",
        "icon": "https://get.celer.app/cbridge-icons/Domi.png"
      },
      "pegged_deposit_contract_addr": "0x12E25Cd0787Bab0cC84C800a301615883Ef0C384",
      "pegged_burn_contract_addr": "0xcb1dB69399755Cf8A9EbE8A3033f3082793b67eB"
    },
  ]
```
