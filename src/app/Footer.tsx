import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    sx={{
      color: '#000',
      bgcolor: '#fff',
      outline: '5px dashed yellow',
      boxShadow: '0 0 0 5px red',
    }}
  >
    <Typography variant="h6" sx={{ my: 2 }}>
      Jouluristeily, 2023
    </Typography>
  </Box>
);

export default Footer;
