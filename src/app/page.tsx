import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { getContent } from '@/lib/api';
import { Serialiser } from '@/components/Serialize';

export default async function Home() {
  const content = await getContent();
  const text = content.docs.find((doc: any) => doc.title === 'homepage')?.body;

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid
          container
          item
          direction="column"
          sx={{ backgroundImage: `url(bileet.jpg)` }}
          alignItems="center"
          minWidth="100vw"
          minHeight="600px"
        >
          <Grid item sx={{ pt: 5 }}>
            <Image src="logo.svg" alt="Jouluristeily 2022" width={600} height={400} />
          </Grid>
          <Grid item>
            <Typography variant="h3" color="white" sx={{ mt: -8 }}>
              1.-2.12.2023
            </Typography>
          </Grid>
        </Grid>
        <Grid item sx={{ px: { xs: 2, sm: 4, md: 10 }, py: 2 }}>
          {text && <Serialiser>{text}</Serialiser>}
        </Grid>
      </Grid>
    </>
  );
}
