import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  templateUrl: './ui-checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCheckboxComponent {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() label = '';
  @Output() readonly checkedChange = new EventEmitter<boolean>();

  protected onToggle(event: Event): void {
    const next = (event.target as HTMLInputElement).checked;
    this.checked = next;
    this.checkedChange.emit(next);
  }
}
