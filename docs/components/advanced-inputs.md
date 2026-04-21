# Advanced Inputs

## Components
- `UiComboboxComponent`
- `UiSelectSearchComponent`
- `UiTypeaheadComponent`
- `UiDatepickerComponent`

## Example
```html
<ui-combobox
  label="Framework"
  [options]="frameworkOptions"
  [(value)]="selectedFramework"
/>

<ui-datepicker
  label="Release date"
  [(value)]="releaseDate"
/>
```

## Notes
- `UiComboboxComponent` and `UiSelectSearchComponent` support keyboard navigation (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`).
- `UiDatepickerComponent` integrates `flatpickr` to avoid shipping a heavy date UI dependency.
