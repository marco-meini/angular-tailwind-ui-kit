import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UI_DEFAULTS, type UiSize, type UiState, type UiVariant } from '../core/tokens';
import { UiComboboxComponent, type UiOption } from './ui-combobox.component';

@Component({
  selector: 'ui-select-search',
  standalone: true,
  imports: [UiComboboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-combobox
      [label]="label"
      [placeholder]="placeholder"
      [options]="options"
      [variant]="variant"
      [size]="size"
      [state]="state"
      [disabled]="disabled"
      [invalid]="invalid"
      [loading]="loading"
      [value]="value"
      (valueChange)="onValueChange($event)"
    />
  `,
})
export class UiSelectSearchComponent {
  @Input() label = '';
  @Input() placeholder = 'Select an option';
  @Input() options: UiOption[] = [];
  @Input() set items(value: UiOption[]) {
    this.options = value;
  }
  @Input() variant: UiVariant = UI_DEFAULTS.variant;
  @Input() size: UiSize = UI_DEFAULTS.size;
  @Input() state: UiState = UI_DEFAULTS.state;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() loading = false;
  @Input() value = '';

  @Output() readonly valueChange = new EventEmitter<string>();

  protected onValueChange(nextValue: string): void {
    this.value = nextValue;
    this.valueChange.emit(nextValue);
  }
}
