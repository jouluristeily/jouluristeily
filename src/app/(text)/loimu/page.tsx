import { getContent } from '@/lib/api';
import { Serialiser } from '@/app/Serialize';

export default async function Loimu() {
  const content = await getContent();
  const text = content.docs.find((doc: any) => doc.title === 'loimu').body;

  return <div className="flex flex-col">{text && <Serialiser>{text}</Serialiser>}</div>;
}
