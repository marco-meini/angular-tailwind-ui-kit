import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UiDialogComponent } from './ui-dialog.component';

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
