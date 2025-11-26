export default async function Events() {
  // const eventsResponse = await getEvents();
  // const events = eventsResponse.docs;

  // return (
  //   <>
  //     <EventList events={events} />
  //   </>
  // );

  return (
    <div className="h-96 flex flex-col justify-center items-center">
      <div className="p-6 text-center">
        <a
          href="https://drive.google.com/uc?export=download&id=1K85tZWmyQxBwARU2Ghl756czCSwKUAJV"
          className="btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tuplis25 Käsiohjelma
        </a>
      </div>

      <div className="p-6 text-center">
        <a
          href="https://drive.google.com/uc?export=download&id=1AvxUFck0Z3dv-ZBx4slCczUJZy1HW2o9"
          className="btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          JR25 Käsiohjelma
        </a>
      </div>
    </div>
  );
}
