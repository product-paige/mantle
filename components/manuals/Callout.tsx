import type { ReactNode } from "react";

export function Callout({
  icon = "💡",
  children,
}: {
  icon?: string;
  children: ReactNode;
}) {
  return (
    <div className="notion-callout">
      <div className="notion-callout-icon">{icon}</div>
      <div className="notion-callout-content">{children}</div>
    </div>
  );
}
