import { ChangeDetectionStrategy, Component, Input, computed } from '@angular/core';
import { uiVariantClasses } from '../core/class-variants';
import { UI_DEFAULTS, type UiSize, type UiState, type UiVariant } from '../core/tokens';

@Component({
  selector: 'ui-badge',
  standalone: true,
  template: `<span [class]="classes()"><ng-content /></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiBadgeComponent {
  @Input() variant: UiVariant = UI_DEFAULTS.variant;
  @Input() size: UiSize = 'sm';
  @Input() state: UiState = UI_DEFAULTS.state;
  @Input() className = '';

  protected readonly classes = computed(() =>
    uiVariantClasses(
      {
        base: 'ui-badge',
        variants: {
          default: 'bg-[rgb(var(--ui-muted))] text-[rgb(var(--ui-fg))]',
          primary: 'bg-[rgb(var(--ui-primary))] text-white',
          secondary: 'bg-[rgb(var(--ui-primary))] text-white',
          danger: 'bg-[rgb(var(--ui-danger))] text-white',
          ghost: 'bg-transparent text-[rgb(var(--ui-fg))] border border-[rgb(var(--ui-border))]',
          outline: 'bg-white border border-[rgb(var(--ui-border-on-light))] text-[rgb(var(--ui-fg-on-light))]',
        },
        sizes: {
          sm: 'text-xs px-2 py-0.5',
          md: 'text-sm px-2.5 py-1',
          lg: 'text-sm px-3 py-1.5',
        },
        states: {
          success: 'ring-1 ring-[rgb(var(--ui-success))]',
          warning: 'ring-1 ring-[rgb(var(--ui-warning))]',
          danger: 'ring-1 ring-[rgb(var(--ui-danger))]',
        },
      },
      {
        variant: this.variant,
        size: this.size,
        state: this.state,
        className: this.className,
      },
    ),
  );
}
