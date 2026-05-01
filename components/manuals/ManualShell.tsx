import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { ManualManifest, ManualSection } from "@/lib/manuals/content";
import { ManualCopyLink } from "./ManualCopyLink";
import { SidebarSubscribe } from "./SidebarSubscribe";

function pad2(n: number) {
  return n < 10 ? "0" + n : "" + n;
}

function hrefFor(manualSlug: string, s: ManualSection) {
  return `/manuals/${manualSlug}/${s.slug ? s.slug + "/" : ""}`;
}

export function ManualShell({
  manifest,
  current,
  currentIndex,
  prev,
  next,
  currentSummary,
  children,
}: {
  manifest: ManualManifest;
  current: ManualSection;
  currentIndex: number;
  prev: ManualSection | null;
  next: ManualSection | null;
  currentSummary?: string;
  children: ReactNode;
}) {
  const accent = manifest.accent ?? "#9676FF";
  return (
    <main
      className="manual-shell"
      style={
        {
          "--gold": accent,
          "--gold-high": accent,
          "--gold-soft": `color-mix(in srgb, ${accent} 18%, transparent)`,
          "--gold-glow": `color-mix(in srgb, ${accent} 30%, transparent)`,
        } as CSSProperties
      }
    >
      <div className="manual-layout">
        <aside className="manual-sidebar" aria-label="Manual sections">
          <div className="manual-sidebar-head">
            <Link className="manual-sidebar-trail" href="/compass/manuals">
              Manuals /
            </Link>
            <h2 className="manual-sidebar-manual">{manifest.title}</h2>
          </div>
          {manifest.sections.map((s, i) => {
            const active = s.slug === current.slug;
            return (
              <Link
                key={s.slug || "intro"}
                href={hrefFor(manifest.slug, s)}
                className={active ? "active" : undefined}
              >
                <span className="manual-sidebar-num">{pad2(i)}</span>
                <span className="manual-sidebar-title">{s.title}</span>
              </Link>
            );
          })}
          <SidebarSubscribe />
        </aside>

        <article className="manual-content">
          <header
            className={
              "manual-hero" +
              (manifest.heroVariant === "light" ? " manual-hero--light" : "")
            }
          >
            <div className="manual-hero-row">
              <div className="manual-hero-eyebrow">
                Section {pad2(currentIndex)}
              </div>
              <ManualCopyLink />
            </div>
            <h1>{current.title}</h1>
            {currentSummary ? (
              <p className="manual-hero-summary">{currentSummary}</p>
            ) : null}
          </header>
          <section className="manual-section">{children}</section>

          <nav className="manual-prev-next" aria-label="Section navigation">
            {prev ? (
              <Link className="prev" href={hrefFor(manifest.slug, prev)}>
                <span className="pn-label">
                  <svg
                    className="pn-chev"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  Previous
                </span>
                <span className="pn-title">{prev.title}</span>
              </Link>
            ) : (
              <span className="placeholder" />
            )}
            {next ? (
              <Link className="next" href={hrefFor(manifest.slug, next)}>
                <span className="pn-label">
                  Next
                  <svg
                    className="pn-chev"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
                <span className="pn-title">{next.title}</span>
              </Link>
            ) : (
              <Link className="next" href="/compass/manuals">
                <span className="pn-label">
                  Manual complete
                  <svg
                    className="pn-chev"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
                <span className="pn-title">Back to all manuals</span>
              </Link>
            )}
          </nav>
        </article>
      </div>
    </main>
  );
}
