import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-switch',
  standalone: true,
  templateUrl: './ui-switch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSwitchComponent {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() label = '';
  @Output() readonly checkedChange = new EventEmitter<boolean>();

  /** Not a signal-backed `computed`: `checked` is an @Input, so use methods for correct updates under OnPush. */
  protected trackClasses(): string {
    return this.checked
      ? 'relative inline-flex h-6 w-11 items-center rounded-full bg-[rgb(var(--ui-primary))] transition-colors disabled:opacity-60'
      : 'relative inline-flex h-6 w-11 items-center rounded-full bg-[rgb(var(--ui-border))] transition-colors disabled:opacity-60';
  }

  protected thumbClasses(): string {
    return this.checked
      ? 'inline-block h-5 w-5 translate-x-5 rounded-full bg-white transition-transform'
      : 'inline-block h-5 w-5 translate-x-1 rounded-full bg-white transition-transform';
  }

  protected toggle(): void {
    if (this.disabled) {
      return;
    }
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
