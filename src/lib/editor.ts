import {
  AlignFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const simpleLexicalEditor = lexicalEditor({
  features: () => [
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    ParagraphFeature(),
    HeadingFeature({}),
    AlignFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    LinkFeature({}),
  ],
})
