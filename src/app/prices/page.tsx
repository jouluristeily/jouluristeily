import React from 'react';
import { getContent, getPriceList } from '@/lib/api';
import { Serialiser } from '@/app/Serialize';
import PriceItem from '@/app/prices/PriceItem';
import SubList from './SubList';

export interface PriceListItem {
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
  //sort alphabetically based on title
  const sortedJrHytit = jrHytit.sort((a, b) => a.title.localeCompare(b.title));
  const tpHytit = items.filter((item) => item.type === 'tp_hytti');
  const sortedTpHytit = tpHytit.sort((a, b) => a.title.localeCompare(b.title));
  const appro = items.filter((item) => item.type === 'appro');
  const ruokailut = items.filter((item) => item.type === 'ruokailu');
  const sortedRuokailut = ruokailut.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="flex flex-col items-center max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div className="mt-8">{contentText && <Serialiser>{contentText}</Serialiser>}</div>

      <SubList title="Jouluristeilyn hyttihinnasto 2023" hytit={sortedJrHytit} />
      <SubList title="TUPLIS hyttihinnasto" hytit={sortedTpHytit} />
      <SubList title="Ankkuri-Appro / henkilö" hytit={appro} />
      {sortedRuokailut && <SubList title="Ruokailut" hytit={sortedRuokailut} />}
    </div>
  );
}
