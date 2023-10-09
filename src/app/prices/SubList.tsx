import PriceItem from './PriceItem';
import { PriceListItem } from './page';

export default function SubList({ title, hytit }: { title: string; hytit: PriceListItem[] }) {
  return (
    <div className="mt-8 text-center pb-8 min-w-full">
      <h2 className="text-2xl font-bold pb-3">{title}</h2>
      <div className="space-y-2">
        {hytit.map((item) => (
          <PriceItem
            key={item.title}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
