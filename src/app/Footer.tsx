import { Box, Divider, Grid, Link, Typography } from '@mui/material';

const Footer = () => (
  <Box
    sx={{
      color: '#000',
      bgcolor: '#fff',
      outline: '5px dashed yellow',
      boxShadow: '0 0 0 5px red',
      minWidth: '100%',
    }}
  >
    <Grid container direction="column" spacing={1} sx={{ mt: 1 }}>
      <Grid item container justifyContent="center" spacing={1}>
        <Grid item>
          <Link
            href="https://www.facebook.com/jouluristeily"
            variant="subtitle1"
            underline="hover"
            color="inherit"
          >
            Facebook
          </Link>
        </Grid>
        <Grid item>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item>
          <Link
            href="https://www.instagram.com/jouluristeily/"
            variant="subtitle1"
            underline="hover"
            color="inherit"
          >
            Instagram
          </Link>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
          Jouluristeily 2023
        </Typography>
      </Grid>
    </Grid>
  </Box>
);

export default Footer;
