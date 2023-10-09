import Image from 'next/image';
import { getContent } from '@/lib/api';
import { Serialiser } from '@/app/Serialize';

export default async function Home() {
  const content = await getContent();
  const text = content?.docs.find((doc: any) => doc.title === 'homepage')?.body;

  return (
    <>
      <div className="relative">
        <div
          className="bg-[url('bileet.jpg')] bg-cover bg-center bg-no-repeat"
          style={{ height: '600px', width: '100vw' }}
        >
          <div className="flex flex-col items-center justify-center h-full p-4">
            <Image src="logo.svg" alt="Jouluristeily 2022" width={600} height={400} />
            <h3 className="text-3xl text-white mt-[-2rem]">30.11.-1.12.2023</h3>
          </div>
        </div>
        <div className="p-4 md:p-10 text-center">{text && <Serialiser>{text}</Serialiser>}</div>
      </div>
    </>
  );
}
