import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  template: `
    <label class="inline-flex items-center gap-2 text-sm text-[rgb(var(--ui-fg))]">
      <input type="checkbox" class="h-4 w-4 rounded border-[rgb(var(--ui-border))]" [checked]="checked" [disabled]="disabled" (change)="onToggle($event)" />
      <span>{{ label }}<ng-content /></span>
    </label>
  `,
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
