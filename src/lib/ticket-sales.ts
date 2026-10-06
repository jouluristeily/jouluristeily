export const ticketSalesPlacements = [
  { label: 'Navigation (desktop and mobile)', value: 'navigation' },
  { label: 'Homepage hero', value: 'homepage' },
  { label: 'Prices page', value: 'prices' },
  { label: 'Programme page', value: 'events' },
  { label: 'Footer', value: 'footer' },
] as const

export type TicketSalesPlacement = (typeof ticketSalesPlacements)[number]['value']

export type TicketSalesData = {
  enabled?: boolean | null
  url?: string | null
  buttonLabel?: string | null
  placements?: TicketSalesPlacement[] | null
}

export const defaultTicketSalesPlacements = ticketSalesPlacements.map(({ value }) => value)
export const defaultTicketButtonLabel = 'Osta liput'

export const getKideTicketUrl = (value?: string | null): string | null => {
  if (!value?.trim()) return null

  try {
    const url = new URL(value.trim())
    if (
      url.protocol !== 'https:' ||
      !['kide.app', 'www.kide.app'].includes(url.hostname) ||
      url.username ||
      url.password ||
      url.port
    ) {
      return null
    }
    return url.href
  } catch {
    return null
  }
}

export const getTicketSalesLink = (
  sales: TicketSalesData | null | undefined,
  placement: TicketSalesPlacement,
) => {
  if (!sales?.enabled) return null
  const placements = sales.placements ?? []
  if (!placements.includes(placement)) return null

  const url = getKideTicketUrl(sales.url)
  if (!url) return null

  return { url, label: sales.buttonLabel?.trim() || defaultTicketButtonLabel }
}
