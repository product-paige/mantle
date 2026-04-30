import type { CustomerStat } from "@/lib/customers/content";

export function CustomerStats({ stats }: { stats?: CustomerStat[] }) {
  if (!stats || stats.length === 0) return null;
  return (
    <dl className="customer-stats">
      {stats.map((s, i) => (
        <div className="customer-stat" key={i}>
          <dt className="customer-stat-value">{s.value}</dt>
          <dd className="customer-stat-label">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
