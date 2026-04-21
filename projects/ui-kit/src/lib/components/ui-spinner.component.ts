import { ChangeDetectionStrategy, Component, Input, computed } from '@angular/core';
import { uiVariantClasses } from '../core/class-variants';
import { UI_DEFAULTS, type UiSize } from '../core/tokens';

@Component({
  selector: 'ui-spinner',
  standalone: true,
  template: `
    <span [class]="classes()" role="status" aria-label="Loading">
      <span class="sr-only">Loading</span>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSpinnerComponent {
  @Input() size: UiSize = UI_DEFAULTS.size;
  @Input() className = '';

  protected readonly classes = computed(() =>
    uiVariantClasses(
      {
        base: 'inline-block animate-spin rounded-full border-2 border-[rgb(var(--ui-primary))] border-t-transparent',
        sizes: {
          sm: 'h-4 w-4',
          md: 'h-6 w-6',
          lg: 'h-8 w-8',
        },
      },
      { size: this.size, className: this.className },
    ),
  );
}
