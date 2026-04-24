import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-input-group',
  standalone: true,
  templateUrl: './ui-input-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiInputGroupComponent {
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() placeholder = '';
  @Input() value = '';
  @Output() readonly valueChange = new EventEmitter<string>();

  protected onInput(event: Event): void {
    const next = (event.target as HTMLInputElement).value;
    this.value = next;
    this.valueChange.emit(next);
  }
}
