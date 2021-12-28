import { Box, AppBar, Typography, Toolbar } from '@mui/material';

import AccountConnector from './AccountConnector';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* light mode primary.dark */}
      <AppBar position="static" sx={{ bgcolor: '#1565c0' }}>
        <Toolbar>
          <Typography variant="h4" component="div" color="warning.main" sx={{ flexGrow: 1 }}>
            MySwap
          </Typography>
          <AccountConnector />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
