import { Directive, Input } from '@angular/core';
import type { UiComponentStateInput } from '../core/tokens';

@Directive({
  selector: '[uiInteractiveState]',
  standalone: true,
  host: {
    '[attr.data-variant]': 'state.variant ?? "default"',
    '[attr.data-size]': 'state.size ?? "md"',
    '[attr.data-state]': 'state.state ?? "default"',
    '[attr.aria-disabled]': 'state.disabled ? "true" : null',
    '[attr.aria-busy]': 'state.loading ? "true" : null',
  },
})
export class UiInteractiveStateDirective {
  @Input('uiInteractiveState') state: UiComponentStateInput = {};
}
