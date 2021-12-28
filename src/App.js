import { Network } from './context/Network';

import { Box, Container } from '@mui/material';
import Header from './components/Header';
import SwapForm from './components/SwapForm';
import SwapHistory from './components/SwapHistory';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({ palette: { mode: 'dark' } });

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ bgcolor: 'grey.800', height: '100%', minHeight: '100vh' }}>
          <Network>
            <Header />
            <Container sx={{ mt: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <SwapForm />
              <SwapHistory />
            </Container>
          </Network>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default App;
