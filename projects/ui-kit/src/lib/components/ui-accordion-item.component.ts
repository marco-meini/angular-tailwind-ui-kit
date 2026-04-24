import { Component, Input, computed, signal } from '@angular/core';
import { cx } from '../core/class-variants';
import type { UiVariant } from '../core/tokens';

const INTERACTIVE_BASE = 'rounded-md border border-slate-200 bg-white text-slate-900';

@Component({
  selector: 'ui-accordion-item',
  standalone: true,
  templateUrl: './ui-accordion-item.component.html',
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
