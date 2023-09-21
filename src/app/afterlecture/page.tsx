import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { getContent } from '@/lib/api';
import { Serialiser } from '@/components/Serialize';

export default async function Afterlecture() {
  const content = await getContent();
  const text = content.docs.find((doc: any) => doc.title === 'afterlecture').body;

  return (
    <Stack alignItems="center">
      <Box>
        <Image src="logo.svg" alt="Jouluristeily 2022" width={500} height={500} />
      </Box>

      <Box>{text && <Serialiser>{text}</Serialiser>}</Box>
    </Stack>
  );
}
