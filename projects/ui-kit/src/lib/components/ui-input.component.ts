import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed } from '@angular/core';
import { uiVariantClasses } from '../core/class-variants';
import { UI_DEFAULTS, type UiSize, type UiState, type UiVariant } from '../core/tokens';

@Component({
  selector: 'ui-input',
  standalone: true,
  template: `
    <input
      [id]="id"
      [type]="type"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [class]="classes()"
      [value]="value"
      (input)="onInput($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiInputComponent {
  @Input() id = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() size: UiSize = UI_DEFAULTS.size;
  @Input() variant: UiVariant = 'outline';
  @Input() state: UiState = UI_DEFAULTS.state;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() loading = false;
  @Output() readonly valueChange = new EventEmitter<string>();

  protected readonly classes = computed(() =>
    uiVariantClasses(
      {
        base: 'ui-input',
        variants: {
          outline: 'border border-[rgb(var(--ui-border))] bg-white',
          default: 'border border-[rgb(var(--ui-border))] bg-white',
          ghost: 'border border-transparent bg-[rgb(var(--ui-muted))]',
          primary: 'border border-[rgb(var(--ui-primary))] bg-white',
          secondary: 'border border-[rgb(var(--ui-primary))] bg-white',
          danger: 'border border-[rgb(var(--ui-danger))] bg-white',
        },
        sizes: {
          sm: 'h-8 text-sm',
          md: 'h-10 text-sm',
          lg: 'h-12 text-base',
        },
        states: {
          success: 'ring-2 ring-[color-mix(in_srgb,rgb(var(--ui-success))_25%,transparent)]',
          warning: 'ring-2 ring-[color-mix(in_srgb,rgb(var(--ui-warning))_25%,transparent)]',
          danger: 'ring-2 ring-[color-mix(in_srgb,rgb(var(--ui-danger))_25%,transparent)]',
        },
        disabled: 'cursor-not-allowed opacity-60',
        invalid: 'border-[rgb(var(--ui-danger))] ring-2 ring-[color-mix(in_srgb,rgb(var(--ui-danger))_20%,transparent)]',
        loading: 'animate-pulse',
      },
      {
        size: this.size,
        state: this.state,
        variant: this.variant,
        disabled: this.disabled,
        invalid: this.invalid,
        loading: this.loading,
      },
    ),
  );

  protected onInput(event: Event): void {
    const next = (event.target as HTMLInputElement).value;
    this.value = next;
    this.valueChange.emit(next);
  }
}
