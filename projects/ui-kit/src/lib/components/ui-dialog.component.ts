import { CdkTrapFocus } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef, signal } from '@angular/core';

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
