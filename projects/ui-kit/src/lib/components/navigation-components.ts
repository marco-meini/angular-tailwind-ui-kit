import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../core/class-variants';

export interface UiBreadcrumbItem {
  label: string;
  href?: string;
}

@Component({
  selector: 'ui-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="flex items-center gap-2 text-sm text-slate-600" aria-label="Breadcrumb">
      @for (item of items; track item.label; let isLast = $last) {
        @if (!isLast) {
          <a [href]="item.href || '#'" class="transition hover:text-slate-900">{{ item.label }}</a>
          <span class="text-slate-400">/</span>
        } @else {
          <span class="font-medium text-slate-900">{{ item.label }}</span>
        }
      }
    </nav>
  `,
})
export class UiBreadcrumbComponent {
  @Input() items: UiBreadcrumbItem[] = [];
}

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

@Component({
  selector: 'ui-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="flex items-center gap-2" aria-label="Pagination">
      <button type="button" class="ui-button ui-button--outline px-3 py-1 text-xs" [disabled]="page <= 1" (click)="goTo(page - 1)">
        Previous
      </button>
      <span class="text-sm text-slate-700">Page {{ page }} / {{ totalPages }}</span>
      <button type="button" class="ui-button ui-button--outline px-3 py-1 text-xs" [disabled]="page >= totalPages" (click)="goTo(page + 1)">
        Next
      </button>
    </nav>
  `,
})
export class UiPaginationComponent {
  @Input() page = 1;
  @Input() totalPages = 10;
  @Output() readonly pageChange = new EventEmitter<number>();

  goTo(nextPage: number): void {
    if (nextPage < 1 || nextPage > this.totalPages) {
      return;
    }
    this.page = nextPage;
    this.pageChange.emit(nextPage);
  }
}
