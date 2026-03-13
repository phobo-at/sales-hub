import React from "react";

interface OlexBadgeProps {
  label?: string;
  tone?: "default" | "soft";
}

export function OlexBadge({
  label = ".LOUPE Olex",
  tone = "default"
}: OlexBadgeProps): JSX.Element {
  return <span className={`olex-badge olex-badge--${tone}`}>{label}</span>;
}
