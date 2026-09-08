---
name: Liquid Precision
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3b494c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6b7a7d'
  outline-variant: '#bac9cc'
  surface-tint: '#006875'
  primary: '#006875'
  on-primary: '#ffffff'
  primary-container: '#00e5ff'
  on-primary-container: '#00626e'
  inverse-primary: '#00daf3'
  secondary: '#515f78'
  on-secondary: '#ffffff'
  secondary-container: '#d2e0fe'
  on-secondary-container: '#55637d'
  tertiary: '#7212ff'
  on-tertiary: '#ffffff'
  tertiary-container: '#d9c8ff'
  on-tertiary-container: '#6c00f7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9cf0ff'
  primary-fixed-dim: '#00daf3'
  on-primary-fixed: '#001f24'
  on-primary-fixed-variant: '#004f58'
  secondary-fixed: '#d6e3ff'
  secondary-fixed-dim: '#b9c7e4'
  on-secondary-fixed: '#0d1c32'
  on-secondary-fixed-variant: '#39475f'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d1bcff'
  on-tertiary-fixed: '#23005b'
  on-tertiary-fixed-variant: '#5700c9'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 32px
  gutter: 24px
  sidebar-width: 280px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is built for a premium product-development environment where fluidity meets industrial precision. The brand personality is sophisticated, forward-thinking, and hyper-organized. It balances the "flow" of creative development with the "forge" of technical execution.

The visual style is a fusion of **Minimalism** and **Glassmorphism**. It utilizes heavy whitespace to allow complex data to breathe, while employing translucent layers and vibrant aqua-cyan accents to create a sense of depth and modern innovation. The signature aesthetic feature is the use of abstract, layered wave patterns—representing velocity and continuous integration—applied subtly across backgrounds and UI indicators.

## Colors

The palette is anchored by **Deep Navy (#0A192F)** for primary text and structural elements, providing a grounded, professional foundation. **Off-White (#F8FAFC)** serves as the primary canvas to maintain a clean, open feel.

Accents are driven by a "Flow Gradient" consisting of **Electric Blue, Cyan, and Aqua**. These are used sparingly for high-action items, progress states, and brand-defining moments. 
- **Primary:** Electric Cyan (#00E5FF) for interactive elements and highlights.
- **Surface:** White (#FFFFFF) with high transparency for glassmorphic layers.
- **Border:** Low-opacity Navy (10% alpha) to define structure without adding visual noise.

## Typography

This design system utilizes a dual-font strategy to balance character with utility. **Manrope** is used for headlines to provide a modern, refined, and slightly tech-forward personality. **Inter** is used for all body text, inputs, and labels to ensure maximum legibility in data-heavy workflows.

Key typographic rules:
- Use **Display-LG** for hero sections and major dashboard headers.
- **Label-Bold** should be used for section titles and table headers, always in uppercase with slight tracking.
- Paragraph text should maintain a generous line-height (1.5x) to support readability in long documentation or project descriptions.

## Layout & Spacing

The layout follows a **Fluid Grid** model with fixed sidebar constraints. 
- **Desktop:** A 12-column grid with a fixed 280px left navigation sidebar. Content is housed in "Stage" containers with 32px of internal padding.
- **Mobile:** A single-column flow with 16px horizontal margins and a bottom-docked navigation bar for reachability.

Spacing follows an 8px geometric scale. Larger "Stack" values (48px+) should be used between major sections to emphasize the minimalistic, "premium" feel. Use the `stack-md` (24px) for spacing between related cards and components.

## Elevation & Depth

Depth is achieved through **Glassmorphism** and **Tonal Layers** rather than traditional heavy shadows.

- **Level 0 (Base):** Off-white background (#F8FAFC).
- **Level 1 (Cards):** White background with a 1px stroke (#0A192F at 5% opacity).
- **Level 2 (Modals/Popovers):** Pure white with a "Soft Flow" shadow: `0px 20px 40px rgba(10, 25, 47, 0.08)`.
- **Level 3 (Overlays):** 60% white with a 20px Backdrop Blur (saturate 150%).

Avoid pure black shadows. Always tint shadows with the Deep Navy primary color to maintain color harmony.

## Shapes

The shape language is extremely soft and approachable, contrasting the "heavy" technical nature of product development.
- **Standard UI Elements:** Use `rounded-lg` (1rem / 16px) for cards and input fields.
- **Interactive Elements:** Buttons and tags must be `rounded-full` (pill-shaped) to reinforce the fluid "flow" concept.
- **Containers:** Large dashboard sections or hero backgrounds use `rounded-xl` (1.5rem / 24px).

## Components

### Buttons
- **Primary:** Pill-shaped (`rounded-full`). Gradient fill (Aqua to Electric Blue). White text. Subtle glow effect on hover.
- **Secondary:** Pill-shaped. Deep Navy outline (1.5px) or light Navy ghost style.

### Cards
- White background with 10% opacity border.
- Apply a subtle "Wave" graphic in the bottom-right corner at 5% opacity for brand continuity.
- No heavy shadows; use a 1px border for definition.

### Navigation
- **Desktop Sidebar:** Deep Navy background. Icons in light cyan. Active state shown with a vertical "wave" line on the left edge.
- **Mobile Bottom Bar:** Glassmorphic background (blur) with pill-shaped active indicators.

### Progress & Pipelines
- **Wave Progress Bars:** Replace standard flat bars with a fill that has a subtle, animated sine-wave top edge.
- **Status Badges:** Small pill-shaped containers with low-opacity background fills of the status color (e.g., Success = Soft Green bg, Emerald text).

### Inputs
- Large, 16px rounded corners.
- Focus state: 2px Electric Blue border with a soft cyan outer glow.
- Background: Pure white or very light grey (#F1F5F9).