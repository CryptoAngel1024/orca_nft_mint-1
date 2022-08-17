import React, { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import WalletButton from '../component/WalletButton'
import ABI_MINT from '../config/mint.json'
import Web3 from 'web3'
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWeb3React } from '@web3-react/core'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Mint = () => {
  const [wlSupply, setWlSupply] = useState(0);
  const [pubSupply, setPubSupply] = useState(0);
  const [ogSupply, setOgSupply] = useState(0);
  const [wlSalePrice, setWlSalePrice] = useState(0);
  const [ogSalePrice, setOgSalePrice] = useState(0);
  const [publicSalePrice, setPublicSalePrice] = useState(0);
  const [ogMinted, setOgMinted] = useState(0);
  const [wlMinted, setWlMinted] = useState(0);
  const [publicMinted, setPublicMinted] = useState(0);
  const [amount2, setAmount2] = useState(1)
  const [amount3, setAmount3] = useState(1)
  const [isWhiteList, setIsWhiteList] = useState(false)
  const web3 = new Web3("https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")
  const { active, account } = useWeb3React()

  const mintContract = new web3.eth.Contract(ABI_MINT, `${process.env.REACT_APP_NFT}`);
  useEffect(() => {
    getWlSupply();
    getPubSupply();
    getOgSupply();
    getWlPrice();
    getPubSalePrice();
    ogWhitelistPrice();
    getOgMinted();
    getWlMinted();
    getPublicMinted();
  }, []);

  useEffect(() => {
    if (active) {
      fetch('/wallet.txt')
      .then((r) => r.text())
      .then(text  => {
        let whitelist = text.split(/\r?\n/)?.filter(element => element);
        let result = whitelist.find(element => element === account.toString())
        console.log('result', result)
        if(result) {
          setIsWhiteList(true)
          toast.success('wallet whitelisted!');
        } else {
          setIsWhiteList(false)
          toast.warning('wallet not whitelisted!');
        }
      })
    }
  }, [active])

  // GET MINTED NFTS
  const getOgMinted = async () => {
    const total = await mintContract.methods.ogSupply().call();
    setOgMinted(total)
  }
  const getWlMinted = async () => {
    const total = await mintContract.methods.supplyWhitelist().call();
    setWlMinted(total)
  }
  const getPublicMinted = async () => {
    const total = await mintContract.methods.supply().call();
    setPublicMinted(total)
  }
  // GET SUPPLIES
  const getWlSupply = async () => {
    const total = await mintContract.methods.maxWhitelistSupply().call();
    setWlSupply(total)
  }
  const getPubSupply = async () => {
    const total = await mintContract.methods.maxPublicSupply().call();
    setPubSupply(total)
  }
  const getOgSupply = async () => {
    const total = await mintContract.methods.maxOGSupply().call();
    setOgSupply(total)
  }
  // GET PRICES
  const getWlPrice = async () => {
    const prePrice = await mintContract.methods.whitelistPrice().call();
    setWlSalePrice(web3.utils.fromWei(prePrice, 'ether'))
  }
  const getPubSalePrice = async () => {
    const pubPrice = await mintContract.methods.publicPrice().call();
    setPublicSalePrice(web3.utils.fromWei(pubPrice, 'ether'))
  }
  const ogWhitelistPrice = async () => {
    const ogPrice = await mintContract.methods.ogWhitelistPrice().call();
    setOgSalePrice(web3.utils.fromWei(ogPrice, 'ether'))
  }
  const decrementMintHandler = (type) => {
    if (type === 2) {
      if (amount2 > 1) {
        setAmount2(amount2 - 1);
      }
    }
    if (type === 3) {
      if (amount3 > 1) {
        setAmount3(amount3 - 1);
      }
    }

  };
  const incrementMintHandler = (type) => {
    if (type === 2) {
      if (amount2 + 1 <= 3) {
        setAmount2(amount2 + 1);
      }
    }
    if (type === 3) {
      if (amount3 + 1 <= 3) {
        setAmount3(amount3 + 1);
      }
    }
  };

  return (
    <div className="h-screen">
      <div className="text-white flex items-center border-b border-black justify-center px-8 bg-blue-860 backdrop-blur">
        <div className="flex items-center justify-center space-x-8 py-6 text-xl font-bold">
          <div className="text-blue-460 text-4xl text-center">ORCA NFT AI MINT PAGE</div>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col space-y-5 mt-4">
        <div className="text-white border rounded-xl w-1/2 mx-auto flex flex-col p-4 space-y-3 border-black  bg-mintOG-100 bg-opacity-95">
          <div className="text-3xl text-center font-bold">OG Whitelist</div>
          <div className="text-xl text-darkred-100 text-center underline">Only for discord roles @Antartica and @Subantartica</div>
          <div className="text-xl text-center">Minted {ogMinted}/{pubSupply} Total </div>
          <div className="text-xl text-center">Price: <b>{ogSalePrice} ETH</b> / Maximum per Wallet: <b>1 NFT</b></div>

          <div className="w-72 mx-auto flex justify-center"><WalletButton price={ogSalePrice} mintType={1} amount={1} isWhiteList={isWhiteList} /> </div>
        </div>

        {isWhiteList && <div className="text-white border rounded-xl w-1/2 mx-auto flex flex-col p-4 space-y-3 border-blue-460 bg-blue-800 bg-opacity-95">
          <div className="text-3xl text-center font-bold">Whitelists</div>
          <div className="text-xl text-darkred-100 text-center underline">Only for WL winners and WL collabs</div>
          <div className="text-xl text-center">Minted {wlMinted}/{pubSupply} Total </div>
          <div className="text-xl text-center">Price:<b>{wlSalePrice} ETH</b> / Maximum per  wallet: <b>3 NFT</b> </div>
          <div className="flex py-2 justify-center">
            <button
              className="bg-blue-450 w-12 h-12 border-2 hover:bg-blue-460 border-white text-white rounded-xl shadow flex justify-center items-center"
              onClick={() => {
                decrementMintHandler(2);
              }}
            >
              <div className="text-xl">
                <FontAwesomeIcon icon={faMinus} />
              </div>
            </button>
            <input
              type="text"
              className="border-2 w-32 border-black 0 rounded-xl shadow mx-8 text-center text-blue-850 text-3xl"
              value={amount2}
              onChange={(e) => setAmount2(e.target.value)}
            />
            <button
              className="bg-blue-450 w-12 h-12 border-2  hover:bg-blue-460 border-white text-white rounded-xl shadow flex justify-center items-center"
              onClick={() => {
                incrementMintHandler(2);
              }}
            >
              <div className="text-xl">
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </button>
          </div>
          <div className="w-72 mx-auto flex justify-center"><WalletButton price={wlSalePrice} mintType={2} amount={Number(amount2)} isWhiteList={isWhiteList} /> </div>
        </div>}

        <div className="text-white border rounded-xl w-1/2 mx-auto flex flex-col p-4 space-y-3 border-black bg-mintPub-100 bg-opacity-95">
          <div className="text-3xl text-center font-bold">PUBLIC</div>
          <div className="text-xl text-center">Minted {publicMinted}/{pubSupply} Total </div>
          <div className="text-xl text-center">Price: <b>{publicSalePrice} ETH</b> / Maximum per wallet: <b>3</b> NFT </div>
          <div className="flex py-2 justify-center">
            <button
              className="bg-blue-450 w-12 h-12 border-2 hover:bg-blue-460 border-white text-white rounded-xl shadow flex justify-center items-center"
              onClick={() => {
                decrementMintHandler(3);
              }}
            >
              <div className="text-xl">
                <FontAwesomeIcon icon={faMinus} />
              </div>
            </button>
            <input
              type="text"
              className="border-2 w-32 border-blue-450 rounded-xl shadow mx-8 text-center text-blue-850 text-3xl"
              value={amount3}
              onChange={(e) => setAmount3(e.target.value)}
            />
            <button
              className="bg-blue-450 w-12 h-12 border-2  hover:bg-blue-460 border-white text-white rounded-xl shadow flex justify-center items-center"
              onClick={() => {
                incrementMintHandler(3);
              }}
            >
              <div className="text-xl">
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </button>
          </div>
          <div className="w-72 mx-auto flex justify-center"><WalletButton price={publicSalePrice} mintType={3} amount={Number(amount3)}  isWhiteList={isWhiteList}/> </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Mint;