import type { ReactNode } from 'react'

import type { RichTextContent } from '@/lib/site-data'

type BaseNode = {
  type?: string
  children?: BaseNode[]
  text?: string
  format?: number | string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  listType?: 'bullet' | 'number'
  fields?: {
    url?: string
  }
  url?: string
}

const hasFlag = (format: number | string | undefined, flag: number) =>
  typeof format === 'number' && (format & flag) === flag

const getAlignmentClass = (format: number | string | undefined) => {
  if (typeof format !== 'string') {
    return ''
  }

  switch (format) {
    case 'center':
      return 'rt-align-center'
    case 'right':
      return 'rt-align-right'
    case 'justify':
      return 'rt-align-justify'
    default:
      return ''
  }
}

const renderNodes = (children: BaseNode[] | undefined) =>
  children?.map((child, index) => renderNode(child, index)) ?? null

const renderTextNode = (node: BaseNode, key: number): ReactNode => {
  const classNames = [
    hasFlag(node.format, 1) ? 'rt-bold' : '',
    hasFlag(node.format, 2) ? 'rt-italic' : '',
    hasFlag(node.format, 4) ? 'rt-strike' : '',
    hasFlag(node.format, 8) ? 'rt-underline' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span key={key} className={classNames || undefined}>
      {node.text}
    </span>
  )
}

const renderNode = (node: BaseNode, key: number): ReactNode => {
  const alignmentClass = getAlignmentClass(node.format)

  switch (node.type) {
    case 'heading': {
      const Tag = node.tag || 'h2'
      return (
        <Tag key={key} className={alignmentClass || undefined}>
          {renderNodes(node.children)}
        </Tag>
      )
    }
    case 'paragraph':
      return (
        <p key={key} className={alignmentClass || undefined}>
          {renderNodes(node.children)}
        </p>
      )
    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <Tag key={key} className={alignmentClass || undefined}>
          {renderNodes(node.children)}
        </Tag>
      )
    }
    case 'listitem':
      return <li key={key}>{renderNodes(node.children)}</li>
    case 'link':
    case 'autolink': {
      const href = node.fields?.url || node.url || '#'
      return (
        <a
          key={key}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
        >
          {renderNodes(node.children)}
        </a>
      )
    }
    case 'linebreak':
      return <br key={key} />
    case 'text':
      return renderTextNode(node, key)
    default:
      return renderNodes(node.children)
  }
}

export function RichTextRenderer({ content }: { content?: RichTextContent | null }) {
  const nodes = content?.root?.children as BaseNode[] | undefined

  if (!nodes?.length) {
    return null
  }

  return <div className="rich-text">{nodes.map((node, index) => renderNode(node, index))}</div>
}
