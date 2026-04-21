import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'ui-collapsible',
  standalone: true,
  template: `
    <section class="rounded-md border border-slate-200 p-3">
      <button type="button" class="text-sm font-medium text-slate-900" (click)="toggle()">
        {{ open() ? expandedLabel : collapsedLabel }}
      </button>
      @if (open()) {
        <div class="pt-2 text-sm text-slate-600">
          <ng-content />
        </div>
      }
    </section>
  `,
})
export class UiCollapsibleComponent {
  @Input() collapsedLabel = 'Show details';
  @Input() expandedLabel = 'Hide details';
  readonly open = signal(false);

  toggle(): void {
    this.open.update((value) => !value);
  }
}
