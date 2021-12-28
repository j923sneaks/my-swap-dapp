import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Web3 from 'web3';

import MySwap from '../abis/MySwap.json';
import Addresses from '../misc/addresses.json';

export const NetworkContext = createContext({
  account: '',
  setAccount: () => {},
  web3: null
});

/**
 * todo 
 * - get chain id and get mySwap token address?
 */
export const Network = (props) => {
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState();
  const [mySwap, setMySwap] = useState();

  useEffect(async () => {
    try {
      let provider = window.ethereum;

      if (provider) {
        // add networkChanged listener and check if correct network?
        provider.on('accountsChanged', ([newAccount]) => setAccount(newAccount));

        if (!web3) {
          setWeb3(() => new Web3(provider));
        }

        const [currentAccount] = await web3.eth.requestAccounts();

        setAccount(currentAccount);

        const mySwapInstance = new web3.eth.Contract(
          MySwap.abi,
          Addresses.development.mySwap // contract address depends on network?
        );

        setMySwap(mySwapInstance);
      } else {
        throw new Error('NO_WEB3');
      }
    } catch (err) {
      console.log(err);
    }
  }, [web3]);

  return (
    <NetworkContext.Provider value={{ account, setAccount, web3, mySwap }}>
      {props.children}
    </NetworkContext.Provider>
  );
};

Network.propTypes = { children: PropTypes.array };
