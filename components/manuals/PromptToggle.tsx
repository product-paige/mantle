"use client";

import { useState } from "react";

export function PromptToggle({
  label,
  prompt,
}: {
  label: string;
  prompt: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      /* swallow */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <details className="notion-toggle">
      <summary>{label}</summary>
      <div className="notion-toggle-body">
        <div className="notion-prompt">
          <div className="notion-prompt-head">
            <span>Prompt</span>
            <button
              type="button"
              className={
                "notion-prompt-copy" + (copied ? " is-copied" : "")
              }
              onClick={copy}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span className="notion-prompt-copy-label">
                {copied ? "Copied" : "Copy"}
              </span>
            </button>
          </div>
          <textarea readOnly value={prompt} />
        </div>
      </div>
    </details>
  );
}
