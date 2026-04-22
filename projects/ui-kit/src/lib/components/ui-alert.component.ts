import { ChangeDetectionStrategy, Component, Input, computed } from '@angular/core';
import { uiVariantClasses } from '../core/class-variants';
import { UI_DEFAULTS, type UiState } from '../core/tokens';

@Component({
  selector: 'ui-alert',
  standalone: true,
  template: `
    <section [class]="classes()" role="alert">
      @if (title) {
        <h3 class="text-sm font-semibold">{{ title }}</h3>
      }
      @if (description) {
        <p class="text-sm opacity-90">{{ description }}</p>
      }
      <div class="text-sm opacity-90"><ng-content /></div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAlertComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() state: UiState = UI_DEFAULTS.state;
  @Input() className = '';

  protected readonly classes = computed(() =>
    uiVariantClasses(
      {
        base: 'rounded-xl border p-3 space-y-2 text-slate-900',
        states: {
          default: 'border-[rgb(var(--ui-border))] bg-white',
          success: 'border-[rgb(var(--ui-success))] bg-[color-mix(in_srgb,rgb(var(--ui-success))_8%,white)]',
          warning: 'border-[rgb(var(--ui-warning))] bg-[color-mix(in_srgb,rgb(var(--ui-warning))_12%,white)]',
          danger: 'border-[rgb(var(--ui-danger))] bg-[color-mix(in_srgb,rgb(var(--ui-danger))_10%,white)]',
        },
      },
      { state: this.state, className: this.className },
    ),
  );
}
