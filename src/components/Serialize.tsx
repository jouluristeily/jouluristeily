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
        return (
          <Typography
            key={i}
            variant="h1"
            sx={{
              textAlign: node.textAlign || 'left',
              fontWeight: node.bold ? 'bold' : 'regular',
              fontStyle: node.italic ? 'italic' : 'normal',
              textDecoration: node.underline ? 'underline' : 'none',
              textDecorationLine: node.strikethrough ? 'line-through' : 'none',
              fontSize: '2rem',
              color: 'red',
              letterSpacing: '-2%',
            }}
          >
            {serialize(node.children)}
          </Typography>
        );

      case 'h2':
        return (
          <Typography
            key={i}
            variant="h2"
            sx={{
              textAlign: node.textAlign || 'left',
              fontWeight: node.bold ? 'bold' : 'regular',
              fontStyle: node.italic ? 'italic' : 'normal',
              textDecoration: node.underline ? 'underline' : 'none',
              textDecorationLine: node.strikethrough ? 'line-through' : 'none',
              fontSize: '2rem',
            }}
          >
            {serialize(node.children)}
          </Typography>
        );

      case 'h3':
        return (
          <Typography
            key={i}
            variant="h3"
            sx={{
              textAlign: node.textAlign || 'left',
              fontWeight: node.bold ? 'bold' : 'regular',
              fontStyle: node.italic ? 'italic' : 'normal',
              textDecoration: node.underline ? 'underline' : 'none',
              textDecorationLine: node.strikethrough ? 'line-through' : 'none',
              fontSize: '1.5rem',
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
