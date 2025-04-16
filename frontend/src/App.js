import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LeadManagementApp from './components/LeadForm';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <LeadManagementApp />
    </ThemeProvider>
  );
}

export default MyApp;