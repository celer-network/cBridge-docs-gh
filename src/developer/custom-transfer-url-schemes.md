
# Custom Transfer URL Schemes

## Scheme example

To build a custom transfer url scheme, you only need to provide 3 values: <mark style="color:purple;">sourceChainId</mark>, <mark style="color:purple;">destinationChainId</mark> and <mark style="color:purple;">tokenSymbol</mark>. The format of the url is <mark style="color:red;">**https://cbridge.celer.network/sourceChainId/destinationChainId/tokenSymbol**</mark>. For example, if you want users to transfer xToken from Ethereum Mainnet to Arbitrum, you can use this link:[ ](https://cbridge.celer.network/1/42161/XTK)[https://cbridge.celer.network/1/42161/XTK](https://cbridge.celer.network/1/42161/XTK). After user clicks the link, cBridge website will provide a well-defined UI for the user.

<table><thead><tr><th>Parameter</th><th>Value</th><th data-hidden></th></tr></thead><tbody><tr><td>sourceChainId</td><td>e.g 1 as Ethereum Mainnet</td><td></td></tr><tr><td>destinationChainId</td><td>e.g 42161 as Arbitrum</td><td></td></tr><tr><td>tokenSymbol</td><td>e.g XTK as xToken</td><td></td></tr></tbody></table>

## Find Correct Chain Id and Token Symbol

You can use [chainlist](https://chainlist.org/) to find correct chain id and use cBridge website to find correct token symbol. We are eager to help if you find any difficulty creating custom url

![](<../.gitbook/assets/image (54).png>)![](<../.gitbook/assets/image (78).png>)

## Non-EVM chain case

Since cBridge supports bridge between EVM chain and Non-EVM chain, such as Ethereum Mainnet and Flow Mainnet, our SGN reserves numbers for Non-EVM chains. Here is a sample link for Ethereum and Flow, [https://cbridge.celer.network/1/12340001/USDT](https://cbridge.celer.network/1/12340001/USDT)
