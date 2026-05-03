// Theme tokens for both directions, and small shared helpers.

const THEME_A_LIGHT = {
  // "Field Journal" — warm paper, deep forest accent, ink
  bg:        "#efe8d8",
  surface:   "#f7f1e1",
  card:      "#fffaee",
  ink:       "#2a2620",
  inkSoft:   "#5a5246",
  inkMuted:  "#8a7f6e",
  rule:      "#d8cdb3",
  ruleSoft:  "#e6dcc4",
  accent:    "#345c3a",      // forest
  accentSoft:"#dde7d6",
  warn:      "#a05a2c",      // burnt sienna
  ok:        "#345c3a",
  danger:    "#9b3a2a",
  goldA:     "#b88a2a",
  silverA:   "#8a8a8a",
  bronzeA:   "#9a6536",
};

const THEME_A_DARK = {
  bg:        "#1a1612",
  surface:   "#221c15",
  card:      "#2a231a",
  ink:       "#f0e8d4",
  inkSoft:   "#c8bea6",
  inkMuted:  "#897e6a",
  rule:      "#3a3225",
  ruleSoft:  "#2f2a20",
  accent:    "#7fb084",
  accentSoft:"#2c3a2e",
  warn:      "#d39b6a",
  ok:        "#7fb084",
  danger:    "#d97a66",
  goldA:     "#d4a955",
  silverA:   "#aaa6a0",
  bronzeA:   "#c08560",
};

const THEME_B_LIGHT = {
  // "Modern Minimal" — neutral grays, single confident accent
  bg:        "#f5f5f4",
  surface:   "#ffffff",
  card:      "#ffffff",
  ink:       "#0c0c0c",
  inkSoft:   "#3f3f3f",
  inkMuted:  "#7a7a7a",
  rule:      "#e6e6e3",
  ruleSoft:  "#efefec",
  accent:    "#a23e2a",
  accentSoft:"#fbe9e3",
  warn:      "#a55e1a",
  ok:        "#2f6b3a",
  danger:    "#a23e2a",
  goldA:     "#a8862e",
  silverA:   "#777777",
  bronzeA:   "#8a5a36",
};

const THEME_B_DARK = {
  bg:        "#0c0c0c",
  surface:   "#161616",
  card:      "#1c1c1c",
  ink:       "#f5f5f4",
  inkSoft:   "#bababa",
  inkMuted:  "#7a7a7a",
  rule:      "#262626",
  ruleSoft:  "#1f1f1f",
  accent:    "#e26a4a",
  accentSoft:"#3a1f17",
  warn:      "#d49656",
  ok:        "#74b885",
  danger:    "#e26a4a",
  goldA:     "#d4b066",
  silverA:   "#999999",
  bronzeA:   "#c08560",
};

function getTheme(direction, dark) {
  if (direction === "B") return dark ? THEME_B_DARK : THEME_B_LIGHT;
  return dark ? THEME_A_DARK : THEME_A_LIGHT;
}

// ─── Type styles ──────────────────────────────────────────────
// A: Newsreader (serif) + Inter Tight (sans)
// B: Geist (sans) + Geist Mono
const FONT_A_SERIF = '"Newsreader", "Iowan Old Style", Georgia, serif';
const FONT_A_SANS  = '"Inter Tight", "Inter", system-ui, sans-serif';
const FONT_B_SANS  = '"Geist", "Inter", system-ui, sans-serif';
const FONT_B_MONO  = '"Geist Mono", "JetBrains Mono", ui-monospace, monospace';

function getFonts(direction) {
  if (direction === "B") return { display: FONT_B_SANS, body: FONT_B_SANS, mono: FONT_B_MONO, serif: FONT_B_SANS };
  return { display: FONT_A_SERIF, body: FONT_A_SANS, mono: FONT_B_MONO, serif: FONT_A_SERIF };
}

// ─── Tiny SVG icons ───────────────────────────────────────────
const Icon = ({ name, size = 16, color = "currentColor", strokeWidth = 1.6 }) => {
  const p = {
    home:    "M3 11l9-8 9 8M5 9.5V21h14V9.5",
    feed:    "M4 6h16M4 12h16M4 18h10",
    edit:    "M4 20h16M5 17l9-9 3 3-9 9H5v-3z",
    book:    "M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3V4z M5 4v13",
    badge:   "M12 3l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3H5v-4l-3-3 3-3V6h4z",
    troop:   "M3 20a5 5 0 0110 0 M8 11a4 4 0 100-8 4 4 0 000 8z M16 20a5 5 0 0110-10 M22 5a3 3 0 100 6",
    check:   "M5 12l4 4L19 6",
    x:       "M6 6l12 12 M18 6L6 18",
    image:   "M3 5h18v14H3z M3 16l5-5 4 4 3-3 6 6",
    plus:    "M12 5v14 M5 12h14",
    bell:    "M6 9a6 6 0 1112 0v5l2 3H4l2-3V9z M10 20a2 2 0 004 0",
    search:  "M11 19a8 8 0 100-16 8 8 0 000 16zm6-2l4 4",
    settings:"M12 15a3 3 0 100-6 3 3 0 000 6z M19 12l2 1-1 3-2-1-2 2 1 2-3 1-1-2h-2l-1 2-3-1 1-2-2-2-2 1-1-3 2-1v-2l-2-1 1-3 2 1 2-2-1-2 3-1 1 2h2l1-2 3 1-1 2 2 2 2-1 1 3-2 1v2z",
    clock:   "M12 22a10 10 0 100-20 10 10 0 000 20z M12 7v5l3 2",
    pin:     "M12 21s-7-7-7-12a7 7 0 1114 0c0 5-7 12-7 12z M12 11a2 2 0 100-4 2 2 0 000 4z",
    users:   "M9 11a4 4 0 100-8 4 4 0 000 8z M2 21a7 7 0 0114 0 M17 11a3 3 0 100-6 M22 21a5 5 0 00-5-5",
    flame:   "M12 22c4 0 7-3 7-7 0-3-2-5-3-7 0-2-1-3-1-5-2 1-3 3-3 5 0 1-1 2-2 2-2 0-3 2-3 5 0 4 3 7 5 7z",
    star:    "M12 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z",
    arrow:   "M5 12h14 M13 6l6 6-6 6",
    arrowL:  "M19 12H5 M11 6l-6 6 6 6",
    paperclip:"M21 11l-9 9a5 5 0 01-7-7l9-9a3 3 0 014 4l-9 9a1 1 0 01-2-2l8-8",
    quote:   "M7 7h4v4H7v3a3 3 0 003 3 M15 7h4v4h-4v3a3 3 0 003 3",
    grid:    "M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z",
    list:    "M3 6h2v2H3z M3 11h2v2H3z M3 16h2v2H3z M8 7h13 M8 12h13 M8 17h13",
    chevD:   "M6 9l6 6 6-6",
  }[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
         style={{ flexShrink: 0 }}>
      <path d={p} />
    </svg>
  );
};

// Photo placeholder — striped, monospace label. Per system prompt.
const PhotoPlaceholder = ({ label = "photo", w = "100%", h = 120, theme, font, tone = "neutral" }) => {
  const tones = {
    neutral: { stripe: theme.rule, bg: theme.ruleSoft, ink: theme.inkMuted },
    warm:    { stripe: "#d8b888", bg: "#e8d4ac", ink: "#6b4a26" },
    forest:  { stripe: "#7a9684", bg: "#a8c0ae", ink: "#2a3a2e" },
    sky:     { stripe: "#9ab2c8", bg: "#bccddc", ink: "#2a3a4a" },
    dusk:    { stripe: "#a48ca6", bg: "#bba6ba", ink: "#3a2a3a" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <div style={{
      width: w, height: h,
      background: `repeating-linear-gradient(135deg, ${t.bg} 0 14px, ${t.stripe} 14px 15px)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: t.ink, fontFamily: FONT_B_MONO, fontSize: 10.5, letterSpacing: 0.4,
      textTransform: "uppercase", borderRadius: 2,
    }}>
      <span style={{ background: t.bg, padding: "2px 6px" }}>{label}</span>
    </div>
  );
};

// ─── Badge glyph ──────────────────────────────────────────────
// Geometric shapes only — no figurative SVG.
const BadgeGlyph = ({ tier = "Gold", earned = true, size = 56, style = "shield", theme }) => {
  const colors = {
    Gold:   theme.goldA,
    Silver: theme.silverA,
    Bronze: theme.bronzeA,
  };
  const fill = earned ? colors[tier] : "transparent";
  const stroke = earned ? colors[tier] : theme.rule;
  if (style === "circle") {
    return (
      <svg width={size} height={size} viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="24" fill={fill} stroke={stroke} strokeWidth="2" opacity={earned ? 1 : 0.4}/>
        <circle cx="28" cy="28" r="16" fill="none" stroke={earned ? "#fff" : theme.rule} strokeWidth="1.2" opacity={earned ? 0.6 : 0.4}/>
        <circle cx="28" cy="28" r="6"  fill={earned ? "#fff" : "transparent"} stroke={stroke} opacity={earned ? 0.9 : 0.4}/>
      </svg>
    );
  }
  if (style === "diamond") {
    return (
      <svg width={size} height={size} viewBox="0 0 56 56">
        <rect x="14" y="14" width="28" height="28" transform="rotate(45 28 28)" fill={fill} stroke={stroke} strokeWidth="2" opacity={earned ? 1 : 0.4}/>
        <rect x="22" y="22" width="12" height="12" transform="rotate(45 28 28)" fill="none" stroke={earned ? "#fff" : theme.rule} strokeWidth="1.2" opacity={earned ? 0.7 : 0.4}/>
      </svg>
    );
  }
  // shield (default)
  return (
    <svg width={size} height={size} viewBox="0 0 56 56">
      <path d="M28 4 L48 12 V28 C48 40 38 50 28 52 C18 50 8 40 8 28 V12 Z"
            fill={fill} stroke={stroke} strokeWidth="2" opacity={earned ? 1 : 0.4}/>
      <path d="M28 14 L40 18 V28 C40 36 34 42 28 44 C22 42 16 36 16 28 V18 Z"
            fill="none" stroke={earned ? "#fff" : theme.rule} strokeWidth="1.2" opacity={earned ? 0.7 : 0.4}/>
    </svg>
  );
};

// ─── Pill / chip ──────────────────────────────────────────────
const Chip = ({ children, tone = "neutral", theme, font, style = {} }) => {
  const tones = {
    neutral: { bg: theme.ruleSoft, fg: theme.inkSoft, br: theme.rule },
    accent:  { bg: theme.accentSoft, fg: theme.accent, br: theme.accent },
    warn:    { bg: "transparent", fg: theme.warn, br: theme.warn },
    ok:      { bg: theme.accentSoft, fg: theme.ok, br: theme.ok },
    danger:  { bg: "transparent", fg: theme.danger, br: theme.danger },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 11, fontFamily: font.body, fontWeight: 500,
      background: t.bg, color: t.fg,
      border: `1px solid ${t.br}`,
      padding: "3px 9px", borderRadius: 999, lineHeight: 1.2,
      letterSpacing: 0.1,
      ...style,
    }}>{children}</span>
  );
};

// Activity heatmap dot
const ActivityHeatmap = ({ data, theme, columns = 14, cell = 12, gap = 3 }) => {
  const rows = Math.ceil(data.length / columns);
  const colorFor = (v) => {
    if (v === 0) return theme.ruleSoft;
    const opacity = 0.25 + v * 0.18;
    return `color-mix(in oklab, ${theme.accent} ${opacity * 100}%, ${theme.ruleSoft})`;
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, ${cell}px)`, gap, alignContent: "start" }}>
      {data.slice(0, columns * rows).map((v, i) => (
        <div key={i} style={{
          width: cell, height: cell,
          background: colorFor(v),
          borderRadius: 2,
        }}/>
      ))}
    </div>
  );
};

Object.assign(window, {
  getTheme, getFonts, Icon, PhotoPlaceholder, BadgeGlyph, Chip, ActivityHeatmap,
  FONT_A_SERIF, FONT_A_SANS, FONT_B_SANS, FONT_B_MONO,
});
