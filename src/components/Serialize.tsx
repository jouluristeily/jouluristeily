import React from 'react';
import escapeHTML from 'escape-html';
import { Text } from 'slate';

type node = {
  text: string | null | undefined;
  type: string;
  textAlign?: any;
  bold?: any;
  italic?: any;
  underline?: any;
  strikethrough?: any;
  children: node[];
  url?: string | undefined;
};

export const Serialiser = ({ children }: { children: node[] }) => <>{serialize(children)}</>;

export const serialize = (children: node[]) =>
  children.map((node: node, i: React.Key | null | undefined) => {
    if (!node) return null;

    if (Text.isText(node)) {
      return escapeHTML(node.text); // Serialize text nodes directly
    }

    switch (node.type) {
      case 'h1':
        return (
          <h1
            key={i}
            className={`${node.textAlign || 'left'} font-bold ${
              node.bold ? 'font-bold' : 'font-normal'
            } ${node.italic ? 'italic' : 'not-italic'} ${
              node.underline ? 'underline' : 'no-underline'
            } ${
              node.strikethrough ? 'line-through' : 'no-line-through'
            } text-4xl font-bold tracking-wide text-red-600 font-title`}
          >
            {serialize(node.children)}
          </h1>
        );
      case 'h2':
        return (
          <h2
            key={i}
            className={`${node.textAlign || 'left'} font-bold ${
              node.bold ? 'font-bold' : 'font-normal'
            } ${node.italic ? 'italic' : 'not-italic'} ${
              node.underline ? 'underline' : 'no-underline'
            } ${
              node.strikethrough ? 'line-through' : 'no-line-through'
            } text-xl font-bold tracking-wide font-secondary`}
          >
            {serialize(node.children)}
          </h2>
        );
      case 'h3':
        return (
          <h3
            key={i}
            className={`${node.textAlign || 'left'} font-bold ${
              node.bold ? 'font-bold' : 'font-normal'
            } ${node.italic ? 'italic' : 'not-italic'} ${
              node.underline ? 'underline' : 'no-underline'
            } ${
              node.strikethrough ? 'line-through' : 'no-line-through'
            } text-lg font-bold tracking-wide`}
          >
            {serialize(node.children)}
          </h3>
        );
      case 'h4':
        return (
          <h4
            key={i}
            className={`${node.textAlign || 'left'} font-bold ${
              node.bold ? 'font-bold' : 'font-normal'
            } ${node.italic ? 'italic' : 'not-italic'} ${
              node.underline ? 'underline' : 'no-underline'
            } ${node.strikethrough ? 'line-through' : 'no-line-through'} text-base font-bold`}
          >
            {serialize(node.children)}
          </h4>
        );
      case 'link':
        return node.url ? (
          <a
            key={i}
            href={node.url}
            className="hover:underline text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            {serialize(node.children)}
          </a>
        ) : null;

      default:
        return (
          <p
            key={i}
            className={`${node.textAlign || 'left'} ${node.bold ? 'font-bold' : 'font-normal'} ${
              node.italic ? 'italic' : 'not-italic'
            } ${node.underline ? 'underline' : 'no-underline'} ${
              node.strikethrough ? 'line-through' : 'no-line-through'
            } font-paragraph`}
          >
            {serialize(node.children)}
          </p>
        );
    }
  });
