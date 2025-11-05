# cBridge Limit Parameters

There are certain rules limiting on source and destination chains for security purposes. When transferring assets through cBridge, it's essential to check these limit parameters beforehand.

### Source Chain

#### 1.  minSend/maxSend

The sending amount range is <mark style="color:red;">(minSend, maxSend]</mark>, for Pool-based transfer, you can get the [minSend](https://github.com/celer-network/sgn-v2-contracts/blob/4d742f6c337f06777947a73accd9f78239de92ee/contracts/liquidity-bridge/Bridge.sol#L41)/[minMax](https://github.com/celer-network/sgn-v2-contracts/blob/4d742f6c337f06777947a73accd9f78239de92ee/contracts/liquidity-bridge/Bridge.sol#L42) on source chain [Bridge contract](https://github.com/celer-network/sgn-v2-contracts/blob/main/contracts/liquidity-bridge/Bridge.sol), the address is the token address on source chain.&#x20;

The screenshot is an example to get the USDC minSend Value on Ethereum.

<div align="center" data-full-width="true"><figure><img src="../.gitbook/assets/image (35).png" alt=""><figcaption><p>Example of getting the USDC minSend Value on Ethereum</p></figcaption></figure></div>

Note if the transfer token is ETH, use the WETH token address as the query key.

#### 2. pool cap

The pool cap signifies the maximum volume allowed in this pool. Once the pool cap of the source chain is reached, transfers of the token from this chain are temporarily suspended until the volume decreases below the cap.

The sending amount should be matched the rule of <mark style="color:red;">sending amount + current volume <= pool cap</mark>

To check pool cap by handling the error in [estimateAmt](api-reference/gateway-estimateamt.md) api when you quote the transfer.

The error code

```typescript
ERROR_CODE_LIQ_OVER_CAP // 1017
```

Error Message:

You can transfer up to {`remainning_amount`} {`token_symbol`} at this moment. You may reduce your transfer amount. the `remainning_amount` = `pool` -  `current volume`

{% hint style="info" %}
(Aside) The pool cap limit value can be read from the `inbound_lmt` field in the [configuration](https://cbridge-prod2.celer.app/v1/getTransferConfigsForAll) file.
{% endhint %}

### Destination Chain

#### 1. Big amount delay

If the sending amount is greater than an on-chain threshold, the transaction might be delayed for a while due to security reasons. You can retrieve these parameters from the destination chain.

delayThresholds:  [https://github.com/celer-network/sgn-v2-contracts/blob/4d742f6c337f06777947a73accd9f78239de92ee/contracts/safeguard/DelayedTransfer.sol#L15C40-L15C55](https://github.com/celer-network/sgn-v2-contracts/blob/4d742f6c337f06777947a73accd9f78239de92ee/contracts/safeguard/DelayedTransfer.sol#L15C40-L15C55)

delayPeriod: [https://github.com/celer-network/sgn-v2-contracts/blob/4d742f6c337f06777947a73accd9f78239de92ee/contracts/safeguard/DelayedTransfer.sol#L16C20-L16C31](https://github.com/celer-network/sgn-v2-contracts/blob/4d742f6c337f06777947a73accd9f78239de92ee/contracts/safeguard/DelayedTransfer.sol#L16C20-L16C31) indicates the transaction delay time in second.

#### 2. Epoch volume cap

The epoch volume cap restricts the amount of volume that can be transferred on the destination chain within a specific time frame.&#x20;

Example code of calculating the accumulated volume

```solidity
uint256 volume = epochVolumes[_token];
uint256 epochStartTime = (timestamp / epochLength) * epochLength;
if (lastOpTimestamps[_token] < epochStartTime) {
   volume = _amount; // new epoch, the total amount is current sending amount
} else {
   volume += _amount; // last brdige is within the current time frame,last volume should be accumulated to total volume
}
require(volume <= cap, "volume exceeds cap");
```

You can obtain the `epochVolumeCaps` , `lastOpTimestamps`, `epochLength` and corresponding token `epochVolumes` from the [VolumeControl](https://github.com/celer-network/sgn-v2-contracts/blob/main/contracts/safeguard/VolumeControl.sol) Contract, which has been implemented by the Bridge Contract. The accumulated volume in this period must be lower than the value specified by the "`epochVolumeCaps`".&#x20;

<div align="center"><figure><img src="../.gitbook/assets/image (36).png" alt=""><figcaption><p>Example of getting epochVolumeCaps from Ethereum pool.</p></figcaption></figure></div>

