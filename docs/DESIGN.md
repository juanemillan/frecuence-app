# VitaKore — Design System

## Overview

VitaKore follows a **mobile-first glassmorphism** aesthetic with two themes: a warm *Zen Cream* light mode and a deep *Midnight* dark mode. All UI is constrained to a maximum viewport width of **430 px** to simulate a native mobile shell on desktop browsers.

---

## Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Brand / Headlines | Outfit | 800 | 28–32 px |
| Body | Outfit | 400–600 | 13–16 px |
| Labels / Badges | Outfit | 600–700 | 11–12 px |
| Fallback | Inter, system-ui, sans-serif | — | — |

> Tailwind theme alias: `--font-sans: "Outfit", ui-sans-serif, system-ui, sans-serif`

---

## Color Tokens

### Light Mode — Zen Cream (`:root`)

| Token | Value | Purpose |
|---|---|---|
| `--bg-base` | `#f0ebe1` | Page background |
| `--bg-surface` | `rgba(252,247,240,0.88)` | Card / surface glass |
| `--bg-surface-alt` | `rgba(240,232,218,0.75)` | Secondary surface |
| `--bg-elevated` | `rgba(255,252,248,0.96)` | Elevated panels |
| `--color-primary` | `#0891b2` | Cyan — brand primary |
| `--color-primary-dim` | `rgba(8,145,178,0.12)` | Primary tinted fill |
| `--color-primary-glow` | `rgba(8,145,178,0.28)` | Glow shadows |
| `--color-accent` | `#be185d` | Pink — secondary accent |
| `--color-accent-dim` | `rgba(190,24,93,0.10)` | Accent tinted fill |
| `--color-gold` | `#b45309` | Amber — achievements / XP |
| `--color-gold-dim` | `rgba(180,83,9,0.12)` | Gold tinted fill |
| `--color-red` | `#dc2626` | Error / destructive |
| `--text-primary` | `#1c1917` | Main body text |
| `--text-secondary` | `rgba(28,25,23,0.62)` | Subdued text |
| `--text-muted` | `rgba(28,25,23,0.36)` | Placeholder / hint text |
| `--border-subtle` | `rgba(8,145,178,0.15)` | Default card borders |
| `--border-medium` | `rgba(8,145,178,0.30)` | Emphasized borders |
| `--border-accent` | `rgba(190,24,93,0.20)` | Accent borders |
| `--nav-glass` | `rgba(240,235,225,0.92)` | Header / nav glass fill |
| `--btn-text` | `#ffffff` | Button label color |

### Dark Mode (`[data-theme="dark"]`)

| Token | Value | Purpose |
|---|---|---|
| `--bg-base` | `#080c14` | Page background |
| `--bg-surface` | `rgba(12,20,40,0.72)` | Card / surface glass |
| `--color-primary` | `#6ee7f7` | Cyan — brand primary |
| `--color-accent` | `#f472b6` | Pink — secondary accent |
| `--color-gold` | `#fbbf24` | Amber — achievements / XP |
| `--color-red` | `#f87171` | Error / destructive |
| `--text-primary` | `#f0f4ff` | Main body text |
| `--nav-glass` | `rgba(8,12,20,0.95)` | Header / nav glass fill |
| `--btn-text` | `#080c14` | Button label (dark on light button) |

---

## Gradients

| Token | Value | Usage |
|---|---|---|
| `--grad-primary` | `135deg, primary → indigo → accent` | Hero text, highlights |
| `--grad-button` | `135deg, primary → indigo` | Primary CTA buttons |
| `--grad-gold` | `135deg, gold → amber` | Achievement badges |
| `--grad-surface` | `160deg, primary-tint → accent-tint` | Subtle card backgrounds |

---

## Ambient Background Blobs

Three large radial-gradient circles create a soft ambient glow behind all content. They are `position: fixed`, pointer-events-free, and sit at `z-index: 0`.

| Blob | Position | Color token |
|---|---|---|
| `b1` | Top-left (380 × 380 px) | `--blob-1` |
| `b2` | Mid-right (320 × 320 px) | `--blob-2` |
| `b3` | Bottom-center (280 × 280 px) | `--blob-3` |

---

## Effects & Radius

| Token | Value | Usage |
|---|---|---|
| `--blur-glass` | `blur(20px) saturate(180%)` | Glass card backdrop |
| `--shadow-card` | `0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.90)` | Default card shadow |
| `--shadow-glow` | `0 0 30px var(--color-primary-glow)` | Focus / hover glow |
| `--radius-card` | `20px` | Cards and panels |
| `--radius-pill` | `100px` | Badges and chips |

---

## Component Reference

All reusable style objects live in `src/styles/styles.ts` as the `S` map (type `Record<string, CSSProperties>`).

### App Shell
```
S.app   — Full-height flex column, max-width 430 px, bg-base, Outfit font
S.bg    — Fixed blob wrapper (z-index 0)
S.b1/b2/b3 — Ambient gradient blobs
```

### Layout
```
S.hdr   — Sticky header: glass bg, blur 28px, border-bottom border-subtle
S.scroll — Flex-1 scroll area, padding 14px sides / 100px bottom (nav clearance)
```

### Cards
```
S.gl    — Standard glass card: bg-surface, blur-glass, border-subtle, radius-card, shadow-card
S.hero  — Hero card: cyan/indigo/pink gradient overlay, border-medium, radius 22px
```

### Buttons
```
S.btn   — Primary CTA: grad-button, radius 14px, weight 800, letter-spacing 0.2,
          cyan glow box-shadow, transition opacity + transform
```

### Badges & Chips
```
S.badge — Pill shape: bg-surface-alt, text-secondary, radius-pill, font-size 11px
S.chip  — Square-ish: color-primary-dim text, radius 8px, border-medium, font-size 11px
```

### Navigation
```
S.nav   — Fixed bottom bar: glass bg, blur 32px, border-top border-subtle, z-index 20
S.nb    — Nav tab button: flex-col, text-muted default
S.na    — Active tab override: color-primary
```

### Controls
```
S.bk    — Back button: 40×40 px, bg-surface, radius 12px, blur 12px
S.inp   — Text input: full-width, bg-surface, border-medium, radius 12px,
          font-size 14px, transition border-color
```

---

## Icons

Icons come from **Phosphor Icons** (`@phosphor-icons/react`). All nav/action icons are wrapped in zero-argument functions inside `src/components/Icons.tsx` (`I.*`) so they can be referenced without additional props.

| Category | Icons used |
|---|---|
| Navigation | House, Barbell, ChartBar, PlusCircle, BookOpenText |
| Actions | ArrowLeft, Trash, Clock, CheckFat, SealCheck |
| Workout | Play, Pause, SkipForward |
| Feedback | Trophy, Fire, Lightning, Star, Coins, Sparkle |
| UI | Moon, Sun, X, UserCircle, Lock, Info, CalendarDots, Target |

Default weight is `"bold"`, filled variants (`"fill"`) used for playback controls and star ratings.

---

## Animation

All animated elements use **Framer Motion**.

- **Entrance**: `opacity: 0, y: 20` → `opacity: 1, y: 0`
- **Stagger**: container uses `staggerChildren: 0.08, delayChildren: 0.05`
- **Spring preset**: `stiffness: 340–380, damping: 28–30`
- **Tap feedback**: `whileTap={{ scale: 0.95 }}`
- **Coin float**: custom keyframe animation (`CoinFloat.tsx`)

---

## Scrollbar & Selection

```css
/* Hidden scrollbar */
::-webkit-scrollbar { width: 0; }

/* Text selection */
::selection {
  background: var(--color-primary-dim);
  color: var(--color-primary);
}
```

---

## Theme Switching

Theme is toggled by setting `data-theme="dark"` on the document root element. The default (no attribute) renders the Zen Cream light theme.

---

## Layout Constraints

- Max-width: **430 px**, centered with `margin: 0 auto`
- Bottom nav height clearance: `padding-bottom: 100px` on scroll area
- Header is `position: sticky; top: 0; z-index: 10`
- Bottom nav is `position: fixed; z-index: 20`
