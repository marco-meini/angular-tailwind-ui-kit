import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, Input, computed, signal } from '@angular/core';
import { cx } from '../core/class-variants';
import type { UiSize, UiVariant } from '../core/tokens';

@Component({
  selector: 'ui-dropdown',
  standalone: true,
  imports: [CdkOverlayOrigin, CdkConnectedOverlay],
  template: `
    <div class="relative inline-block" cdkOverlayOrigin #origin="cdkOverlayOrigin">
      <button
        type="button"
        class="ui-field inline-flex cursor-pointer items-center gap-2"
        [class]="triggerClasses()"
        (click)="toggle()"
        [attr.aria-expanded]="open()"
        aria-haspopup="menu"
      >
        {{ label }}
        <span aria-hidden="true">▾</span>
      </button>
    </div>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOpen]="open()"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayHasBackdrop]="true"
      (backdropClick)="close()"
    >
      <div class="ui-popover-surface mt-2 min-w-48 rounded-md border border-slate-200 bg-white p-2 shadow-lg" role="menu">
        <ng-content />
      </div>
    </ng-template>
  `,
})
export class UiDropdownComponent {
  @Input() label = 'Actions';
  @Input() variant: UiVariant = 'outline';
  @Input() size: UiSize = 'md';
  readonly open = signal(false);
  readonly triggerClasses = computed(() =>
    cx(
      this.variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-white text-slate-900',
      this.size === 'sm' ? 'h-8 px-3 text-sm' : this.size === 'lg' ? 'h-11 px-5 text-base' : 'h-10 px-4 text-sm',
      this.open() ? 'ring-2 ring-blue-300' : '',
    ),
  );

  toggle(): void {
    this.open.update((value) => !value);
  }

  close(): void {
    this.open.set(false);
  }
}
