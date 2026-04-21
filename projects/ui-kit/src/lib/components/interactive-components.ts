import { CdkTrapFocus } from '@angular/cdk/a11y';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  computed,
  signal,
} from '@angular/core';
import { cx } from '../core/class-variants';
import type { UiComponentStateInput, UiSize, UiVariant } from '../core/tokens';

const INTERACTIVE_BASE = 'rounded-md border border-slate-200 bg-white text-slate-900';

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
      <div class="mt-2 min-w-48 rounded-md border border-slate-200 bg-white p-2 shadow-lg" role="menu">
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

@Component({
  selector: 'ui-dialog',
  standalone: true,
  imports: [NgTemplateOutlet, CdkTrapFocus],
  template: `
    @if (open()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" role="dialog" aria-modal="true">
        <div class="w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl" cdkTrapFocus>
          <header class="mb-4 flex items-center justify-between">
            <h3 class="text-lg font-semibold text-slate-900">{{ title }}</h3>
            <button type="button" class="text-slate-500" (click)="requestClose()">✕</button>
          </header>
          <ng-container *ngTemplateOutlet="content ?? defaultTemplate"></ng-container>
          <ng-template #defaultTemplate><ng-content /></ng-template>
          <footer class="mt-6 flex justify-end gap-2">
            <button type="button" class="ui-button ui-button--outline" (click)="requestClose()">Cancel</button>
            <button type="button" class="ui-button ui-button--primary" (click)="confirm.emit()">Confirm</button>
          </footer>
        </div>
      </div>
    }
  `,
})
export class UiDialogComponent {
  @Input() title = 'Dialog';
  @Input() content?: TemplateRef<unknown>;
  @Input() set isOpen(value: boolean) {
    this.open.set(value);
  }
  @Output() readonly close = new EventEmitter<void>();
  @Output() readonly confirm = new EventEmitter<void>();

  readonly open = signal(false);

  requestClose(): void {
    this.open.set(false);
    this.close.emit();
  }
}

@Component({
  selector: 'ui-alert-dialog',
  standalone: true,
  imports: [UiDialogComponent],
  template: `
    <ui-dialog [isOpen]="isOpen" [title]="title" (close)="close.emit()" (confirm)="confirm.emit()">
      <p class="text-sm text-slate-600">{{ message }}</p>
    </ui-dialog>
  `,
})
export class UiAlertDialogComponent {
  @Input() title = 'Are you sure?';
  @Input() message = 'This action cannot be undone.';
  @Input() isOpen = false;
  @Output() readonly close = new EventEmitter<void>();
  @Output() readonly confirm = new EventEmitter<void>();
}

export interface UiAccordionEntry {
  title: string;
  content: string;
}

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

@Component({
  selector: 'ui-accordion',
  standalone: true,
  imports: [UiAccordionItemComponent],
  template: `
    <section class="space-y-2">
      @for (item of items; track item.title) {
        <ui-accordion-item [title]="item.title">
          {{ item.content }}
        </ui-accordion-item>
      }
    </section>
  `,
})
export class UiAccordionComponent {
  @Input() items: UiAccordionEntry[] = [];
}

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

export const UI_INTERACTIVE_COMPONENTS = [
  UiDropdownComponent,
  UiDialogComponent,
  UiAlertDialogComponent,
  UiAccordionComponent,
  UiAccordionItemComponent,
  UiCollapsibleComponent,
  UiInteractiveStateDirective,
] as const;
