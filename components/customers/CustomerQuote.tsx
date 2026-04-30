import type { ReactNode } from "react";

export function CustomerQuote({
  author,
  role,
  children,
}: {
  author: string;
  role?: string;
  children: ReactNode;
}) {
  return (
    <figure className="customer-quote">
      <blockquote className="customer-quote-body">{children}</blockquote>
      <figcaption className="customer-quote-cite">
        <span className="customer-quote-author">{author}</span>
        {role ? (
          <>
            <span className="customer-quote-sep" aria-hidden="true">
              ·
            </span>
            <span className="customer-quote-role">{role}</span>
          </>
        ) : null}
      </figcaption>
    </figure>
  );
}
