import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const filecoinCalibration = {
  id: 314159,
  name: 'Filecoin - Calibration ',
  network: 'Filecoin — Calibration testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'tFIl',
    symbol: 'tFIL'
  },
  rpcUrls: {
    default: 'https://filecoin-calibration.chainup.net/rpc/v1'
  },
  testnet: true
}

const { chains, provider } = configureChains(
  // [BTTChain],
  [filecoinCalibration, polygonMumbai, optimism, arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains} theme={darkTheme()}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RainbowKitProvider>
  </WagmiConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
