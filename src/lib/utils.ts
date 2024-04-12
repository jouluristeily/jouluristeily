import type { SerializedEditorState } from 'lexical';
import {
  type SanitizedEditorConfig,
  convertLexicalToHTML,
  consolidateHTMLConverters,
} from '@payloadcms/richtext-lexical';

export function UTCtoTime(utcString: string) {
  const date = new Date(utcString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export async function lexicalToHTML(
  editorData: SerializedEditorState,
  editorConfig: SanitizedEditorConfig
) {
  return await convertLexicalToHTML({
    converters: consolidateHTMLConverters({ editorConfig }),
    data: editorData,
  });
}
