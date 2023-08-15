import { Box, Stack, Typography } from '@mui/material';
import DrawerAppBar from '../components/DrawerAppBar';
import Image from 'next/image';
import { getContent } from '@/lib/api';
import { Serialiser } from '@/components/Serialize';

export default async function Home() {
  const content = await getContent();
  const markdown = content.docs.find((doc: any) => doc.title === 'Homepage').body;

  return (
    <>
      <Stack alignItems="center" padding={10}>
        <Box>
          <Image src="logo.svg" alt="Jouluristeily 2022" width={500} height={500} />
        </Box>

        <Box>
          <Serialiser>{markdown}</Serialiser>
        </Box>
      </Stack>
    </>
  );
}
