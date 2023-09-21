import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import { getContent } from '@/lib/api';
import { Serialiser } from '@/components/Serialize';

export default async function Loimu() {
  const content = await getContent();
  const text = content.docs.find((doc: any) => doc.title === 'loimu').body || 'No content found';

  return (
    <>
      <Stack alignItems="center">
        <Box>{text && <Serialiser>{text}</Serialiser>}</Box>
      </Stack>
    </>
  );
}
