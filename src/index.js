import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Mint from './page/Mint'
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from './wallet/wallet'
import MetamaskProvider from './wallet/useEagerConnect'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetamaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mint />} />
          </Routes>
        </BrowserRouter>
      </MetamaskProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
