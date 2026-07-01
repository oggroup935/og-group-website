// Curated real-estate, street & lifestyle photography (Unsplash, commercial-use).
// Named slots are swappable. `gallery` feeds cinematic reels/montages.
const u = (id: string, w = 1920) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  // Property / place
  heroStreet: u("1570129477492-45c003edd2be"),
  standoutHome: u("1600596542815-ffad4c1539a9"),
  clevelandSkyline: u("1547916721-7469af15e2a3"),
  parkWaterfront: u("1675972013964-0843d80bad06"),
  streetAlt1: u("1449844908441-8829872d2607"),
  streetAlt2: u("1564013799919-ab600027ffc6"),
  urbanAve: u("1480714378408-67cf0d13bc1b"),

  // People / lifestyle — variety (conversations, meetings, partnerships)
  meeting: u("1600880292203-757bb62b4baf"),
  conversation: u("1521737604893-d14cc237f11d"),
  team: u("1556761175-b413da4baf72"),
  handshake: u("1521791136064-7986c2920216"),
  signing: u("1554224155-6726b3ff858f"),
  groupTalk: u("1543269865-cbf427effbad"),
} as const;

// Cinematic reels / montages — mix of homes, streets, people & deals.
export const gallery = [
  u("1570129477492-45c003edd2be", 1100),
  u("1600880292203-757bb62b4baf", 1100),
  u("1564013799919-ab600027ffc6", 1100),
  u("1521737604893-d14cc237f11d", 1100),
  u("1600585154340-be6161a56a0c", 1100),
  u("1556761175-b413da4baf72", 1100),
  u("1449844908441-8829872d2607", 1100),
  u("1521791136064-7986c2920216", 1100),
  u("1518780664697-55e3ad937233", 1100),
  u("1543269865-cbf427effbad", 1100),
];

export type ImageKey = keyof typeof images;
