import { lexicalToHTML } from '@/lib/utils';

export default async function Page({ params }: { params: { slug: string } }) {
  const pages = await fetch(`${process.env.API_URL}/pages`).then((res) => res.json());
  return <div>My Post: {params.slug}</div>;
}

/*   export async function generateStaticParams() {
    const pages = await fetch(`${process.env.API_URL}/pages`).then((res) => res.json())

        
    return pages.map((page) => ({
      slug: post.slug,
    }))
  } */
