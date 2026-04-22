import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-input-group',
  standalone: true,
  template: `
    <div class="ui-input-group">
      @if (prefix) {
        <span class="text-sm text-slate-500">{{ prefix }}</span>
      }
      <input
        class="ui-input border border-[rgb(var(--ui-border))] bg-[rgb(var(--ui-bg))] text-[rgb(var(--ui-fg))] placeholder:text-slate-500"
        [placeholder]="placeholder"
        [value]="value"
        (input)="onInput($event)"
      />
      @if (suffix) {
        <span class="text-sm text-slate-500">{{ suffix }}</span>
      }
      <ng-content />
    </div>
  `,
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
