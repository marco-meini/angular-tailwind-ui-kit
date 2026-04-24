import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'ui-collapsible',
  standalone: true,
  templateUrl: './ui-collapsible.component.html',
})
export class UiCollapsibleComponent {
  @Input() collapsedLabel = 'Show details';
  @Input() expandedLabel = 'Hide details';
  readonly open = signal(false);

  toggle(): void {
    this.open.update((value) => !value);
  }
}
