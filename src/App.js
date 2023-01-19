import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/system';

import Home from './components/home';


function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Ubuntu Mono, Monospace',
    }
  })
  return (
    < Home />
  );
}

export default App;
