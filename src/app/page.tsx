import { HeroLogo } from "@/components/HeroLogo";
import { RichTextRenderer } from "@/components/RichTextRenderer";
import { TicketSalesLink } from "@/components/TicketSales";
import { getContentBlockByKey, getSiteSettings } from "@/lib/site-data";

export const revalidate = 3600;

export default async function HomePage() {
  const [siteSettings, homeBlock] = await Promise.all([
    getSiteSettings(),
    getContentBlockByKey("homepage"),
  ]);

  const hasHomeContent = siteSettings.heroBlurb || homeBlock?.content;

  return (
    <div>
      <section className="home-hero">
        <div className="home-hero-inner">
          <HeroLogo siteName={siteSettings.siteName} />
          {siteSettings.heroDateLabel ? (
            <p className="home-date">{siteSettings.heroDateLabel}</p>
          ) : null}
          <TicketSalesLink
            sales={siteSettings.ticketSales}
            placement="homepage"
            className="home-ticket-button"
          />
        </div>
      </section>

      {hasHomeContent ? (
        <div className="home-content">
          {siteSettings.heroBlurb ? (
            <p className="home-blurb">{siteSettings.heroBlurb}</p>
          ) : null}
          <RichTextRenderer content={homeBlock?.content} />
        </div>
      ) : (
        <div className="home-content">
          <div className="home-empty-state">
            <p>Etusivun sisältö on parhaillaan päivittymässä.</p>
            <p>Tutustuu tapahtumiin navigaation kautta tai selaa galleriaa.</p>
          </div>
        </div>
      )}
    </div>
  );
}
