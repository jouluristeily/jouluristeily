import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import { getContent } from '@/lib/api';
import { Serialiser } from '@/components/Serialize';

export default async function Home() {
  const content = await getContent();
  const text = content.docs.find((doc: any) => doc.title === 'homepage')?.body;

  return (
    <>
      <Stack alignItems="center">
        <Image src="logo.svg" alt="Jouluristeily 2022" width={400} height={300} />
        {text && <Serialiser>{text}</Serialiser>}
      </Stack>
    </>
  );
}
