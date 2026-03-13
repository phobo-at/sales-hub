import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { SiteHeader } from "@/components/site-header";

let mockPathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}));

describe("SiteHeader", () => {
  beforeEach(() => {
    mockPathname = "/";
  });

  it("marks the active module rail item and keeps the CTA visible", () => {
    mockPathname = "/module/whistleblowing";
    const html = renderToStaticMarkup(<SiteHeader ctaHref="/kontakt" />);

    expect(html).toContain('href="/module/whistleblowing"');
    expect(html).toContain('aria-current="page"');
    expect(html).toContain('href="/kontakt"');
  });

  it("marks use cases in the primary navigation", () => {
    mockPathname = "/use-cases/richtlinien-verstehen-und-bestaetigen";
    const html = renderToStaticMarkup(<SiteHeader ctaHref="/kontakt" />);

    expect(html).toContain('href="/#use-cases"');
    expect(html).toContain("Use Cases");
    expect(html).toContain('aria-current="page"');
  });
});
