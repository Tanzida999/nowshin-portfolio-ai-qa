# Signature animation upgrade

## Build
- Add Framer Motion with a shared reduced-motion and fine-pointer check so animation, hover tilt, cursor, spotlight, and magnetic effects degrade cleanly.
- Rework the portrait into a capped arch with offset vermilion outline, shoji reveal, desktop tilt, floating tool labels, availability pill, and a subtle hero grain overlay.
- Add a once-per-visit hanko stamp animation, top reading progress, fixed Japanese edge label, animated heading brush strokes and section numbers.
- Make the test runner replayable; animate the experience line and active dots as jobs enter view; stagger skill labels and add desktop card spotlights.
- Turn every project card into a two-sided QA check card, preserving project links while adding animated filtering and image zoom.
- Add three persistent bug-hunt targets with accessible SVG bugs, progress toasts, and a Contact action after completion.
- Add fine-pointer-only custom cursor and magnetic primary actions, plus an accessible Ctrl/Cmd+K command palette for sections, projects, CV, and email copying.

## Technical details
- Keep the current content, routes, palette, typography, and responsive layout.
- Store QA check lines in the existing portfolio data file so they remain easy to edit.
- Use transform and opacity animation paths, lazy viewport triggers, and `prefers-reduced-motion` checks for performance.
- Keep mobile free of tilt, floating labels, cursor, spotlight, and magnetic movement.

## Verification
- Check desktop and 393px mobile layouts, dark mode, reduced motion, keyboard command navigation, project flips, filtering, bug persistence, and browser errors.
