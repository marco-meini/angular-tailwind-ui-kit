# Angular UI Kit - A11y Check

Use this skill when validating an interactive component before merge.

## Checklist

1. Keyboard
- `Tab` enters and leaves the component.
- `Enter` and `Space` trigger primary action.
- Arrow keys navigate items in list-based widgets.
- `Escape` closes overlays.

2. ARIA
- Correct role (`dialog`, `tablist`, `listbox`, `option`, etc.).
- Labels exist (`aria-label`/`aria-labelledby`).
- State attributes update (`aria-expanded`, `aria-selected`, `aria-invalid`).

3. Focus management
- Initial focus is deterministic.
- Focus trap is active for modal dialogs.
- Focus returns to trigger when overlay closes.

4. State communication
- Error/help text linked with `aria-describedby`.
- Loading state exposed to assistive tech.

5. Manual smoke
- Test with keyboard only in showcase routes:
  - `/interactive`
  - `/advanced`
