# Interactive components

## Accordion
- Use `UiAccordionComponent` for collapsible FAQ-like sections.
- Supports keyboard activation with `Space` and `Enter`.

## Collapsible
- `UiCollapsibleComponent` wraps short expandable blocks.
- Exposes a `toggle()` method for imperative control.

## Dropdown
- `UiDropdownComponent` emits `selectionChange` with the selected item.
- Includes click-away close behavior and focus-safe trigger.

## Dialog / Alert Dialog
- `UiDialogComponent` and `UiAlertDialogComponent` are lightweight wrappers on CDK Dialog.
- Default actions support cancel/confirm flows with emitted events.
