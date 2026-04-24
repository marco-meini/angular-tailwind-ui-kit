import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export interface UiRadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'ui-radio-group',
  standalone: true,
  templateUrl: './ui-radio-group.component.html',
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
