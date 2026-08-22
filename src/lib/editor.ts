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
  TextStateFeature,
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
    TextStateFeature({
      state: {
        color: {
          'brand-red': { label: 'Jouluristeily punainen', css: { color: '#c1121f' } },
          'brand-gold': { label: 'Kulta', css: { color: '#8a6500' } },
          'brand-blue': { label: 'Sininen', css: { color: '#1d4ed8' } },
          'brand-black': { label: 'Musta', css: { color: '#303030' } },
        },
      },
    }),
    ParagraphFeature(),
    HeadingFeature({}),
    AlignFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    LinkFeature({}),
  ],
})
