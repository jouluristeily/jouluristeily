export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const content = await fetch(`${process.env.API_URL}/pages?where[title][equals]=${slug}`).then(
    (res) => res.json()
  );
  if (!content) return <div>loading...</div>;

  const html = content.docs[0].content_html;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export async function generateStaticParams() {
  const pages = await fetch(`${process.env.API_URL}/pages`).then((res) => res.json());

  return pages.docs.map((page: any) => ({
    slug: page.title,
  }));
}
