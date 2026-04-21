import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../core/class-variants';

@Component({
  selector: 'ui-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="inline-flex rounded-lg bg-slate-100 p-1" role="tablist">
      @for (tab of tabs; track tab.id) {
        <button
          type="button"
          role="tab"
          [attr.aria-selected]="tab.id === active"
          (click)="select(tab.id)"
          [class]="tabClass(tab.id === active)"
        >
          {{ tab.label }}
        </button>
      }
    </div>
  `,
})
export class UiTabsComponent {
  @Input() tabs: Array<{ id: string; label: string }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'api', label: 'API' },
    { id: 'examples', label: 'Examples' },
  ];
  @Input() active = 'overview';
  @Output() readonly activeChange = new EventEmitter<string>();

  tabClass(active: boolean): string {
    return cx(
      'rounded-md px-3 py-1.5 text-sm font-medium transition',
      active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900',
    );
  }

  select(id: string): void {
    this.active = id;
    this.activeChange.emit(id);
  }
}
