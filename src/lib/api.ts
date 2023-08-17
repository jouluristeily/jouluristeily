export async function getContent() {
  try {
    const response = await fetch(`${process.env.API_URL}/content`);
    const data = await response.json();
    return data;
  } catch (err) {}
  return null;
}

export async function getPriceList() {
  try {
    const response = await fetch(`${process.env.API_URL}/price-list`);
    const data = await response.json();
    return data;
  } catch (err) {}
  return null;
}
