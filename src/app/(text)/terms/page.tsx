import { getContent } from '@/lib/api';
import { Serialiser } from '@/app/Serialize';

export default async function Terms() {
  const content = await getContent();
  const text = content.docs.find((doc: any) => doc.title === 'terms').body;

  return (
    <div className="flex flex-col items-center">
      <div>{text && <Serialiser>{text}</Serialiser>}</div>
    </div>
  );
}
