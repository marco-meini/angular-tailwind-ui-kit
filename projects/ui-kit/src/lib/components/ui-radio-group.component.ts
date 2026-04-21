import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export interface UiRadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'ui-radio-group',
  standalone: true,
  template: `
    <fieldset class="space-y-2">
      @if (legend) {
        <legend class="mb-1 text-sm font-medium text-[rgb(var(--ui-fg))]">{{ legend }}</legend>
      }
      @for (option of options; track option.value) {
        <label class="flex items-center gap-2 text-sm" [class.opacity-50]="option.disabled">
          <input
            type="radio"
            [name]="name"
            [value]="option.value"
            [checked]="option.value === value"
            [disabled]="disabled || option.disabled"
            (change)="select(option.value)"
          />
          <span>{{ option.label }}</span>
        </label>
      }
    </fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiRadioGroupComponent {
  @Input() legend = '';
  @Input() label = '';
  @Input() name = `ui-radio-group-${Math.random().toString(16).slice(2)}`;
  @Input() options: UiRadioOption[] = [];
  @Input() set items(value: UiRadioOption[]) {
    this.options = value;
  }
  @Input() value = '';
  @Input() disabled = false;
  @Output() readonly valueChange = new EventEmitter<string>();

  protected select(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
  }
}
