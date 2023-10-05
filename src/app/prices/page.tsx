import React from 'react';
import { getContent, getPriceList } from '@/lib/api';
import { Serialiser } from '@/components/Serialize';
import PriceItem from '@/components/PriceItem';

interface PriceListItem {
  title: string;
  price: string;
  description: string;
  type: string;
}

export default async function PriceList() {
  const content = await getContent();
  const contentText =
    content.docs.find((doc: { title: string }) => doc.title === 'pricelist').body ||
    'No content found';

  const priceList = await getPriceList();
  const items: PriceListItem[] = priceList.docs;

  const jrHytit = items.filter((item) => item.type === 'jr_hytti');
  const tpHytit = items.filter((item) => item.type === 'tp_hytti');
  const appro = items.filter((item) => item.type === 'appro');

  return (
    <div className="flex flex-col items-center max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div className="mt-8">{contentText && <Serialiser>{contentText}</Serialiser>}</div>

      <div className="mt-8 text-center pb-8">
        <h2 className="text-2xl font-bold pb-3">Jouluristeilyn hyttihinnasto 2023</h2>
        <div className="space-y-2">
          {jrHytit.map((item) => (
            <PriceItem
              key={item.title}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 text-center pb-8">
        <h2 className="text-2xl font-bold">TUPLIS hyttihinnasto</h2>
        <div className="space-y-2">
          {tpHytit.map((item) => (
            <PriceItem
              key={item.title}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 text-center pb-8">
        <h2 className="text-2xl font-bold">Ankkuri-Appro /henkilö</h2>
        <div className="space-y-2 w-full">
          {appro.map((item) => (
            <PriceItem
              key={item.title}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
