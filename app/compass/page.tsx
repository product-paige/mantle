import Link from "next/link";
import { CompassLayout } from "@/compass/components/shared/CompassLayout";
import { CompassIndexHero } from "@/compass/components/shared/CompassIndexHero";
import { CompassSectionNav } from "@/compass/components/shared/CompassSectionNav";
import { CompassNewsletter } from "@/compass/components/shared/CompassNewsletter";
import { CompassPromptHeading } from "@/compass/components/shared/CompassPromptHeading";
import { ManualCoverGrid } from "@/compass/components/manuals/ManualCoverGrid";
import { InsightCardGrid } from "@/compass/components/insights/InsightCardGrid";
import { MANUAL_COVERS } from "@/compass/lib/manuals/content";
import { listInsights } from "@/compass/lib/insights/content";

export const metadata = {
  title: "Mantle Compass",
  description:
    "Everything you need to go from idea to a real, working product.",
  alternates: { canonical: "/compass" },
};

/**
 * /compass home — the front page for the Compass resource hub.
 * Migrated from `public/mantle-compass.html`. Replaces the legacy
 * manual-row list + blog grid with the canonical React components:
 *   • <CompassIndexHero>      — title + summary
 *   • <CompassSectionNav>     — the 4-tab section bar
 *   • <ManualCoverGrid>       — the 7 manual covers (same as /compass/manuals)
 *   • <InsightCardGrid>       — latest insights (limited to top 3)
 *   • <CompassNewsletter>     — newsletter signup footer
 */
export default async function CompassHomePage() {
  const insights = await listInsights();
  const latestInsights = insights.slice(0, 3);

  return (
    <CompassLayout showFooterCta={false}>
      <div className="mx-auto w-full max-w-[1320px] px-6 max-[720px]:px-5">
        <CompassIndexHero
          eyebrow={null}
          heading="Mantle Compass"
          description="Everything you need to go from idea to a real, working product."
        />
        <CompassSectionNav currentPath="/compass" />
        <div className="mt-14 max-[720px]:mt-10">
          <ManualCoverGrid covers={MANUAL_COVERS} />
        </div>

        {latestInsights.length > 0 ? (
          /* Latest insights — mirrors the next-gen marketing-page
             section recipe (mantle-homepage.html): gold mono eyebrow,
             section heading, content, trailing "View all →" link.
             Border-top + ~80px vertical padding gives the section the
             same breathing room as `section { padding: 120px 0 }` on
             the marketing template (scaled to Compass's denser
             rhythm). */
          <section
            aria-label="Latest insights"
            className="border-t border-edge-medium pt-20 pb-16 max-[720px]:pt-14 max-[720px]:pb-12"
          >
            <div className="mb-4">
              <CompassPromptHeading text="Insights" color="accent" />
            </div>
            <div className="mb-10 flex items-end justify-between gap-6 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-4">
              <h2 className="m-0 max-w-[20ch] font-heading text-3xl font-medium tracking-tight leading-tight text-fg-high md:text-4xl">
                What our team is saying
              </h2>
              <Link
                href="/compass/insights"
                className="inline-flex items-center gap-1.5 font-sans text-sm font-normal text-accent no-underline transition-colors duration-150 hover:text-accent-low"
              >
                <span>View all insights</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
            <InsightCardGrid insights={latestInsights} />
          </section>
        ) : null}
      </div>
      <CompassNewsletter />
    </CompassLayout>
  );
}
