import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5',
    },
    secondary: {
      main: '#00b0ff',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;