import { getContent } from '@/lib/api';
import { Serialiser } from '@/app/Serialize';

export default async function Afterlecture() {
  const content = await getContent();
  const text = content.docs.find((doc: any) => doc.title === 'homepage').body;

  return <div className="flex flex-col">{text && <Serialiser>{text}</Serialiser>}</div>;
}
