import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-label',
  standalone: true,
  template: `<label [for]="forId" class="ui-label">{{ text }}<ng-content /></label>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLabelComponent {
  @Input() forId = '';
  @Input() text = '';
}
