import { useState, useContext, useEffect, useRef } from 'react';
import { NetworkContext } from '../context/Network';

import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  CardActions,
  Button,
  Divider,
  CardHeader
} from '@mui/material';

import Notifications from './Notifications';

import { AMOUNT_PATTERN } from '../misc/constants';

const amountInputProps = { inputMode: 'numeric', pattern: AMOUNT_PATTERN };

const SwapForm = () => {
  const [formData, setFormData] = useState({});
  const [formErrorState, setFormErrorState] = useState(true);
  const formRef = useRef();
  const { account, web3, mySwap } = useContext(NetworkContext);

  useEffect(() => console.log('rendered'));

  useEffect(() => setFormErrorState(!formRef.current.checkValidity()), [formData]);

  const handleInput = (event) => {
    const { name, value } = event.target;

    // to update render (i.e. disabled) (perf issues?)
    setFormData({ ...formData, [name]: value });
  };

  // todo more validation? get token address?
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { owner2, token1, token2, amount1, amount2 } = formData;

    console.log(formData);

    try {
      // convert to wei to Big Number
      const amount1BN = web3.utils.toBN(web3.utils.toWei(amount1));
      const amount2BN = web3.utils.toBN(web3.utils.toWei(amount2));

      console.log(amount1BN);

      // optimize gas fees?
      const tx = mySwap.methods.initiateSwap(owner2, token1, token2, amount1BN, amount2BN);
      const gas = await tx.estimateGas({ from: account });
      // const gasPrice = await web3.eth.getGasPrice(); // necessary?

      await tx.send({ gas, from: account });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ width: '70%', mx: 'auto' }}>
      {/* TEMPORARY NOTIFICATION */}
      <Box sx={{ my: 2 }}>
        <Notifications />
      </Box>
      <Card variant="contained" sx={{ textAlign: 'center' }}>
        <form ref={formRef} onSubmit={handleSubmit}>
          <CardHeader />
          <CardContent>
            <Grid container rowSpacing={4} columnSpacing={2}>
              <Grid item md={6}>
                <TextField
                  required
                  focused
                  variant="standard"
                  label="Amount"
                  name="amount1"
                  inputProps={amountInputProps}
                  // disabled={!formData.token1}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  required
                  focused
                  variant="standard"
                  label="Token Address"
                  name="token1"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item md={12}>
                <Divider sx={{ bgcolor: 'warning.main' }} />
              </Grid>
              <Grid item md={12}>
                <TextField
                  required
                  focused
                  variant="outlined"
                  label="Their Address"
                  name="owner2"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  required
                  focused
                  variant="standard"
                  label="Amount"
                  name="amount2"
                  inputProps={amountInputProps}
                  // disabled={!formData.token2}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  required
                  focused
                  variant="standard"
                  label="Token Address"
                  name="token2"
                  onChange={handleInput}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 1 }}>
            {/* TODO loading/disabled? button?? */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={formErrorState || !account}
            >
              Initiate Swap
            </Button>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
};

export default SwapForm;
