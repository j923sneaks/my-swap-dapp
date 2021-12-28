import { Alert, Typography, Box } from '@mui/material';

const Notifications = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Alert severity="warning">This is still experimental. Use at your own risk!</Alert>
      <Alert severity="info">
        <Typography variant="p">Please take note of the following:</Typography>
        <ul>
          <Typography variant="li" component="li">
            Purpose at time of writing: build and make it work (happy flow)
          </Typography>
          <Typography variant="li" component="li">
            Simple validation only
          </Typography>
          <Typography variant="li" component="li">
            No address, amount precision validations
          </Typography>
          <Typography variant="li" component="li">
            No balance checking
          </Typography>
        </ul>
        <Typography variant="p">TO DO:</Typography>
        <ul>
          <Typography variant="li" component="li">
            Form validation (and real time display?)
          </Typography>
          <Typography variant="li" component="li">
            Token selection (per network?)
          </Typography>
        </ul>
      </Alert>
    </Box>
  );
};

export default Notifications;
