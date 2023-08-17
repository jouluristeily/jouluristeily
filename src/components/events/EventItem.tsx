import { Grid, Paper, Typography } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { UTCtoTime } from '@/lib/utils';

interface EventItemProps {
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
}

export default function EventItem({
  title,
  startTime,
  endTime,
  description,
  location,
}: EventItemProps) {
  return (
    <Paper sx={{ minWidth: '100%' }}>
      <Grid
        container
        justifyItems="center"
        sx={{ maxWidth: { xs: '100%', md: '60%', lg: '30%' }, minHeight: 100, p: 1 }}
      >
        <Grid item container direction="column" xs={9}>
          <Grid item>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
              {`${UTCtoTime(startTime)} - ${UTCtoTime(endTime)}`}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'end' }}>
          <Typography variant="body1" component="p">
            {location}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ p: 1 }}>
        <Typography variant="body1" component="p">
          {description}
        </Typography>
      </Grid>
    </Paper>
  );
}
