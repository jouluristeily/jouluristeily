import { Grid, Typography } from '@mui/material';

interface PriceItemProps {
  title: string;
  price: string;
  description: string;
}

export default function PriceItem({ title, price, description }: PriceItemProps) {
  return (
    <Grid container direction={'row'} gap={10} xs={12} wrap="nowrap">
      <Grid item xs={2} alignItems="center" justifyContent="center">
        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
          {`${price}€`}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body1" component="p">
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
}
