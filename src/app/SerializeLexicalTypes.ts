type TextFormat = 0 | 1 | 2 | 8;

interface TextNode {
  type: 'text';
  text: string;
  format: TextFormat;
}

interface LineBreakNode {
  type: 'linebreak';
}

interface HeadingNode {
  type: 'heading';
  tag: 'h1' | 'h2' | 'h3';
  children: Array<TextNode | LineBreakNode>;
}

interface ParagraphNode {
  type: 'paragraph';
  format: '' | 'center' | 'right';
  children: Array<TextNode | LineBreakNode>;
}

interface ListItemNode {
  type: 'listitem';
  value: number;
  children: TextNode[];
}

interface ListNode {
  type: 'list';
  listType: 'bullet' | 'number';
  children: ListItemNode[];
}

type ContentNode = HeadingNode | ParagraphNode | ListNode;

interface ContentRoot {
  root: {
    children: ContentNode[];
  };
}
