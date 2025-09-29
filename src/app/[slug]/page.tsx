import Serializer from '../SerializeLexical';

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;
  const content = await fetch(`${process.env.API_URL}/pages?where[title][equals]=${slug}`).then(
    (res) => res.json()
  );

  if (!content || !content.docs || content.docs.length === 0) return <div>loading...</div>;

  const pageContent = content.docs[0].content;

  return (
    <div>
      <Serializer content={pageContent} />
    </div>
  );
}

export async function generateStaticParams() {
  const pages = await fetch(`${process.env.API_URL}/pages`).then((res) => res.json());

  return pages.docs.map((page: any) => ({
    slug: page.title,
  }));
}
