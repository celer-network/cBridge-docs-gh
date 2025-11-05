---
description: >-
  In this tutorial, we will guide you through the process of making a
  cross-chain transfer of USDC from Ethereum Mainnet to Flow EVM.
---

# Flow EVM Bridging Guide

## Connect Your Wallet

Before you start transferring assets via [cBridge](https://cbridge.celer.network/1/747/USDC-intermediary), you will need to connect your wallet.

1\. Click "Connect Wallet", and you will be prompted to select a wallet. (cBridge now supports MetaMask, TokenPocket, Coinbase Wallet, WalletConnect, Clover and OKX Wallet on desktop browsers).

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXcm2wXsocvdWYQdlxz8NxDvxzj9H4CHm3ZLDJVevsQn7QNppS8qNA17NfDWy4wu0PjSjJYshqZ3wEUzyJPF2psrHfxVjfxSuRiG3oiHeYHu050majpUufknFnhau-Cr2y4CP38NgaydX-nAAd-OJWYcQGG1?key=hA7YVnSfAyd3H34hw9RbNg" alt="" width="563"><figcaption></figcaption></figure>

2\. Select your wallet.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXfWa2KKrG5fEj19ERjf38WagmnEJMslCm-NwTDcb-4W3l-unOA3IfaYzY-xxjtSpxpwUjddycf3IEAfobWsm_VkY4OcPrMl8y1r7UxpP43hkuog0jjL-hDIfw3JpS4JIXaN8kxuFcy2Yh54Bef0Wx-xXbQ?key=hA7YVnSfAyd3H34hw9RbNg" alt="" width="375"><figcaption></figcaption></figure>

3\. Allow cBridge to connect with your wallet.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXc3NaJPJAHuQJnNCEpxQhWGToL1ELFH_5CvyjvGTrwKaKfv4-QVXUZlfAazctaGiKjUkunIGRVk0lx3FhsFBJ0493i9W1wl8qu55rJzAYFEqfqAiVZnofq_x7xDDu8Sa9_b8aKwyL4FmKNGntEbv7Vl6dZI?key=hA7YVnSfAyd3H34hw9RbNg" alt="" width="188"><figcaption></figcaption></figure>

4\. Grant permissions to cBridge with necessary access to deliver the bridging actions accordingly.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXe8h_8wtYEfPrli-3Rzyz77X9sowOY5G2sRRYxXYTccnnFeo7T9I7nAu6uQoitjADNLiV1iw-FdPk_TvbdHy-tf-6bF169nn-GaEl3MhkkhnJud1opFAjCTKHDNbbWYKLfG2pZCTxCOSiHJWmg54tY3oJo?key=hA7YVnSfAyd3H34hw9RbNg" alt="" width="188"><figcaption></figcaption></figure>

## Transfer Assets Across Chains

Let’s assume you want to transfer 100 USDC from Ethereum Mainnet to Flow EVM. The steps are made simple in cBridge:

1\. Select "Ethereum Mainnet" in the dropbox next to "From" and "Flow EVM" in the dropbox next to "To".

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXca0szKL2JgEg7JexD6WIJp3CtRMDuNfzpL9v5OKVa2b3uPzC-SHrJp1ZJQZnLV1zStm3L_rUV5H2ET6KNTbD2xux6rSOVnc4Xd6XK9ljTDKy5fUR959HPSnBusYau0OZT7UqAVKEzo4ndkWbhdtX9W6EcI?key=hA7YVnSfAyd3H34hw9RbNg" alt="" width="563"><figcaption></figcaption></figure>

2\. Enter the amount you want to send. You should see the estimated amount you will receive under “Receive (estimated)”.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXdLZjOVxRym3ikFpZJlwBFrKNhL7cJcL-OLVIBhzSLbX826ncI__YLSvdibf5t6S5ZSw2TBcrzmJn7i3yBiMYlRhINauZZIstcrxZKyQy09Xfl-i3jN1sHSo7kuxKe6A6AFOeVdt1bnN3PDYmmV3dEjrc8?key=hA7YVnSfAyd3H34hw9RbNg" alt="" width="563"><figcaption></figcaption></figure>

Note that there will be a difference between the amount you send and the amount you receive, which is determined by the bridge rate and fees. For the exact definition of each item in the transaction, check the tooltips next to each of the terms.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXfUAshPIqpPQuwCCHXXwrveFpjFClgqaG921P20LupcMTMP3poFBjCHR9xqJS2vTttSFHQ7uvxb-EydEZV8tGxT5pAmLAfcQpD4DOhNV7BWlC295uiDO8VmmahA27UieLAuZPm63TM09wpauaPNG9NDtQc?key=hA7YVnSfAyd3H34hw9RbNg" alt="" width="563"><figcaption></figcaption></figure>

3\. Approve the token - You must give cBridge smart contracts permission to use your token (i.e. USDC in this case), which is an on-chain tx that consumes gas.&#x20;

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXeAPQWx-lIyfEKeGjbBbq57t9M1Jt6BWZxUwLynAu_LOX4Qz0JqnkJhkOS0Bqpn0tNUjRZZ8nU9IG_3-hTkoOX7a3hcrxxP2V9-EYeNQposH4ZAbbPTRm8xWK_wH_A94d3kEHYgNSYBcJ7AjJFkQmaWR-Ud?key=hA7YVnSfAyd3H34hw9RbNg" alt="" width="563"><figcaption></figcaption></figure>

4\. Once the token is approved, you can then review the transfer details. As you agree to proceed the bridging in accordance with the stated transfer details, click “Transfer”. You will receive a popup window to confirm the transfer.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXfXKRktgziQIEOrFxWLIja1OD7V_QBKJx0U8H-E2ceaYAqAoOTjsh_ll1SCKoM9J8KP7KxnP_FdO7c5TmqzFbZXmoCh1fbM0XOHPPcdNcjISDEzEAUnO8n1O7XGlTrmrLYuyGO8IFihNeIBJnLB3yusPglR?key=hA7YVnSfAyd3H34hw9RbNg" alt="" width="563"><figcaption></figcaption></figure>

5\. Make a final review and click the “Confirm Transfer” button. Then you will be prompted with a confirmation on your wallet extension.

<figure><img src="../.gitbook/assets/Screenshot 2024-10-17 at 1.36.21 PM.png" alt="" width="460"><figcaption></figcaption></figure>

6\. Once clicked “Confirm” on the wallet interface, the transaction will be submitted. The cBridge page will also show a “Transfer submitted” window as shown below. Please wait for a few minutes as the bridging is in progress.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXf7XYvFfVgCFoZGrUlQf3liW965NKTwmic-KsN8Mbpwh2RJmpp9eAicVecw02GzGP5H36iettpqZpUD2xE5eruXjem8Zl-drBfPGCH_LoLf1xPUKRGKE6F-tvb9Ip1SfM-noKzYtp_cDJ2naBLrbvdIQenZ?key=hA7YVnSfAyd3H34hw9RbNg" alt="" width="188"><figcaption></figcaption></figure>

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXccZlZA5IgZWE_125o7HIvKzaZh4hHQZsu_BAY5_ucFU3rkydz3CSTa_LfMq_TSkpODJavC6p-3MoKByOVlW6k_wrftUFNnrFk-fyyAUJYiZ2GEMI1S9lciAdWHWtXnUaua8OhAXFdQBs0E6-pLyC73aL9S?key=hA7YVnSfAyd3H34hw9RbNg" alt="" width="375"><figcaption></figcaption></figure>

7\. You can check the transaction status by clicking the “History” button.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXfYvjNh4ZsaUZWfyzq_V2iRdUFaxm1R3j5UpU4UKKJfbS1i76X5Pu4QtVz9CSMikzcN9hHHAm2sw1myc0yU5ouyZ5rBtmmWxtPtymLDukzwm38CwBW3u1B2LtkNDhHbk0oTyoxX_rS4zh_ayBVqhlDbhHGc?key=hA7YVnSfAyd3H34hw9RbNg" alt="" width="563"><figcaption></figcaption></figure>

8\. Here are some examples of the transaction statuses. When it shows Completed, it means that the wallet on Flow EVM has received the token.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXeFjMB2sdMI74lKxEioDcA0v5OebGPlwhzAC7oVvq7p0UepZnj01enVzjHeCgjHDQKJEbxCZxuT0KzzJaH6wQqZOpOyRxCOy_T3ux8Drl8qRAer_jcrMjhzoxagwzjzyQffS_oPi1BddbpkQJ0uQScnyow?key=hA7YVnSfAyd3H34hw9RbNg" alt="" width="563"><figcaption></figcaption></figure>

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXd1-iyEaem95-wVKlKE_1e5ZbSLqrUtkirEYpx7rMOyg89UJLWP49vrlg9A9aO6NhS9DNpcC9defktf3ip2l0hRgwYfsNmMObMYzaUaxJMxlCRMG-23V35fV1OBI57fSl4rjzQym_RitXy-2bh-uX99Fuyk?key=hA7YVnSfAyd3H34hw9RbNg" alt="" width="563"><figcaption></figcaption></figure>

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXfthDUvpNZ6byP0wcZ5jr8SpqlWMLAIoHztpvb1iqOgUIcT0MHjAlh4ZwR0dxlqmv2yn9OqzEjtlvWTWPJSzvgJVTvNvcSEzhYbHRemsu8qlwWr9MTIdzG9y_LatMJxa8E6c-QpMSoxq4itKS3S9fduYD0_?key=hA7YVnSfAyd3H34hw9RbNg" alt="" width="563"><figcaption></figcaption></figure>

9\. You can also check the received token through the wallet.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXe37rB9kWVPcoFj5-HL3QLBfD9iwM3aTWf1nLK5KBG0CfEO1k0RW5RZTB5B97cJmLj3giph3VUJ62IQy2qF0yXF0MuS3TaJRp1DbPgmF0kx88CZ5cgAQyQw2jJdb70fsCkGsnzHKZWrpLzByhEZ7Mc22Ng?key=hA7YVnSfAyd3H34hw9RbNg" alt="" width="188"><figcaption></figcaption></figure>

