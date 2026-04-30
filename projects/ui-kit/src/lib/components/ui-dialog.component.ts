import { CdkTrapFocus } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef, signal } from '@angular/core';

export type UiDialogConfirmVariant = 'primary' | 'danger';

@Component({
  selector: 'ui-dialog',
  standalone: true,
  imports: [NgTemplateOutlet, CdkTrapFocus],
  templateUrl: './ui-dialog.component.html',
})
export class UiDialogComponent {
  @Input() title = 'Dialog';
  @Input() cancelLabel = 'Cancel';
  @Input() confirmLabel = 'Confirm';
  @Input() showConfirm = true;
  @Input() confirmVariant: UiDialogConfirmVariant = 'primary';
  @Input() content?: TemplateRef<unknown>;
  @Input() set isOpen(value: boolean) {
    this.open.set(value);
  }
  @Output() readonly close = new EventEmitter<void>();
  @Output() readonly confirm = new EventEmitter<void>();

  readonly open = signal(false);

  protected confirmButtonClass(): string {
    return this.confirmVariant === 'danger' ? 'ui-button ui-button--danger' : 'ui-button ui-button--primary';
  }

  requestClose(): void {
    this.open.set(false);
    this.close.emit();
  }
}
