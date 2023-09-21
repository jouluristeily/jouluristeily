import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import { getContent } from '@/lib/api';
import { Serialiser } from '@/components/Serialize';

export default async function Tuplis() {
  const content = await getContent();
  const text = content.docs.find((doc: any) => doc.title === 'tuplis').body || 'No content found';

  return (
    <>
      <Stack alignItems="center">
        <Box>{text && <Serialiser>{text}</Serialiser>}</Box>
      </Stack>
    </>
  );
}
