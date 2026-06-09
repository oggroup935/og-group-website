// Company info, navigation, contact details — single source of truth.
export const siteData = {
  name: "OG GROUP",
  tagline: "Real Estate Wholesaling",
  fullTagline: "Off-Market Real Estate Opportunities",
  domain: "ordavidguyrealestate.com",
  phone: "(216) 677-9031",
  phoneHref: "tel:+12166779031",
  email: "og.realestate.wholesale@gmail.com",
  emailHref: "mailto:og.realestate.wholesale@gmail.com",
  location: "Cleveland, Ohio",

  nav: [
    { label: "Home", href: "/" },
    { label: "Sell Your Property", href: "/sell" },
    { label: "Investor Network", href: "/buyers" },
    { label: "Partners", href: "/partners" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],

  // Header CTA — direct version per locked decision.
  primaryCTA: { label: "Get a Cash Offer", href: "/sell" },
  secondaryCTA: { label: "Join Investor Network", href: "/buyers" },
} as const;

export type SiteData = typeof siteData;
