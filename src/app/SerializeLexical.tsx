import React from 'react';
import { FC } from 'react';

interface SerializerProps {
  content: ContentRoot;
}

const Serializer: FC<SerializerProps> = ({ content }) => {
  const renderTextNode = (node: TextNode, index: number) => {
    let className = '';

    if (node.format === 1) className += 'font-bold ';
    if (node.format === 2) className += 'italic ';
    if (node.format === 8) className += 'underline ';

    return (
      <span key={index} className={className.trim()}>
        {node.text}
      </span>
    );
  };

  const renderLineBreak = (index: number) => <br key={index} />;

  const renderHeading = (node: HeadingNode, index: number) => {
    const Tag = node.tag;
    return (
      <Tag key={index}>
        {node.children.map((child, childIndex) =>
          child.type === 'text' ? renderTextNode(child, childIndex) : renderLineBreak(childIndex)
        )}
      </Tag>
    );
  };

  const renderParagraph = (node: ParagraphNode, index: number) => {
    let className = '';
    if (node.format === 'center') className += 'text-center ';
    if (node.format === 'right') className += 'text-right ';

    return (
      <p key={index} className={className.trim()}>
        {node.children.map((child, childIndex) =>
          child.type === 'text' ? renderTextNode(child, childIndex) : renderLineBreak(childIndex)
        )}
        {renderLineBreak(node.children.length)} {/* Line break after the paragraph */}
      </p>
    );
  };

  const renderList = (node: ListNode, index: number) => {
    const Tag = node.listType === 'bullet' ? 'ul' : 'ol';
    return (
      <Tag key={index}>
        {node.children.map((item, itemIndex) => (
          <li key={itemIndex}>
            {item.children.map((child, childIndex) => renderTextNode(child, childIndex))}
          </li>
        ))}
      </Tag>
    );
  };

  const renderNode = (node: ContentNode, index: number) => {
    switch (node.type) {
      case 'heading':
        return renderHeading(node, index);
      case 'paragraph':
        return renderParagraph(node, index);
      case 'list':
        return renderList(node, index);
      default:
        return null;
    }
  };

  return (
    <div>
      {content.root.children.map((node, index) => (
        <div key={index}>{renderNode(node, index)}</div>
      ))}
    </div>
  );
};

export default Serializer;
