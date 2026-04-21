import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-textarea',
  standalone: true,
  template: `
    <textarea
      [id]="id"
      [rows]="rows"
      [placeholder]="placeholder"
      [disabled]="disabled"
      class="ui-textarea"
      [value]="value"
      (input)="onInput($event)"
    ></textarea>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTextareaComponent {
  @Input() id = '';
  @Input() rows = 4;
  @Input() placeholder = '';
  @Input() value = '';
  @Input() disabled = false;
  @Output() readonly valueChange = new EventEmitter<string>();

  protected onInput(event: Event): void {
    const next = (event.target as HTMLTextAreaElement).value;
    this.value = next;
    this.valueChange.emit(next);
  }
}
