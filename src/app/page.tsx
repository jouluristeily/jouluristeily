import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import { getContent } from '@/lib/api';
import { Serialiser } from '@/components/Serialize';

export default async function Home() {
  const content = await getContent();
  const text = content.docs.find((doc: any) => doc.title === 'homepage')?.body;

  return (
    <>
      <Stack alignItems="center">{text && <Serialiser>{text}</Serialiser>}</Stack>
    </>
  );
}
