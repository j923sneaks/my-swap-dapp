import { useState, useContext, useCallback } from 'react';
import { NetworkContext } from '../context/Network';

import { Button, Tooltip } from '@mui/material';

import { shortAddress, copyToClipboard } from '../misc/helpers';

const buttonStyle = { color: 'common.white', borderColor: 'common.white', textTransform: 'none' };

const AccountConnector = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { account, setAccount, web3 } = useContext(NetworkContext);

  const handleClick = useCallback(async () => {
    setIsLoading((prevLoading) => !prevLoading);

    try {
      // loading can be stuck in limbo if user cancels / exits the popup. Refresh and retry will cause error
      const [currentAccount] = await web3.eth.requestAccounts();

      setAccount(currentAccount);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading((prevLoading) => !prevLoading);
    }
  }, [web3]);

  return account ? (
    <Tooltip title="Copy to clipboard">
      <Button variant="outlined" sx={buttonStyle} onClick={() => copyToClipboard(account)}>
        {shortAddress(account)}
      </Button>
    </Tooltip>
  ) : (
    <Button
      sx={{ bgcolor: 'primary.light' }}
      variant="contained"
      disabled={isLoading}
      onClick={handleClick}
    >
      Connect Wallet
    </Button>
  );
};

export default AccountConnector;
