import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'ui-collapsible',
  standalone: true,
  template: `
    <section class="rounded-md border border-[rgb(var(--ui-border))] p-3">
      <button
        type="button"
        class="w-full text-left text-sm font-medium text-[rgb(var(--ui-fg))] transition hover:opacity-90"
        (click)="toggle()"
      >
        {{ open() ? expandedLabel : collapsedLabel }}
      </button>
      @if (open()) {
        <div class="pt-2 text-sm text-slate-400">
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
