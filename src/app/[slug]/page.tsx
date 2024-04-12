import type { SerializedEditorState } from 'lexical';
import {
  type SanitizedEditorConfig,
  convertLexicalToHTML,
  consolidateHTMLConverters,
} from '@payloadcms/richtext-lexical';

async function lexicalToHTML(
  editorData: SerializedEditorState,
  editorConfig: SanitizedEditorConfig
) {
  return await convertLexicalToHTML({
    converters: consolidateHTMLConverters({ editorConfig }),
    data: editorData,
  });
}
export default async function Page({ params }: { params: { slug: string; content: any } }) {
  const { content, slug } = params;
  return <div>slug {slug}</div>;
  return <div dangerouslySetInnerHTML={content} />;
}

export async function generateStaticParams() {
  const pages = await fetch(`${process.env.API_URL}/pages`).then((res) => res.json());

  return pages.docs.map((page: any) => ({
    slug: page.title,
    content: page,
  }));
}
