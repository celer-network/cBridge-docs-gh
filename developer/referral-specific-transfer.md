---
description: >-
  Referral code is treated as the provider mark for a transfer. To provide a
  better insight about users' transfer behavior, you can attach your referral
  code to cBridge gateway.
---

# Referral Specific Transfer

## Referral code inside cBridge website

You can attach your referral code to cBridge website. When user uses the URL with referral code, cBridge website will help build relationship between your referral code and user's on-chain transaction. Here is the sample link for the referral code&#x20;

```
https://cbridge.celer.network/#/transfer?ref={your_provider_name}
```

{% hint style="info" %}
Please use the correct parameter key for referral code, which is <mark style="color:red;">ref</mark>. Otherwise, cBridge website will not recognize your referral code
{% endhint %}

## Referral code through cBridge SDK

When integrating with cBridge SDK, you can establish relation between your ref code and user's on-chain transaction by posting [markRefRelation](api-reference/gateway-markrefrelation.md) request to cBridge gateway. You may refer [this](api-reference/gateway-markrefrelation.md) for more details.
