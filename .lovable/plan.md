# English and Japanese portfolio

## What will change
- Add English and Japanese translation files and move every visible portfolio string, accessibility label, validation message, toast, command, and project detail into them.
- Reuse the existing home and project-page presentation for four URLs: `/`, `/projects/:slug`, `/ja`, and `/ja/projects/:slug`.
- Add the `EN / 日本語` switch to the navigation, preserve the current page and project when switching, fade page text for 0.2 seconds, and remember the selection safely.
- Redirect a first-time Japanese browser visitor from English URLs to the matching Japanese URL without reloading during manual switching.
- Add Japanese typography, natural line breaking, Japanese document language, localized metadata, and reciprocal English/Japanese hreflang links.

## Technical details
- Configure `react-i18next` with local JSON resources and a route-aware language provider.
- Keep stable project IDs, categories, links, images, and technology names in code; source all human-facing copy from translations.
- Add Japanese route files using the same shared page components rather than duplicating layout or animation logic.
- Extend font loading with Shippori Mincho and Noto Sans JP while retaining the existing English and mono fonts.
- Verify both languages, language persistence, direct Japanese project URLs, metadata, document language, reduced motion, and 360px overflow.
