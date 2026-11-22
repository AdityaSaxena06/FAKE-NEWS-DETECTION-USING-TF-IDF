/**
 * Curated sample news articles and headlines for testing TruthLens
 */

export const SAMPLE_NEWS = [
  {
    id: 'sample_real_reuters',
    type: 'REAL',
    category: 'Politics (Reuters)',
    title: 'Senate passes bipartisan infrastructure framework',
    snippet: 'WASHINGTON (Reuters) - The U.S. Senate on Tuesday approved a comprehensive bipartisan infrastructure package...',
    fullText: 'WASHINGTON (Reuters) - The U.S. Senate on Tuesday approved a comprehensive bipartisan infrastructure framework aimed at modernizing domestic transit, electrical grids, and public water utilities over the next decade. Leaders from both parties reached a negotiated agreement following weeks of committee hearings, providing targeted federal grants for state-level highway reconstruction and broadband connectivity expansions.'
  },
  {
    id: 'sample_real_tech',
    type: 'REAL',
    category: 'Technology & Science',
    title: 'Astronomers detect water vapor signatures in exoplanet atmosphere',
    snippet: 'GENEVA (Reuters) - An international team of astrophysicists utilizing high-resolution orbital spectroscopy...',
    fullText: 'GENEVA (Reuters) - An international team of astrophysicists utilizing high-resolution orbital spectroscopy has confirmed the detection of water vapor in the atmosphere of an Earth-sized exoplanet orbiting within its host stars habitable zone. Researchers stated that further spectral analysis is required to determine atmospheric density and surface temperature equilibrium.'
  },
  {
    id: 'sample_fake_conspiracy',
    type: 'FAKE',
    category: 'Sensational Clickbait',
    title: 'Secret elite bunker uncovered beneath metropolitan landmark',
    snippet: 'SHOCKING LEAK: Anonymous whistleblower reveals massive underground luxury complex funded by secret cabal...',
    fullText: 'SHOCKING LEAK: An anonymous whistleblower has finally exposed a secret subterranean bunker complex buried beneath a prominent national landmark. Insiders claim high-ranking globalists and rogue operatives have stockpiled billions in gold bullion and exotic technology to prepare for an orchestrated global blackout event that mainstream media refuses to report.'
  },
  {
    id: 'sample_fake_miracle',
    type: 'FAKE',
    category: 'Fabricated Science',
    title: 'Doctors stunned as kitchen pantry spice reverses aging instantly',
    snippet: 'Big Pharma in panic mode after independent doctor reveals 100% natural miracle spice that regenerates cellular DNA...',
    fullText: 'Big Pharma is in complete panic mode after a renegade herbalist discovered that an ordinary household spice can instantly reverse biological aging and dissolve arterial plaque overnight. Corrupt regulatory agencies tried to ban this ancient Himalayan secret, but patriotic doctors leaked the formula online before censors could wipe the servers clean.'
  },
  {
    id: 'sample_headline_real',
    type: 'REAL',
    category: 'Short Headline (Real)',
    title: 'Federal Reserve keeps benchmark interest rate steady amidst declining inflation data',
    snippet: 'Short financial market headline...',
    fullText: 'Federal Reserve keeps benchmark interest rate steady amidst declining inflation data and stable labor market conditions.'
  },
  {
    id: 'sample_headline_fake',
    type: 'FAKE',
    category: 'Short Headline (Fake)',
    title: 'UN caught voting in secret midnight session to confiscate citizens bank accounts',
    snippet: 'Viral conspiracy headline...',
    fullText: 'UN caught voting in secret midnight session to confiscate personal private bank accounts and replace currency with biometric chips!'
  }
];
