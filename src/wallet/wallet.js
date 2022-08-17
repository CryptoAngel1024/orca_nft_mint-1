import Web3 from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
const chainID = 4;

export const MetaMaskconnector = new InjectedConnector({ supportedChainIds: [chainID] });

export const walletconnect = new WalletConnectConnector({
  rpc: { chainID: `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}` },
  chainId: chainID,
  supportedChainIds: [chainID],
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

export const getLibrary = provider => {
  return new Web3(provider);
}