import React, { Fragment } from 'react';
import escapeHTML from 'escape-html';
import { Text } from 'slate';

export const Serialiser = (props: { children: any[] }) => <>{serialize(props.children)}</>;

export const serialize = (children: any[]) =>
  children.map(
    (
      node: {
        text: string | null | undefined;
        bold: any;
        code: any;
        italic: any;
        type: any;
        children: any;
        url: string | null | undefined;
      },
      i: React.Key | null | undefined
    ) => {
      if (Text.isText(node)) {
        let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />;

        if (node.bold) {
          text = <strong key={i}>{text}</strong>;
        }

        if (node.code) {
          text = <code key={i}>{text}</code>;
        }

        if (node.italic) {
          text = <em key={i}>{text}</em>;
        }

        // Handle other leaf types here...

        return <Fragment key={i}>{text}</Fragment>;
      }

      if (!node) {
        return null;
      }

      switch (node.type) {
        case 'h1':
          return <h1 key={i}>{serialize(node.children)}</h1>;
        // Iterate through all headings here...
        case 'h6':
          return <h6 key={i}>{serialize(node.children)}</h6>;
        case 'blockquote':
          return <blockquote key={i}>{serialize(node.children)}</blockquote>;
        case 'ul':
          return <ul key={i}>{serialize(node.children)}</ul>;
        case 'ol':
          return <ol key={i}>{serialize(node.children)}</ol>;
        case 'li':
          return <li key={i}>{serialize(node.children)}</li>;
        case 'link':
          return (
            <a href={escapeHTML(node.url)} key={i}>
              {serialize(node.children)}
            </a>
          );

        default:
          return <p key={i}>{serialize(node.children)}</p>;
      }
    }
  );
