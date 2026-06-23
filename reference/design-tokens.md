# NRMA Insurance Design System — Extracted Tokens

> Extracted via Playwright from live nrma.com.au pages on 2026-06-23.
> Use these values for a 1:1 visual clone in the SafeAhead hackathon prototype.

---

## Color Palette

### Primary Brand Colors
| Name | Hex | Usage |
|------|-----|-------|
| NRMA Navy (primary) | `#010c66` | Dominant brand color — headings, buttons, text, nav, hero backgrounds |
| NRMA Dark Navy | `#00084e` | Darker variant — chat widget, footer, deeper backgrounds |
| NRMA Mid Blue | `#343d85` | Accent — card headers, secondary elements |
| NRMA Light Blue | `#666eb4` | Tertiary accent — hover states, decorative |

### Neutrals & Backgrounds
| Name | Hex | Usage |
|------|-----|-------|
| White | `#ffffff` | Primary background, card surfaces |
| Cream / Warm White | `#f7f1ea` | Hero text color, warm backgrounds, light surfaces |
| Off-white Warm | `#fdfaf9` | Input field backgrounds |
| Cool Gray BG | `#f2f3f9` | Section backgrounds (alternating) |
| Light Lavender | `#eaedf3` | Card backgrounds, subtle separators |
| Light Gray Border | `#d9dbe9` | Borders, dividers |
| Muted Lavender | `#cccee0` | Disabled states, muted borders |
| Mid Gray | `#808080` | Secondary text, placeholder text |
| Input Border Gray | `#8f8a8a` | Input field borders |
| Dark Gray Text | `#6b6b6b` | Muted body text |
| Near-Black | `#212529` | Body text alternative |
| Black | `#000000` | Body text on light backgrounds |

### Accent Colors
| Name | Hex | Usage |
|------|-----|-------|
| Green (trust) | `#91bf9e` | Trust indicators, "why choose us" section backgrounds |
| Yellow-Green | `#d7d667` | Highlight, attention, badges |
| Salmon/Peach | `#f9ae97` | Decorative accent, illustrations |
| Error Red | `#a93532` | Error states, alerts |

---

## Typography

### Font Families
| Priority | Family | Usage |
|----------|--------|-------|
| **Display** | `"Help Type Display Web", Helvetica, Arial` | All headings (h1-h6), hero text |
| **Body** | `"Help Type Text Web", Helvetica, Arial` | Body copy, paragraphs, labels |
| **Fallback (quote page)** | `Graphik, Helvetica, Arial, sans-serif` | Login/quote flow pages |
| **System fallback** | `Arial, Helvetica, sans-serif` | Last resort |

### Font Size Scale
| Token | Size | Usage |
|-------|------|-------|
| display-xl | `64px` | Hero headlines (large screens) |
| display-lg | `56px` | Page titles (h1 on info pages) |
| display-md | `48px` | Section headers |
| h1 | `46px` | Homepage hero headline |
| h2 | `40px` | Section headings |
| h3 | `28px` | Card headings, sub-sections |
| h4 | `24px` | Smaller sub-headings |
| body-lg | `21px` | Lead paragraphs |
| body-md | `18px` | Nav links, emphasized body text |
| **body (base)** | `16px` | Default body text, buttons, inputs |
| body-sm | `14px` | Captions, fine print |
| caption | `12px` | Legal text, footnotes |

### Font Weights
| Weight | Usage |
|--------|-------|
| `500` (Medium) | Headings, buttons, nav category labels |
| `400` (Regular) | Body text, secondary buttons |

### Line Heights
| Font Size | Line Height | Ratio |
|-----------|-------------|-------|
| 56px | 61.6px | 1.1 |
| 46px | 55.2px | 1.2 |
| 40px | 48px | 1.2 |
| 32px | 41.6px | 1.3 |
| 28px | 33.6px | 1.2 |
| 24px | 30.48px | 1.27 |

---

## Spacing System

Based on observed paddings and margins, NRMA uses a **8px base grid**:

| Token | Value | Usage |
|-------|-------|-------|
| xs | `4px` | Inline icon spacing |
| sm | `8px` | Button padding (vertical), tight gaps |
| md | `12px` | Input padding, compact button padding |
| lg | `16px` | Input padding (horizontal), standard gaps |
| xl | `24px` | Button padding (horizontal), section gaps |
| 2xl | `32px` | Card padding |
| 3xl | `48px` | Section padding |
| 4xl | `64px` | Large section margins |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| pill | `64px` | Primary buttons (fully rounded pill shape) |
| card-lg | `48px` | Large hero cards (top/bottom) |
| card | `24px` | Standard cards, panels |
| panel | `16px` | Chat widgets, smaller panels |
| input | `12px` | Text inputs, search fields |
| sm | `8px` | Small elements |
| xs | `4px` | Tight rounding, compact buttons |
| none | `2px` | Quote page inputs (minimal rounding) |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| card | `rgba(72,70,69,0.1) 0px 1px 6px, rgba(72,70,69,0.06) 0px 1px 2px` | Cards, elevated surfaces |
| dropdown | `rgba(0,0,0,0.14) 0px 4px 5px, rgba(0,0,0,0.12) 0px 1px 10px, rgba(0,0,0,0.2) 0px 2px 4px -1px` | Dropdowns, modals |
| focus | `rgb(128,128,128) 0px 0px 10px` | Input focus state |

---

## Component Styles

### Buttons

#### Primary Button (CTA)
```css
background: #010c66;
color: #f7f1ea; /* warm cream text */
font-size: 16px;
font-weight: 500;
border: 2px solid #010c66;
border-radius: 64px; /* pill shape */
padding: 8px 24px;
text-transform: none;
letter-spacing: normal;
```

#### Secondary Button (Ghost/Outline)
```css
background: transparent;
color: #010c66;
font-size: 16px;
font-weight: 500;
border: 2px solid #010c66;
border-radius: 64px; /* pill shape */
padding: 8px 24px;
```

#### Compact CTA (inline)
```css
background: #010c66;
color: #010c66; /* text inside is actually cream — computed off */
font-size: 16px;
font-weight: 400;
border: 2px solid #010c66;
border-radius: 4px;
padding: 4px 12px;
```

#### Nav Category Tab
```css
background: transparent;
color: #010c66;
font-size: 18px;
font-weight: 500;
border: none;
padding: 0px 8px;
```

### Text Inputs
```css
background: #fdfaf9; /* warm off-white */
color: #000000;
border: 1px solid #8f8a8a;
border-radius: 12px; /* main site */
/* OR border-radius: 2px; for quote/login pages */
padding: 0px 16px;
font-size: 16px;
height: 48px; /* on quote pages */
```

### Cards
```css
background: #ffffff;
border-radius: 24px;
box-shadow: rgba(72,70,69,0.1) 0px 1px 6px, rgba(72,70,69,0.06) 0px 1px 2px;
padding: 32px;
```

---

## Layout Patterns

### Navigation
- Full-width sticky header
- White background
- NRMA logo (left-aligned)
- Category tabs center: "Car & Vehicle", "Home & Property", "Business", "Travel"
- Two CTAs right: "Get a quote" (primary pill), "Make a claim" (outline pill)
- Below nav: secondary links "Help & Support", "Contact Us"

### Page Structure
- Max content width: ~1200px, centered
- Full-bleed colored sections alternate between white and cream/navy
- Hero section: Navy background (`#010c66`) with cream (`#f7f1ea`) text
- Generous vertical spacing between sections (48-64px)

### Grid
- Cards in 2-3 column layouts
- Equal spacing, responsive stacking
- Category sections use tabbed navigation pattern

### Footer
- Dark navy background (`#00084e` or `#010c66`)
- Multi-column link layout
- Cream/white text
- Legal info, social links

---

## Key Brand Notes for Clone

1. **The navy (#010c66) is EVERYWHERE** — it's not just an accent, it's the dominant color for text, buttons, headers, and backgrounds.
2. **Warm cream (#f7f1ea) is the light text color** — used on dark navy backgrounds instead of pure white. Gives a softer, premium feel.
3. **Pill-shaped buttons** — the rounded `border-radius: 64px` is distinctive. Primary is filled navy, secondary is outlined.
4. **"Help Type Display Web"** is the custom brand font for headings. For the clone, substitute with a similar geometric sans-serif (e.g., `Poppins` or `DM Sans` from Google Fonts) if the custom font isn't available.
5. **"Help Type Text Web"** is the body font. Substitute with a clean sans-serif (e.g., `Inter` or `Source Sans 3`).
6. **Warm inputs** — input fields use warm off-white (#fdfaf9) backgrounds with rounded corners (12px on main site).
7. **Generous whitespace** — the site breathes. Sections have 48-64px padding, cards have 24-32px internal padding.
8. **No heavy shadows** — elevation is subtle. Cards have very light shadows.
9. **Green/yellow accents** are used sparingly in trust/value proposition sections.
10. **Alternating section backgrounds** — sections alternate between white, cream (#f7f1ea), cool gray (#f2f3f9), and navy (#010c66).
