import Link from "next/link";
import type { ReactNode } from "react";
import type { CustomerMeta } from "@/lib/customers/content";
import { CustomerStats } from "./CustomerStats";
import { SystemsBuiltWith } from "./SystemsBuiltWith";

export function CustomerShell({
  meta,
  children,
}: {
  meta: CustomerMeta;
  children: ReactNode;
}) {
  return (
    <main className="customer-shell">
      <header className="customer-hero">
        <div className="customer-hero-inner">
          <nav className="customer-breadcrumb eyebrow" aria-label="Breadcrumb">
            <Link href="/results">Results</Link>
            <span className="customer-breadcrumb-sep" aria-hidden="true">
              /
            </span>
            <span className="current">{meta.company}</span>
          </nav>

          <div className="customer-hero-grid">
            <div className="customer-hero-media" aria-hidden="true">
              {meta.heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={meta.heroImage} alt="" />
              ) : (
                <span className="customer-hero-media-label">
                  {meta.company} image
                </span>
              )}
            </div>

            <div className="customer-hero-text">
              {meta.meta && meta.meta.length > 0 ? (
                <ul
                  className="customer-hero-meta"
                  aria-label="Customer details"
                >
                  {meta.meta.map((m) => (
                    <li key={m.label} className="customer-hero-meta-item">
                      <span className="customer-hero-meta-label">
                        {m.label}
                      </span>
                      <span className="customer-hero-meta-value">
                        {m.value}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="customer-hero-headline">
                {meta.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="customer-hero-logo"
                    src={meta.logo}
                    alt={`${meta.company} logo`}
                  />
                ) : null}
                <h1>{meta.title}</h1>
                <p className="customer-hero-summary">{meta.summary}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {meta.stats && meta.stats.length > 0 ? (
        <section className="customer-results" aria-label="Results">
          <div className="customer-results-inner">
            <CustomerStats stats={meta.stats} />
          </div>
        </section>
      ) : null}

      <div className="customer-body">
        <article className="customer-content">{children}</article>
      </div>

      {meta.systems && meta.systems.length > 0 ? (
        <SystemsBuiltWith slugs={meta.systems} />
      ) : null}

      <section className="customer-cta" aria-label="Call to action">
        <div className="customer-cta-inner">
          <h2>See what Mantle can do for you</h2>
          <p>
            A unified system for affiliates, partners, and growth — built for
            modern commerce teams.
          </p>
          <div className="customer-cta-actions">
            <Link className="customer-cta-primary" href="#">
              Create a free account
            </Link>
            <Link className="customer-cta-secondary" href="/results">
              Read more stories
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
