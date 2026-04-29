import Link from "next/link";
import type { ReactNode } from "react";
import type { ManualManifest, ManualSection } from "@/lib/manuals/content";

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
  children,
}: {
  manifest: ManualManifest;
  current: ManualSection;
  currentIndex: number;
  prev: ManualSection | null;
  next: ManualSection | null;
  children: ReactNode;
}) {
  return (
    <main className="manual-shell">
      <nav className="manual-breadcrumb" aria-label="Breadcrumb">
        <div className="manual-breadcrumb-trail">
          <Link href="/compass">Compass</Link>
          <span className="manual-breadcrumb-sep">/</span>
          <Link href="/compass/manuals">Manuals</Link>
          <span className="manual-breadcrumb-sep">/</span>
          <span className="current">{manifest.title}</span>
        </div>
      </nav>

      <header className="manual-hero">
        <div className="manual-hero-eyebrow">
          <svg
            className="eyebrow-chev"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
          <span>Manual {manifest.number}</span>
        </div>
        <h1>{manifest.title}</h1>
      </header>

      <div className="manual-layout">
        <aside className="manual-sidebar" aria-label="Manual sections">
          <div className="manual-sidebar-label">Sections</div>
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
        </aside>

        <article className="manual-content">
          <section className="manual-section">
            {currentIndex > 0 ? (
              <div className="manual-section-eyebrow">
                Section {pad2(currentIndex)}
              </div>
            ) : (
              <div className="manual-section-eyebrow">
                Section 00 · Introduction
              </div>
            )}
            {children}
          </section>

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
