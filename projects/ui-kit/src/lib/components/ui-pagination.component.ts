import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="flex items-center gap-2" aria-label="Pagination">
      <button type="button" class="ui-button ui-button--outline px-3 py-1 text-xs" [disabled]="page <= 1" (click)="goTo(page - 1)">
        Previous
      </button>
      <span class="text-sm text-slate-300">Page {{ page }} / {{ totalPages }}</span>
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
