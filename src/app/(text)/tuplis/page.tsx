import { getContent } from '@/lib/api';
import { Serialiser } from '@/components/Serialize';

export default async function Loimu() {
  const content = await getContent();
  const text = content.docs.find((doc: any) => doc.title === 'tuplis').body;

  return (
    <div className="flex flex-col items-center">
      <div>{text && <Serialiser>{text}</Serialiser>}</div>
    </div>
  );
}
