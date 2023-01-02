import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
typography: {
    fontFamily: [
      'Poppins',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#ffff00',
    },
    error: {
      main: red.A400,
    },
  },
  
  
});


export default theme;
