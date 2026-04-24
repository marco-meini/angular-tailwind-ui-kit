import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-progress',
  standalone: true,
  host: {
    class: 'block w-full',
  },
  template: `
    <div class="h-2 w-full overflow-hidden rounded-full bg-[rgb(var(--ui-muted))]" [attr.aria-valuenow]="value">
      <div class="h-full rounded-full bg-[rgb(var(--ui-primary))] transition-all duration-300" [style.width.%]="safeValue"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiProgressComponent {
  @Input() value = 0;

  get safeValue(): number {
    if (this.value < 0) return 0;
    if (this.value > 100) return 100;
    return this.value;
  }
}
