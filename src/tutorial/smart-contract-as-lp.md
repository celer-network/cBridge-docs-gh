# Smart Contract as LP

The liquidity pool mode of cBridge supports using a smart contract (eg. a multi-sig wallet) to provide liquidity, with the caveat of having to follow a special process to withdraw liquidity. This tutorial describes the process of adding and withdrawing liquidity using smart contracts.

> **Note:** 
**This feature has only been released on a limited number of chains.**&#x20;


<mark style="color:red;">**Note: Before adding any liquidity to cBridge from a smart contract, make sure you have read this tutorial and are comfortable with following the technical instructions.**</mark>

### **Prerequisite: Check LP address**&#x20;

Currently, we have only released support for contract LPs on a limited number of chains on which we have deployed [WithdrawInbox](https://github.com/celer-network/sgn-v2-contracts/blob/243d1e3924527c463650af9809b24d24cffe7242/contracts/liquidity-bridge/WithdrawInbox.sol) contracts to facilitate withdrawing liquidity:

* **Ethereum:** [ ](https://etherscan.io/address/0x5427FEFA711Eff984124bFBB1AB6fbf5E3DA1820)[0xD20fc42E293734f58316E2106933B8D9FB14F5b2](https://etherscan.io/address/0xD20fc42E293734f58316E2106933B8D9FB14F5b2)
* **BSC:** [0xf0FF9888A70f44eb12223A6a55C65976BA7bf854](https://bscscan.com/address/0xf0FF9888A70f44eb12223A6a55C65976BA7bf854)
* **Optimism:** [0x1b6a49B01176020b153d0cD5Bc90Ef2b75676F00](https://optimistic.etherscan.io/address/0x1b6a49B01176020b153d0cD5Bc90Ef2b75676F00)
* **Polygon:** [0x0E6847e732c0dfE40cc15216AC95E558960e522e](https://polygonscan.com/address/0x0E6847e732c0dfE40cc15216AC95E558960e522e)
* **Avalanche:** [0x03ab38cF52173CC71be33B0D2779568f412Be828](https://snowtrace.io/address/0x03ab38cF52173CC71be33B0D2779568f412Be828)
* **Arbitrum:** [0xfe0401bFFBeECE5d9FaE7f1b9a8f1e03FA1c3184](https://arbiscan.io/address/0xfe0401bFFBeECE5d9FaE7f1b9a8f1e03FA1c3184)
* **Conflux:** [0x78a21c1d3ed53a82d4247b9ee5bf001f4620ceec](https://evm.confluxscan.net/address/0x78a21c1d3ed53a82d4247b9ee5bf001f4620ceec)
* **Kava:** [0x0D90AC8466C3aEF6821f9116B96aa2255Ca2DA20](https://explorer.kava.io/address/0x0D90AC8466C3aEF6821f9116B96aa2255Ca2DA20)
* **zkSync Era:** [0x80Bd61013F1ca7908b75d88AD08f8dBdEab4e779](https://explorer.zksync.io/address/0x80Bd61013F1ca7908b75d88AD08f8dBdEab4e779#contract)
* **Moonbeam:** [0x9B36f165baB9ebe611d491180418d8De4b8f3a1f](https://moonbeam.moonscan.io/address/0x9B36f165baB9ebe611d491180418d8De4b8f3a1f)
* **Manta Pacific:** [0xF9eBA2FE3F8d03d098a439fab2038c737D3DBB94](https://pacific-explorer.manta.network/address/0xF9eBA2FE3F8d03d098a439fab2038c737D3DBB94?tab=write_contract)
* **Base**: [0xAeC3b47eda9040b9C12F2Ac8d6980d2D2Bcc99F5](https://basescan.org/address/0xAeC3b47eda9040b9C12F2Ac8d6980d2D2Bcc99F5#code)

Make sure the chain you are going to interact with is supported. Take a note of the WithdrawInbox address and [cBridge address](../reference/contract-addresses.md#bridge-contract-pool-based-bridge).

In cBridge, all LPs are identified by their address regardless of the chain they use. Technically, it is possible for two different entities to occupy the same address but on different chains. For security purposes, **a contract LP is only allowed to submit withdraw requests to the WithdrawInbox on the first chain on which they added liquidity**. Note that this only restricts on which chain you can submit the withdraw request and it does not affect where the withdrawn liquidity comes from. For example, if you first added liquidity on Ethereum, then you need to submit the withdraw request to the WithdrawInbox on Ethereum. Within the request, you are still free to withdraw liquidity from BSC to Optimism.

To make sure your intended LP address is not occupied by someone else and to check which chain you can submit the withdraw request on, execute the following command:

```
curl -X GET 'https://cbridge-prod2.celer.app/v1/getLPOrigin?usr_addr=<your contract address>'
```

A response with a `chain_id`of `0` means that no LP with the given address has added liquidity. Since the address is not registered with the system, there is also no chain where you can submit a withdraw request yet, and you can proceed to [Add Liquidity](smart-contract-as-lp.md#add-liquidity) with confidence. A non-zero `chain-id` requires you to **confirm that you have control of the address on the returned `chain_id`**. If not, it means the address has been occupied by someone else and you need to use a different address.

NOTE: If you added liquidity via a smart contract / multi-sig wallet **before** we added support for withdrawal on a particular chain and receive a `0` response from the command above, **please** [**add liquidity**](smart-contract-as-lp.md#add-liquidity) **again with a small value from the same contract to register it with the system**. Only then will you be able to withdraw your previously added liquidity.

### **Contract Preparation**

Skip this step if you are using generic multi-sig wallets such as Gnosis Safe.

For custom contracts, you need to make sure they can interact with the liquidity [Pool ](https://github.com/celer-network/sgn-v2-contracts/blob/243d1e3924527c463650af9809b24d24cffe7242/contracts/liquidity-bridge/Pool.sol)and the [WithdrawInbox](https://github.com/celer-network/sgn-v2-contracts/blob/243d1e3924527c463650af9809b24d24cffe7242/contracts/liquidity-bridge/WithdrawInbox.sol) contracts. Specifically, it needs to interact with the required [Pool](https://github.com/celer-network/sgn-v2-contracts/blob/243d1e3924527c463650af9809b24d24cffe7242/contracts/interfaces/IPool.sol) and [WithdrawInbox](https://github.com/celer-network/sgn-v2-contracts/blob/243d1e3924527c463650af9809b24d24cffe7242/contracts/interfaces/IWithdrawInbox.sol) interfaces.

Here is an [example](https://github.com/celer-network/sgn-v2-contracts/blob/243d1e3924527c463650af9809b24d24cffe7242/contracts/integration-examples/ContractAsLP.sol) of a smart contract LP.

### **Add Liquidity**

Adding liquidity from contracts is relatively simple. Just call [addLiquidity](https://github.com/celer-network/sgn-v2-contracts/blob/2a9f1d6407b5face239a64c9de26e275cb54f149/contracts/Pool.sol#L57) on the cBridge contract.

### **Query Liquidity**

You can query the liquidity by:

```
curl -X GET 'https://cbridge-prod2.celer.app/v1/getLPInfoList?addr=<your contract address>'
```

Look for the `liquidity_amt` fields.

### **Send Withdrawal Request**

From your contract, call the [withdraw](https://github.com/celer-network/sgn-v2-contracts/blob/2a9f1d6407b5face239a64c9de26e275cb54f149/contracts/WithdrawInbox.sol#L29) function of WithdrawInbox.

Some explanations of the parameters:

1. `_wdSeq` is a unique identifier for each withdrawal.
2. `_receiver` is the receiver address on `_toChain`.
3. `_toChain` is the chain ID to receive the tokens withdrawn.
4. `_fromChains` are a list of chain IDs to withdraw the tokens from. We support cross-chain withdrawals, that is to withdraw the liquidity from multiple chains to a single chain.
5. `_tokens` are the token addresses on each chain. **Make sure they refer to the same token symbol and they are supported by cBridge on all the chains involved.**
6. `_ratios` are the percentages of liquidity to be withdrawn from each chain. They should be all positive. The max ratio is 100000000, which means 100%.
7. `_slippages` are the maximal allowed slippages for cross-chain withdrawals. Usually a small number such as 5000, which means 0.5%, should suffice. The max slippage is 1000000, which means 100%.

### **Query Withdrawal Request**

After the transaction has been confirmed for some period of time. Use the command below to query your withdrawal request, replace `<_wdSeq>`, `<_receiver>` and `<_toChain>` with the input parameters when you submitted the withdrawal request to WithdrawInbox. Leave `type`  as `2` and `tx_hash` empty.

```
curl -X GET 'https://cbridge-prod2.celer.app/v1/queryLiquidityStatus?seq_num=<_wdSeq>&lp_addr=<_receiver>&chain_id=<_toChain>&type=2&tx_hash='
```

Here is an example response:

```
{
  "err": null,
  "status": 2,
  "wd_onchain": "CGEQzN8EGhS1u4t/bxiD4MAf+4aXAkUy5vMjjCIUfUOqvFFcNWFFBJInzuVLYINCwK0qBDWfasA=",
  "sorted_sigs": [
    "RWOqYnYjJ7RicK+10sUJQw2N8RqD8okx7Fm0CVAxsGQCjvQzECG/5RuEvVj2DuMABqeqNutwNzQi/507NLTgchw=",
    "gT7QzODxY2jPvw1CJ01NxUsd6wGgnjEiBorjlXovpId5qgCiIddpYAlMWQobvsvOeTFwrQeTeIZt0c2UtXEryhw=",
    "EwUS55eqLuzV8VzJv49yLvuzfmLlMNWvjMHZ/0fhFoJqUZt40YjZ+wHrgOFiNjxoIcmCca6eK0RVk/afbvOn/Rs=",
    "13elR2IulcfpWsWoaSyllFxSIn4QhizBYhm3ws9XBBVSx9wkLGxWj1bZsGnL35jfuycyNfcIkTDJpqNIESVKcRw="
  ],
  "signers": [
    "afcdW46iJXHU2+JxPDGns9yk0jQ=",
    "pQACNVE4h2O3IICMCwzfAKdStp8=",
    "pSItCOb+GXa1jDYzZA/xxl87xcE=",
    "pTM822LmU58+waekF8LVXMoYHgA="
  ],
  "powers": [
    "aZYG7SZ3X4CQpYA=",
    "eDiO17/7OhWy5oA=",
    "fo+fSaavop8afu8=",
    "W2+85IicuUj4AAA="
  ],
  "block_tx_link": "",
  "block_delay": 8
}
```

A little explanation about the `status` field in the response:

`0` means no withdrawal request found. Check your query command first. If the fields were set correctly,  it is possible that your withdrawal request has not been reflected in the cBridge / SGN system yet so please retry after a little while. If it keeps being `0` after quite a while, your request is likely rejected due to bad arguments. Check the [instructions](smart-contract-as-lp.md#send-a-withdrawal-request) and try again. If you are sure the arguments are correct, it is possible that the withdraw amount is too large that it hit certain rate limits. **Please contact us before you make another try**.

`1` means the withdrawal request has been accepted, but not yet co-signed by validators. Please query again after a little while.

**`2` means the withdrawal request is ready to be submitted on-chain**. In this case, you will see a hex string in `wd_onchain` along with a number of strings in `sorted_sigs`, `signers`, `powers`.

`3` means the withdrawal request is being submitted on-chain.

`4` means the withdrawal request is completed, and tokens have been sent to the given address on the given chain if the request is not delayed due to large amount.

`5` means the withdrawal request has failed. Probably due to slippage being too small, but could be caused by other reasons such as insufficient liquidity or token transfer being disabled. **Contact us for details before you make another try**.

`6` means the withdrawal request has been delayed due to the amount being too large. It should usually turn into a `4` after about 30 minutes.

If you see a `2`, copy and save the `wd_onchain`, `sorted_sigs`, `signers` and `powers` fields for later use.

### Submit Withdrawal On-Chain

Once you have received a response with status `2`, prepare the input parameters for the on-chain withdrawal transaction. As described in the [withdraw](https://github.com/celer-network/sgn-v2-contracts/blob/2bf3c4e6287eb529fbb8bb2368f4838e5a500749/contracts/Pool.sol#L86) function, you need to supply `_wdmsg`, `_sigs`, `_signers` and `_powers`. You can use an explorer like Etherscan to send the transaction.

The `wd_onchain` you saved corresponds to `_wdmsg`. Go to [base64-to-hex](https://cryptii.com/pipes/base64-to-hex), paste `wd_onchain` on the left, switch `GROUP BY` to `NONE` on the right, add a hex prefix `0x` to the result on the right, and you will get `_wdmsg`.

> **Note:** 
For `sorted_sigs`, `signers` and `powers`, do not change the order of parameters within the arrays.


`sorted_sigs` corresponds to `_sigs`. Convert the signature strings in `sorted_sigs`one by one using the same way as with `wd_onchain`, and put all `0x` prefixed strings in an array `[]` to get `_sigs`.

`signers` corresponds to `_signers`. Prepare them the same way as `sorted_sigs`.

`powers` corresponds to `_powers`.  First, convert the strings the same way as with `wd_onchain` but this time without adding `0x` prefixes. Second, go to [hex-binary](https://cryptii.com/pipes/hex-binary), switch `CONVERT TO` to `Decimal(10)` in the middle and convert the result from the first step to decimal number. Put all the numbers you get in an array `[]` to get `_powers`.

With all the prepared parameters. Open Etherscan or whatever explorer you use, search for the cBridge address and connect to your wallet. Input the parameters to the withdraw function and send the transaction.

Note that large withdrawals might be subject to delays.
