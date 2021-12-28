import { useContext, useEffect, useState } from 'react';
import { NetworkContext } from '../context/Network';

import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
  Tabs,
  Tab,
  Button,
  styled,
  Typography
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import { shortAddress } from '../misc/helpers';

const StyledTableCell = styled(TableCell)({ whiteSpace: 'normal', wordBreak: 'break-all' });
const flexRowStyle = { display: 'flex', gap: 1 };

const SwapHistory = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [displayData, setDisplayData] = useState([]);
  const { mySwap, account, web3 } = useContext(NetworkContext);

  useEffect(() => console.log('SwapHistory rendered'));

  useEffect(async () => getData(), [mySwap, activeTab, account]); // mySwap after initial load, activeTab during tab change, account after switch

  const getData = async () => {
    try {
      const tx = mySwap.methods[activeTab === 0 ? 'getInitiatedSwaps' : 'getPendingSwaps']();

      const rawData = await tx.call({ from: account });

      console.time('processDisplayData');
      const processedData = await processDisplayData(rawData);
      console.timeEnd('processDisplayData');

      console.log(processedData);

      setDisplayData(processedData);
    } catch (err) {
      console.error(err);
    }
  };

  const processDisplayData = async (rawData) => {
    return rawData.sort((first, second) => {
      // TODO open state
      // if (first.state < second.state) return -1;
      // if (first.state > second.state) return 1;

      return second.timeEnded - first.timeEnded;
    });
  };

  // args = [event, newValue]
  const handleTabChange = (...args) => setActiveTab(args[1]);

  return (
    <Box sx={{ bgcolor: 'grey.900' }}>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Initiated" />
        <Tab label="Pending" />
      </Tabs>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Swap Request</TableCell>
              <TableCell>Swap With</TableCell>
              <TableCell align="center">Details</TableCell>
              <TableCell>{/** button actions */}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* TODO display no data message when empty */}
            {displayData.map((item, index) => {
              return (
                <TableRow key={index}>
                  <StyledTableCell>{shortAddress(item.swapAddress)}</StyledTableCell>
                  <StyledTableCell>{item.swapWith}</StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="caption" component="span" color="warning.main">
                      You
                    </Typography>
                    <Box
                      component="div"
                      sx={{
                        ...flexRowStyle,
                        flexDirection: activeTab === 0 ? 'row' : 'row-reverse',
                        justifyContent: 'left'
                      }}
                    >
                      <Typography component="span">
                        {web3.utils.fromWei(item.token1.amount)} {item.token1.symbol}
                      </Typography>
                      <SwapHorizIcon />
                      <Typography component="span">
                        {web3.utils.fromWei(item.token2.amount)} {item.token2.symbol}
                      </Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={flexRowStyle}>
                      {/* TODO need to check if allowance not ok? == promise call again :( */}
                      <Button variant="outlined" color="warning">
                        Approve
                      </Button>
                      {(item.state === '0' && activeTab === 0 && (
                        <Button variant="contained">Forfeit</Button>
                      )) ||
                        (activeTab === 1 && <Button variant="contained">Fulfill</Button>)}
                    </Box>
                  </StyledTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SwapHistory;
