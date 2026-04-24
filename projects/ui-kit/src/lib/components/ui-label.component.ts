import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-label',
  standalone: true,
  templateUrl: './ui-label.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLabelComponent {
  @Input() forId = '';
  @Input() text = '';
}
