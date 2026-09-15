# Premium portfolio redesign

## What will change
- Replace the current arch portrait with the supplied transparent graduation cutout, composed over a cream circle with an offset vermilion outline and fixed mobile/desktop size limits.
- Rebuild the first screen into a 60/40 desktop composition and portrait-first mobile flow, with staged portrait, word-by-word headline, delayed actions, and a restrained scroll cue.
- Standardize typography, spacing, card borders/radii, hover treatments, and dark-surface grain while preserving all existing colours, fonts, content, filtering, QA cards, bug hunt, theme toggle, and command menu.
- Add one shared motion language: eased one-time section reveals, staggered children, project-image wipes, a slow skills marquee, and a reduced-motion-safe route wipe between the portfolio and project pages.
- Use desktop-only smooth scrolling and pointer parallax; keep touch devices lightweight and motion-free when reduced motion is requested.

## Technical details
- Upload `Tanzida_photo_cutout.png` through the project asset pipeline and use explicit dimensions to avoid layout shift.
- Implement the pop-out portrait with separate background circle, clipped lower portrait layer, visible upper portrait layer, and animated SVG ring.
- Add Lenis only for fine-pointer desktop devices and clean it up on route exit.
- Replace text-symbol interface controls with Lucide icons where equivalents exist.
- Verify the home page, a project page, dark mode, reduced motion, and 360px width with browser checks; also check for missing alt text and horizontal overflow.

## Scope note
- Content and contact-form behavior remain unchanged; the form still validates locally and does not send or store messages.
