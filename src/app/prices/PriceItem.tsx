interface PriceItemProps {
  title: string;
  price: string;
  description: string;
}

export default function PriceItem({ title, price, description }: PriceItemProps) {
  return (
    <div className="flex items-center justify-between space-x-10 border-t-2 min-h-16 py-6">
      <div className="w-2/12">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="w-2/12">
        <h2 className="text-xl font-bold">{`${price} €`}</h2>
      </div>
      <div className="w-8/12">
        <p className="text-base">{description}</p>
      </div>
    </div>
  );
}
