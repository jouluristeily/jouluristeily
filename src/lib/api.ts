export async function getContent() {
  try {
    const response = await fetch(`http://localhost:3000/api/content`);
    const data = await response.json();
    return data;
  } catch (err) {}
  return null;
}
