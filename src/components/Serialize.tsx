import React from 'react';
import escapeHTML from 'escape-html';
import { Text } from 'slate';
import { Link, Typography } from '@mui/material';

export const Serialiser = (props: { children: any[] }) => <>{serialize(props.children)}</>;

export const serialize = (children: any[]) =>
  children.map((node: any, i: React.Key | null | undefined) => {
    if (!node) return null;

    if (Text.isText(node)) {
      return escapeHTML(node.text); // Serialize text nodes directly
    }

    switch (node.type) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return (
          <Typography
            key={i}
            variant={node.type}
            sx={{
              textAlign: node.textAlign || 'left', // Default to 'left' if not specified
              fontWeight: node.bold ? 'bold' : 'regular',
              fontStyle: node.italic ? 'italic' : 'normal',
              textDecoration: node.underline ? 'underline' : 'none',
              textDecorationLine: node.strikethrough ? 'line-through' : 'none',
            }}
          >
            {serialize(node.children)}
          </Typography>
        );

      case 'link':
        return node.url ? (
          <Link
            key={i}
            href={node.url}
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
            fontSize="medium"
          >
            {serialize(node.children)}
          </Link>
        ) : null;

      default:
        return (
          <Typography
            key={i}
            sx={{
              fontWeight: node.bold ? 'bold' : 'regular',
              fontStyle: node.italic ? 'italic' : 'normal',
              textDecoration: node.underline ? 'underline' : 'none',
              textDecorationLine: node.strikethrough ? 'line-through' : 'none',
              textAlign: node.textAlign || 'left', // Default to 'left' if not specified
            }}
            variant="body1" // Default variant for unhandled types
          >
            {serialize(node.children)}
          </Typography>
        );
    }
  });

export default Serialiser;
