import { Component, Input, computed, signal } from '@angular/core';
import { cx } from '../core/class-variants';
import type { UiVariant } from '../core/tokens';

const INTERACTIVE_BASE = 'rounded-md border border-slate-200 bg-white text-slate-900';

@Component({
  selector: 'ui-accordion-item',
  standalone: true,
  template: `
    <article [class]="containerClasses()">
      <button
        type="button"
        class="flex w-full items-center justify-between p-4 text-left font-medium"
        [attr.aria-expanded]="open()"
        (click)="toggle()"
      >
        {{ title }}
        <span aria-hidden="true">{{ open() ? '−' : '+' }}</span>
      </button>
      @if (open()) {
        <div class="px-4 pb-4 text-sm text-slate-600">
          <ng-content />
        </div>
      }
    </article>
  `,
})
export class UiAccordionItemComponent {
  @Input() title = '';
  @Input() variant: UiVariant = 'default';
  readonly open = signal(false);
  readonly containerClasses = computed(() =>
    cx(
      INTERACTIVE_BASE,
      this.variant === 'danger' ? 'border-red-200 bg-red-50' : '',
      'overflow-hidden',
    ),
  );

  toggle(): void {
    this.open.update((value) => !value);
  }
}
