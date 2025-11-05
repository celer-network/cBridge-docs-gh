# cBridge Transfer Web Widget

To make widget integration simple, we provide complete source files which support cBridge transfer.

1. Download source files from [cBridgeTransferWidgetRepo](https://github.com/celer-network/cBridge-transfer-widget)
2. Compare package.json with your own package.json and inject all needed dependencies
3. Put files from <mark style="color:blue;">public, scripts</mark> and <mark style="color:blue;">src</mark> folder inside your project where is easy to manage.
4. Inside the src folder, there is a cBridgeTransferWidget.tsx file. You may import it wherever you want to put and use CBridgeTransferWidget as an element inside your web project.
5. Copy .env.test to .env. cBridge transfer widget uses values inside .env. If .env is missing or mis-configured, interface error alert will appear.

### Run Sample

To give a quick experience about cBridge transfer widget, we create a sample index.js and App.js inside the src file folder.&#x20;

1. run  `npm install` or `yarn install` inside cBridget transfer widget root folder on console
2. run `cp .env.test .env` on console (Don't skip, otherwise you will see interface error)
3. run `npm start` or `yarn start`&#x20;

### Import cBridgeTransferWidget

```javascript
/// Adjust import path according to your project
import { Provider } from "react-redux";
import store from "./redux/store";
import CBridgeTransferWidget from './cBridgeTransferWidget';

/// Put following code where you need
<div>
   <Provider store={store}>
      <CBridgeTransferWidget />
   </Provider> 
</div>
```

### Launch Production Environment

Once your project with transfer widget is ready for production launch, you need to contact us for production chain and token white list which is pre-defined [here](https://github.com/celer-network/cBridge-transfer-widget/blob/main/src/constants/chains_mainnet.ts). According to your project requirement, you will have a specific white list. Once you replace existing  chains\_mainnet.ts with this special white list and copy .env.mainnet to .env, you can do some test on production environment and prepare for production launch.
