# cBridge APIs for Sui

The Sui platform seeks to provide a flexible network that you can leverage to shape the web3 landscape, which is derived from the core [Move](https://github.com/MystenLabs/awesome-move) programming language. If you want to learn more about Sui, please refer to the official document here [https://docs.sui.io/learn](https://docs.sui.io/learn). Here is the guideline on how to integrate the Sui chain and support the Sui asserts bridge via cBridge from the front-end perspective.

## Environments

TypeScript SDK： [https://github.com/MystenLabs/sui/tree/main/sdk/typescript](https://github.com/MystenLabs/sui/tree/main/sdk/typescript)

**Mainnet**

Explorer: [https://explorer.sui.io/](https://explorer.sui.io/)

Public RPC: [https://fullnode.mainnet.sui.io:443](https://fullnode.mainnet.sui.io)

State:

<table><thead><tr><th width="233">State</th><th>ID</th></tr></thead><tbody><tr><td>bridge_state</td><td><p>0x638553f133a7f8ea32144b7c540bb911ec9d8839977334ad805a3b229fb01e24</p><p><br></p></td></tr><tr><td>peg_bridge_state</td><td>0x835006a934bb8ce4b21fb4ce641d5a933677024bc1b88219023dabcbbc8f55b9</td></tr><tr><td>vault_state</td><td>0x9bb92383797509d1e6d22b9de1437080d38ae5b3b8562bf4234175ae56e30a6a</td></tr><tr><td>delayed_transfer_state</td><td>0x4ba21830c4f493c73d6560aa17484568e7341dbcd8836ee39822a09894531aa6</td></tr><tr><td>volume_control_state</td><td>0x668fc25c9e15e3c1d7d40bed2027103f56c62d983ee870469ad9aa8ad83420e2</td></tr></tbody></table>

**Testnet**

Explorer: [https://explorer.sui.io/](https://explorer.sui.io/)

Public RPC: [https://fullnode.testnet.sui.io:443](https://fullnode.testnet.sui.io)

<table><thead><tr><th width="223">State</th><th>ID</th></tr></thead><tbody><tr><td>bridge_state</td><td>0x20f19ee09c0eccd68c7a01c9c1066cdd79ad24710ba8fab5c71d03cd3990d145</td></tr><tr><td>peg_bridge_state</td><td>0x0353fc2b9be71f0ce7749905297e7dc4945dbd36a2f8d17f329fd238ab841305</td></tr><tr><td>vault_state</td><td>0xeef5a6527c48a94d6e0e9ad46202ca2ddfafec01957218f209dc3d711efecdee</td></tr><tr><td>delayed_transfer_state</td><td>0x34e4218169de9993c6c24b9be18436197ec61db81709bdb156aa3c6e309fab8d</td></tr><tr><td>volume_control_state</td><td>0x1b1578ae3134dd6d527c24dcebae5fe97f6b1b00ec7d95f5a9900f808881fe60</td></tr></tbody></table>

## Bridges

In most scenarios Sui is the pegged chain, the token is bridged from the other chains like Ethereum. All support tokens you can get from the JSON path “pegged\_pair\_configs” at this link:[https://cbridge-prod2.celer.app/v1/getTransferConfigsForAll](https://cbridge-prod2.celer.app/v1/getTransferConfigsForAll)(testnet: [https://cbridge-v2-test.celer.network/v1/getTransferConfigsForAll](https://cbridge-v2-test.celer.network/v1/getTransferConfigsForAll))

For example, consider a bridge pair `{fromChain: Ethereum Mainnet, toChain: Sui Mainnet, Token: USDC}`. Ethereum Mainnet serves as the original chain, while Sui Mainnet acts as the pegged chain. To bridge USDC from Ethereum Mainnet to Sui, you need to interact with the Ethereum Mainnet Vault contract to deposit the USDC. Once the deposit on the source chain is received and verified by the [SGN (State Guardian Network)](https://cbridge-docs.celer.network/introduction/sgn-and-cbridge), the USDC will be minted on the destination chain shortly after. If you wish to bridge the USDC back to Ethereum from Sui, you can call the burn method on Sui to burn the USDC tokens on-chain. This process ensures a similar level of safety when withdrawing the tokens back to Ethereum.

### Get tokens balance

Get SUI (gas token) balance

```typescript
const provider = new JsonRpcProvider(connection);
const result = await provider.getBalance({
    owner: suiAddress,
    coinType: tokenAddrWith0xPrefix,
});
```

\
For other tokens

```typescript
const tx = new TransactionBlock();
const provider = new JsonRpcProvider(connection);
const coins = await provider.getCoins({
    owner: address, // wallet address
    coinType: // token address with "0x"
});

```

Note that Sui stores the token information in split objects. Therefore, it is necessary to merge all the split objects into a single base object to ensure a sufficient balance for later bridging.

```typescript
// merge coins
const baseCoin = tx.object(coins[0].coinObjectId);
tx.mergeCoins(
    baseCoin,
    coins.slice(1).map(coin => tx.object(coin.coinObjectId)),
);
```

### Quote the bridging fees

Use the cBridge quote API to get the estimated received amount and fees,&#x20;

Refer to this doc:

[https://cbridge-docs.celer.network/developer/api-reference/gateway-estimateamt](https://cbridge-docs.celer.network/developer/api-reference/gateway-estimateamt)

### Sui Token burn

Used for burning a token on Sui when Sui is a pegged chain.

Example code:

```typescript
const coins = tx.splitCoins(baseCoin, [tx.pure(amount.toString())]);
tx.moveCall({
  target: `0x${peggedBridgeContractAddress}::peg_bridge::burn`,
  arguments: [
    coins[0],
    tx.pure(destinationChainId),
    tx.pure(Array.from(ethers.utils.arrayify(receiverAddress)), "vector<u8>"),
    tx.pure(nonce),
    tx.object(suiConfig.peg_bridge_state),
    tx.object(mintTcId),
    ],
  typeArguments: [tokenAddressWith0x], // ["0x2::sui::SUI"],
});
provider?.signAndExecuteTransactionBlock({
  transactionBlock: tx,
  options: {
    showContent: true,
  },
});
```

> Note that as opposed to the `mergeCoin` method, before the transaction happened, you must split the coin into different objects first.

`Nonce`: uniq for the transaction, you can also use the timestamp as the nonce.

`mintTcId`: get the mintTcId from this code

```typescript
export const getMintTcId = async (tokenAddress: string) => {
  const provider = new JsonRpcProvider(connection);
  const result2 = await provider.getObject({
    id: peg_bridge_state,
    options: {
      showContent: true,
    },
  });
  const parentId = (result2 as any)?.data?.content?.fields?.coin_map?.fields?.id?.id;
  const configResult = await provider.getDynamicFieldObject({
    parentId,
    name: {
      type: "0x1::string::String",
      value: tokenAddress,
    },
  });
  return (configResult as any)?.data?.content?.fields?.value?.fields.mint_tc_id || "";
};
```

### Query bridge status from SGN

cBridge allows tracking the status of the bridge at each stage. You can retrieve this information using the getTransferStatus API. For more details, please refer to the documentation at: [https://cbridge-docs.celer.network/developer/api-reference/gateway-gettransferstatus](https://cbridge-docs.celer.network/developer/api-reference/gateway-gettransferstatus).&#x20;

The `transferId` is designed to generate a unique identifier for tracking the states. However, it's important to note that the rules for Sui differ from those of other chains.

```typescript
const receiverAddressWithout0x = this.transferData.toAccount.replace("0x", "");

const transferId = ethers.utils.solidityKeccak256(
    [
      "bytes32",
      "string",
      "uint64",
      "uint64",
      `bytes${Math.floor(receiverAddressWithout0x.length / 2)}`,
      "uint64",
      "uint64",
      "bytes32",
      "string",
    ],
    [
      suiWalletAddress, /// Sui wallet address, 32-byte hexString
      sourceTokenAddress, /// the token address on the source chain
      amount, /// Transfer amount
      DestinationChainId, /// Destination chain id
      `0x${receiverAddressWithout0x}`, /// Receiver address which length may vary based on different chains
      this.nonce.toString(), /// Nonce
      fromChainId, /// Source chain id
      `0x${peggedBurnContractAddress}`, /// get from pegged_burn_contract_addr field(getTransferConfigsForAll API), 32-byte hexString
      "peg_bridge", /// hardcoded message
    ],
);
```

You can get the `sourceTokenAddress,peggedBurnContractAddress`from the [getTransferConfigsForAll](https://cbridge-prod2.celer.app/v1/getTransferConfigsForAll)

### Bridging Limits

Get token burn minimum/maximum amount.

```typescript
 const provider = new JsonRpcProvider(connection);
 const result = await provider.getObject({
      id: suiConfig.peg_bridge_state,
      options: {
        showContent: true,
      },
  });
 const parentId = (result as any)?.data?.content?.fields?.coin_map?.fields?.id?.id;
 const configResult = await provider.getDynamicFieldObject({
      parentId,
      name: {
        type: "0x1::string::String",
        value: token?.address,
      },
 });

 const resultJson = (configResult as any)?.data?.content?.fields?.value?.fields;
 //  min_burn: resultJson?.min_burn
 // max_burn: resultJson?.max_burn
```

\
The token the user burn shouldn’t exceed the total supply, the method of getting the total supply.

<pre class="language-typescript"><code class="lang-typescript">const provider = new JsonRpcProvider(connection);
const mintTcId = await getMintTcId(suiConfig.peg_bridge_state, tokenAddress);
const result = await provider.getObject({
  id: mintTcId,
<strong>  options: {
</strong>    showContent: true,
  },
});
const resultJson = (result as any)?.data?.content?.fields?.cap?.fields?.total_supply?.fields?.value;
</code></pre>

\
