import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { getContent, getPriceList } from '@/lib/api';
import { Serialiser } from '@/components/Serialize';
import PriceItem from '@/components/PriceItem';

export default async function PriceList() {
  const content = await getContent();
  const text =
    content.docs.find((doc: any) => doc.title === 'pricelist').body || 'No content found';

  const priceList = await getPriceList();
  const items = priceList.docs;
  const jrHytit = items.filter((item: any) => item.type === 'jr_hytti');
  const tpHytit = items.filter((item: any) => item.type === 'tp_hytti');
  const appro = items.filter((item: any) => item.type === 'appro');

  return (
    <Stack alignItems="center" spacing={5}>
      <Box>{text && <Serialiser>{text}</Serialiser>}</Box>

      <Box>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', pb: 3 }}>
          Jouluristeilyn hyttihinnasto 2022
        </Typography>
        <Stack spacing={2}>
          {jrHytit.map((item: any) => (
            <PriceItem
              key={item.title}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
          Ankkuri-Appro /henkilö
        </Typography>
        <Stack>
          {appro.map((item: any) => (
            <PriceItem
              key={item.title}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
          TUPLIS hyttihinnasto
        </Typography>
        <Stack>
          {tpHytit.map((item: any) => (
            <PriceItem
              key={item.title}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
