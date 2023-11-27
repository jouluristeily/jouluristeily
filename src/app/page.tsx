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
        <h1
          className={`center text-center text-4xl font-bold tracking-wide text-red-600 font-title`}
        >
          Tänä vuonna Jouluristeily seilataan 30.11.- 01.12.2023!
        </h1>

        <div className="flex justify-center items-center">
          <a
            href="https://kide.app/events/f8092046-c026-4f4d-b735-d80d7498f865"
            className="text-white text-2xl font-title bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-red"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lipunmyyntiin
          </a>
        </div>

        <div className="flex flex-col mx-10">{text && <Serialiser>{text}</Serialiser>}</div>
      </div>
    </>
  );
}
