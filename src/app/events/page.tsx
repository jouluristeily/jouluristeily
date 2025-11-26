import { getEvents } from '@/lib/api';
import EventList from '@/app/events/EventList';

export default async function Events() {
  // const eventsResponse = await getEvents();
  // const events = eventsResponse.docs;

  // return (
  //   <>
  //     <EventList events={events} />
  //   </>
  // );

  return (
    <div className="flex flex-col items-center m-8 border-2">
      <object data="TUPLIS25_kasiohjelma.pdf" type="application/pdf" width="100%" height="600px">
        <div className="flex flex-col justify-center align-center items-center mt-40 text-center">
          <a
            href="https://drive.google.com/uc?export=download&id=1K85tZWmyQxBwARU2Ghl756czCSwKUAJV"
            className="text-white text-2xl font-title bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-red"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tuplis25 Käsiohjelma
          </a>
          <p>Ylläolevasta painikkeesta voit ladata Tupliksen käsiohjelman</p>
        </div>
      </object>
      <object data="JR25_kasiohjelma.pdf" type="application/pdf" width="100%" height="600px">
        <div className="flex flex-col justify-center align-center items-center mt-40 text-center">
          <a
            href="https://drive.google.com/uc?export=download&id=1AvxUFck0Z3dv-ZBx4slCczUJZy1HW2o9"
            className="text-white text-2xl font-title bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-red"
            target="_blank"
            rel="noopener noreferrer"
          >
            JR25 Käsiohjelma
          </a>
          <p>Ylläolevasta painikkeesta voit ladata Jouluristeilyn käsiohjelman</p>
        </div>
      </object>
    </div>
  );
}
