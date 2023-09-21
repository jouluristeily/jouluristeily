export async function getContent() {
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/content`);
    const data = await response.json();
    return data;
  } catch (err) {}
  return null;
}

export async function getPriceList() {
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/price-list`);
    const data = await response.json();
    return data;
  } catch (err) {}
  return null;
}

export async function getEvents() {
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/events`);
    const data = await response.json();
    return data;
  } catch (err) {}
  return null;
}
