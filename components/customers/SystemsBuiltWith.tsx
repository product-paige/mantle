import type { ReactNode } from "react";

type SystemDef = {
  kicker: string;
  title: string;
  desc: string;
  href: string;
  icon: ReactNode;
};

const SYSTEMS: Record<string, SystemDef> = {
  customers: {
    kicker: "Customers",
    title: "Segmentation",
    desc: "Profiles, lifecycle, and segments unified — so every campaign targets the right person at the right moment.",
    href: "/systems#customers",
    icon: (
      <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
        <circle cx="32" cy="20" r="8" />
        <path d="M32 32c-9 0-16 6-16 14v4h32v-4c0-8-7-14-16-14z" />
        <circle cx="14" cy="22" r="6" />
        <circle cx="50" cy="22" r="6" />
      </svg>
    ),
  },
  messaging: {
    kicker: "Messaging",
    title: "Lifecycle campaigns",
    desc: "Trigger-based email and SMS that respond to what each customer actually does — onboarding, churn, reactivation.",
    href: "/systems#messaging",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path
          d="M10 14h44v28H30l-12 10V42H10z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <circle cx="22" cy="28" r="2.5" fill="#0e0b14" />
        <circle cx="32" cy="28" r="2.5" fill="#0e0b14" />
        <circle cx="42" cy="28" r="2.5" fill="#0e0b14" />
      </svg>
    ),
  },
  partnerships: {
    kicker: "Partnerships",
    title: "Referral tracking",
    desc: "Affiliates, referrals, and reseller programs with attribution and payouts that scale across regions.",
    href: "/systems#partnerships",
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        aria-hidden="true"
      >
        <circle cx="22" cy="32" r="13" />
        <circle cx="42" cy="32" r="13" />
      </svg>
    ),
  },
  automations: {
    kicker: "Automations",
    title: "Reward flows",
    desc: "Workflows and triggers that move money, points, and status without anyone touching a spreadsheet.",
    href: "/systems#automations",
    icon: (
      <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
        <rect x="29" y="6" width="6" height="52" rx="2" />
        <rect x="6" y="29" width="52" height="6" rx="2" />
        <rect x="29" y="6" width="6" height="52" rx="2" transform="rotate(45 32 32)" />
        <rect x="29" y="6" width="6" height="52" rx="2" transform="rotate(-45 32 32)" />
      </svg>
    ),
  },
};

export function SystemsBuiltWith({ slugs }: { slugs: string[] }) {
  const items = slugs
    .map((s) => ({ slug: s, def: SYSTEMS[s] }))
    .filter((x): x is { slug: string; def: SystemDef } => Boolean(x.def));
  if (items.length === 0) return null;
  return (
    <section className="customer-systems" aria-label="Built with Mantle">
      <div className="customer-systems-inner">
        <div className="customer-systems-head">
          <span className="customer-systems-eyebrow">Built with Mantle</span>
          <h2>How they did it</h2>
        </div>
        <div className="customer-systems-grid" data-count={items.length}>
          {items.map(({ slug, def }) => (
            <a key={slug} className="customer-system-card" href={def.href}>
              <div className="customer-system-card-media" aria-hidden="true" />
              <div className="customer-system-card-kicker">{def.kicker}</div>
              <div className="customer-system-card-title">{def.title}</div>
              <p className="customer-system-card-desc">{def.desc}</p>
              <span className="customer-system-card-learn">Learn more</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
