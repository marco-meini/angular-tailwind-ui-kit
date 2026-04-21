# Foundation components

Questo documento copre il primo batch di componenti base e form presenti in `@your-scope/ui-kit`.

## Componenti disponibili

- `UiBadgeComponent`
- `UiAlertComponent`
- `UiSpinnerComponent`
- `UiProgressComponent`
- `UiInputComponent`
- `UiInputGroupComponent`
- `UiLabelComponent`
- `UiTextareaComponent`
- `UiCheckboxComponent`
- `UiSwitchComponent`
- `UiRadioGroupComponent`

## Pattern API condiviso

Ogni componente usa il pattern:

- `variant`: `default | primary | secondary | ghost | danger | outline`
- `size`: `sm | md | lg`
- `state`: `default | success | warning | danger`
- flag opzionali: `disabled`, `invalid`, `loading`

## Snippet rapido

`<ui-input [invalid]="true" placeholder="Email"></ui-input>`

`<ui-badge variant="secondary">Beta</ui-badge>`
