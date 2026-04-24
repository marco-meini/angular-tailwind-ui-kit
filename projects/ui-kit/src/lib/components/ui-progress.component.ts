import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-progress',
  standalone: true,
  host: {
    class: 'block w-full',
  },
  templateUrl: './ui-progress.component.html',
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
