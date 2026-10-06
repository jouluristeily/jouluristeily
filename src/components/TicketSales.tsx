import {
  getTicketSalesLink,
  type TicketSalesData,
  type TicketSalesPlacement,
} from '@/lib/ticket-sales'

type TicketSalesLinkProps = {
  sales?: TicketSalesData | null
  placement: TicketSalesPlacement
  variant?: 'button' | 'compact' | 'link'
  className?: string
  onClick?: () => void
}

export function TicketSalesLink({
  sales,
  placement,
  variant = 'button',
  className = '',
  onClick,
}: TicketSalesLinkProps) {
  const link = getTicketSalesLink(sales, placement)
  if (!link) return null

  const label = variant === 'compact' ? 'Liput' : link.label
  const accessibleLabel = `${label} – Kide.app (avautuu uuteen välilehteen)`

  return (
    <a
      href={link.url}
      className={`ticket-sales-link ticket-sales-link--${variant} ${className}`.trim()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={accessibleLabel}
      title={accessibleLabel}
      onClick={onClick}
    >
      <span>{label}</span>
      {variant !== 'compact' ? <span className="ticket-sales-provider">Kide.app</span> : null}
      <span aria-hidden="true">↗</span>
    </a>
  )
}

export function TicketSalesCallout({
  sales,
  placement,
}: {
  sales?: TicketSalesData | null
  placement: 'prices' | 'events'
}) {
  if (!getTicketSalesLink(sales, placement)) return null

  return (
    <section className="ticket-sales-callout" aria-label="Lipunmyynti">
      <p>Lipunmyynti</p>
      <TicketSalesLink sales={sales} placement={placement} />
    </section>
  )
}
