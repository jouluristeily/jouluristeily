import React from 'react';
import { FC } from 'react';

interface SerializerProps {
  content: ContentRoot;
}

const Serializer: FC<SerializerProps> = ({ content }) => {
  const renderTextNode = (node: TextNode) => {
    let className = '';

    if (node.format === 1) className += 'font-bold ';
    if (node.format === 2) className += 'italic ';
    if (node.format === 8) className += 'underline ';

    return <span className={className.trim()}>{node.text}</span>;
  };

  const renderLineBreak = () => <br />;

  const renderHeading = (node: HeadingNode) => {
    const Tag = node.tag;
    return (
      <Tag>
        {node.children.map((child, index) =>
          child.type === 'text' ? renderTextNode(child) : renderLineBreak()
        )}
      </Tag>
    );
  };

  const renderParagraph = (node: ParagraphNode) => {
    let className = '';
    if (node.format === 'center') className += 'text-center ';
    if (node.format === 'right') className += 'text-right ';

    return (
      <p className={className.trim()}>
        {node.children.map((child, index) =>
          child.type === 'text' ? renderTextNode(child) : renderLineBreak()
        )}
        {renderLineBreak()}
      </p>
    );
  };

  const renderList = (node: ListNode) => {
    const Tag = node.listType === 'bullet' ? 'ul' : 'ol';
    return (
      <Tag>
        {node.children.map((item, index) => (
          <li key={index}>{item.children.map((child, childIndex) => renderTextNode(child))}</li>
        ))}
      </Tag>
    );
  };

  const renderNode = (node: ContentNode) => {
    switch (node.type) {
      case 'heading':
        return renderHeading(node);
      case 'paragraph':
        return renderParagraph(node);
      case 'list':
        return renderList(node);
      default:
        return null;
    }
  };

  return (
    <div>
      {content.root.children.map((node, index) => (
        <div key={index}>{renderNode(node)}</div>
      ))}
    </div>
  );
};

export default Serializer;
