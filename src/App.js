import './App.css';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import * as React from 'react';
import Sidemenu from './components/Sidemenu';

function Footer() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Created by '}
      <Link color="inherit" target="_blank" rel="noopener" href="https://www.linkedin.com/in/fernandotds">
        Fernando Shinohara
      </Link>{'.'}
    </Typography>
  );
}

function App() {
  return (
    <div>

      <Sidemenu />

      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Footer />
        </Box>
      </Container>

    </div>
  );
}

export default App;
