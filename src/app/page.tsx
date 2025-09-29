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
            <Image src="logo.svg" alt="Jouluristeily 2024" width={600} height={400} />
            <h3 className="text-3xl text-white mt-[-2rem]">26.-28.11.2025</h3>
          </div>
        </div>
        {/* <h1
          className={`center text-center text-4xl font-bold tracking-wide font-title`}
        >
          Tänä vuonna Jouluristeily seilataan 30.11.- 01.12.2023!
        </h1> */}
        <br />

        {/* <div className="flex justify-center items-center">
          <a
            href="https://kide.app/events/141ca3fa-b0cf-43ad-bc41-54ef889558c1"
            className="text-white text-2xl font-title bg-red hover:bg-red-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 "
            target="_blank"
            rel="noopener noreferrer"
          >
            Lipunmyyntiin
          </a>
        </div> */}
        <div className="flex flex-col mx-10 md:mx-60 lg:mx-120">
          {text && <Serialiser>{text}</Serialiser>}
        </div>
      </div>
    </>
  );
}
