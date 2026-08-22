import type { LinkItem } from '@/lib/site-data'

type SiteFooterProps = {
  footerText?: string | null
  harassmentFormUrl?: string | null
  socialLinks?: LinkItem[] | null
}

export function SiteFooter({ footerText, harassmentFormUrl, socialLinks }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="footer-frame">
        <div className="footer-inner">
          {harassmentFormUrl ? (
            <a
              href={harassmentFormUrl}
              className="footer-harassment"
              target="_blank"
              rel="noreferrer"
            >
              Häirintäilmoituslomake
            </a>
          ) : null}

          <div className="footer-social-row">
            <div className="footer-social-links">
              {socialLinks?.map((link) => (
                <a
                  key={`${link.label}-${link.url}`}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <p className="footer-copy">{footerText || 'Jouluristeily 2025'}</p>
        </div>
      </div>
    </footer>
  )
}
