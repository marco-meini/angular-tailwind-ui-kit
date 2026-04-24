import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UI_DEFAULTS, type UiSize, type UiState, type UiVariant } from '../core/tokens';
import { UiComboboxComponent, type UiOption } from './ui-combobox.component';

@Component({
  selector: 'ui-select-search',
  standalone: true,
  imports: [UiComboboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ui-select-search.component.html',
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
  @Input() nullable = false;
  @Input() nullMenuOption = true;
  @Input() nullLabel = 'No selection';
  @Input() value: string | null = null;

  @Output() readonly valueChange = new EventEmitter<string | null>();
  @Output() readonly queryChange = new EventEmitter<string>();

  protected onValueChange(nextValue: string | null): void {
    this.value = nextValue;
    this.valueChange.emit(nextValue);
  }
}
